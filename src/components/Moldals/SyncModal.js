import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CloudSync, CheckIcon } from '../Icons/Icons';
import { CloseIcon } from '../Icons/Icons';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/endpont';
import {
  saveSchedules,
  saveJustification,
} from '../../database/synchronizeSchedules';
import { createUsuario } from '../../database/synchronizeUsuario';
import { getLastSynchronization } from '../../database/modelSynchronize';
import NetInfo from '@react-native-community/netinfo';

const ASYNC_STORAGE_KEY = '@syncHistory';

export default function SyncModal({ isVisible, onClose }) {
  const [syncState, setSyncState] = useState('idle');
  const [syncHistory, setSyncHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [syncMessage, setSyncMessage] = useState(
    'Mantenha seu aplicativo atualizado com os dados mais recentes do servidor.',
  );
  const progress = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { logoff } = useContext(AuthContext);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setSyncState('idle');
        progress.setValue(0);
        setSyncMessage(
          'Mantenha seu aplicativo atualizado com os dados mais recentes do servidor.',
        );
      }, 300);
    }
  }, [isVisible, progress]);

  useEffect(() => {
    if (isVisible) {
      const loadSyncHistory = async () => {
        try {
          const savedHistoryString = await AsyncStorage.getItem(
            ASYNC_STORAGE_KEY,
          );
          if (savedHistoryString) {
            const historyArray = JSON.parse(savedHistoryString);
            setSyncHistory(historyArray.map(dateStr => new Date(dateStr)));
          }
        } catch (e) {
          console.error('Failed to load sync history', e);
        }
      };
      loadSyncHistory();

      // Verificar conexão
      NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected);
      });
    }
  }, [isVisible]);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace('T', ' ');
  };

  const handleSync = async () => {
    if (!isConnected) {
      setSyncState('error');
      setSyncMessage('Não há conexão com a internet. Verifique sua internet.');
      return;
    }

    try {
      // Verificar se o token ainda é válido
      await api.getUsuario();
    } catch (error) {
      onClose();
      Alert.alert(
        'Aviso',
        'Sessão do usuário expirou, acesse novamente o aplicativo?',
        [{ text: 'Ok', onPress: () => logoff(false) }],
      );
      return;
    }

    setSyncState('syncing');
    setSyncMessage('Aguarde, estamos atualizando seus dados...');
    progress.setValue(0);

    try {
      // Simular progresso da sincronização
      Animated.timing(progress, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start(async () => {
        try {
          const newSyncDate = new Date();
          const dateLast = (await getLastSynchronization()) || '2024-01-01';

          // Executar sincronização real
          const usuario = await api.getUsuario();
          await createUsuario(usuario.data.company.all_users);

          const justifications = await api.getJustificationVisits();
          await saveJustification(justifications.data);

          const insemincao = await api.getInsemincaoVisita(dateLast);
          await saveSchedules(insemincao.data);

          // Salvar histórico
          const savedHistoryString =
            (await AsyncStorage.getItem(ASYNC_STORAGE_KEY)) || '[]';
          const oldHistory = JSON.parse(savedHistoryString);
          const newHistory = [newSyncDate.toISOString(), ...oldHistory];
          await AsyncStorage.setItem(
            ASYNC_STORAGE_KEY,
            JSON.stringify(newHistory),
          );

          setSyncHistory(newHistory.map(dateStr => new Date(dateStr)));
          setSyncState('complete');
          setSyncMessage(
            'Sincronização realizada com sucesso! Seus dados foram atualizados.',
          );
        } catch (error) {
          console.log('Erro durante a sincronização: ', error);
          setSyncState('error');
          setSyncMessage(
            'Houve uma falha durante a sincronização. Tente novamente!',
          );
        }
      });
    } catch (error) {
      setSyncState('error');
      setSyncMessage(
        'Erro durante o processo de sincronização. Tente novamente!',
      );
      console.log('Erro na animação: ', error);
    }
  };

  const formatSyncDate = date => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const SyncHistoryList = () => {
    if (!syncHistory || syncHistory.length === 0) return null;

    const displayHistory = syncHistory.slice(0, 2);
    const hasMore = syncHistory.length > 2;

    return (
      <View style={styles.historyListContainer}>
        {displayHistory.map((date, index) => (
          <View key={date.toISOString()} style={styles.lastSyncContainer}>
            <CheckIcon color="#00A859" />
            <Text style={styles.lastSyncText}>
              {index === 0 ? 'Última vez atualizado em' : 'Anterior:'}{' '}
              {formatSyncDate(date)}
            </Text>
          </View>
        ))}

        {hasMore && (
          <TouchableOpacity
            style={styles.verMaisButton}
            onPress={() => {
              onClose();
              // navigation.navigate('SyncHistory'); // Você pode implementar esta tela depois
            }}
          >
            <Text style={styles.verMaisText}>Ver histórico completo</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderBodyContent = () => {
    switch (syncState) {
      case 'syncing':
        return (
          <>
            <Text style={styles.title}>Sincronizando...</Text>
            <Text style={styles.subtitle}>{syncMessage}</Text>
            <View style={styles.progressContainer}>
              <Animated.View
                style={[styles.progressBar, { width: animatedWidth }]}
              />
            </View>
          </>
        );

      case 'complete':
        return (
          <>
            <View style={styles.successIconContainer}>
              <CheckIcon width={70} height={70} color="#00A859" />
            </View>
            <Text style={styles.title}>Sincronização Concluída!</Text>
            <Text style={styles.subtitle}>{syncMessage}</Text>

            <SyncHistoryList />

            <TouchableOpacity
              style={[styles.actionButton, { marginTop: 16 }]}
              onPress={onClose}
            >
              <Text style={styles.actionButtonText}>Fechar</Text>
            </TouchableOpacity>
          </>
        );

      case 'error':
        return (
          <>
            <Text style={styles.title}>Erro na Sincronização</Text>
            <Text style={styles.subtitle}>{syncMessage}</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleSync}>
              <CloudSync color="#FFFFFF" width={18} />
              <Text style={styles.actionButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { marginTop: 12 }]}
              onPress={onClose}
            >
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        );

      case 'idle':
      default:
        return (
          <>
            <Text style={styles.title}>Sincronizar Dados</Text>
            <Text style={styles.subtitle}>{syncMessage}</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleSync}>
              <CloudSync color="#FFFFFF" width={18} />
              <Text style={styles.actionButtonText}>Iniciar Sincronização</Text>
            </TouchableOpacity>

            <SyncHistoryList />
          </>
        );
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.5}
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionOutTiming={1}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <CloudSync />
            <Text style={styles.headerTitle}>Sincronização</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>{renderBodyContent()}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
    width: '100%',
    maxWidth: 380,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 6,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
    color: '#212121',
    marginLeft: 8,
  },
  body: {
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 18,
    color: '#212121',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 13,
    color: '#8d8d8dff',
    textAlign: 'center',
    maxWidth: '95%',
    marginBottom: 32,
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A859',
    borderRadius: 8,
    paddingVertical: 14,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonText: {
    fontFamily: 'Ubuntu-Regular',
    color: '#FFFFFF',
    fontSize: 15,
    marginLeft: 10,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    fontFamily: 'Ubuntu-Regular',
    color: '#757575',
    fontSize: 15,
  },
  progressContainer: {
    height: 12,
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 32,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00A859',
    borderRadius: 6,
  },
  successIconContainer: {
    marginBottom: 16,
  },
  historyListContainer: {
    width: '100%',
    marginTop: 24,
  },
  lastSyncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F4F4F4',
    borderRadius: 6,
    width: '100%',
    marginBottom: 8,
  },
  lastSyncText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    color: '#555555',
    marginLeft: 8,
  },
  verMaisButton: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  verMaisText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 13,
    color: '#007BFF',
  },
});
