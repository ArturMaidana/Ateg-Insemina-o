import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/endpont';
import {
  saveSchedules,
  saveJustification,
} from '../../database/synchronizeSchedules';
import { createUsuario } from '../../database/synchronizeUsuario';
import { getLastSynchronization } from '../../database/modelSynchronize';
import NetInfo from '@react-native-community/netinfo';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Refresh, CheckIcon } from '../Icons/Icons';

const SyncDisabledIcon = ({ size = 24, color = '#008346' }) => (
  <Refresh name="sync-disabled" size={size} color={color} />
);

const CheckIcon2 = ({ size = 32, color = '#008346' }) => (
  <CheckIcon name="check-circle" size={size} color={color} />
);
const ErrorIcon = ({ size = 32, color = '#D32F2F' }) => (
  <Icon name="error" size={size} color={color} />
);

const ASYNC_STORAGE_KEY = '@syncHistory';

export default function SyncComponent({ onSyncComplete, onSessionExpired }) {
  const [syncState, setSyncState] = useState('idle');
  const [syncMessage, setSyncMessage] = useState(
    'Para visualizar seus atendimentos agendados, é necessário sincronizar os dados com o servidor.',
  );
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setSyncState('error');
        setSyncMessage(
          'Não há conexão com a internet. Verifique sua rede e tente novamente.',
        );
      }
    });
  }, []);

  useEffect(() => {
    if (syncState === 'complete') {
      const timer = setTimeout(() => {
        onSyncComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [syncState, onSyncComplete]);

  const handleSync = async () => {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      setSyncState('error');
      setSyncMessage('Não há conexão com a internet. Verifique sua internet.');
      return;
    }

    try {
      await api.getUsuario();
    } catch (error) {
      if (onSessionExpired) {
        onSessionExpired();
      } else {
        Alert.alert('Erro de Sessão', 'Sua sessão expirou.');
      }
      return;
    }

    setSyncState('syncing');
    setSyncMessage('Aguarde, estamos atualizando seus dados...');
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: false,
    }).start();

    try {
      const dateLast = (await getLastSynchronization()) || '2024-01-01';

      const usuario = await api.getUsuario();
      await createUsuario(usuario.data.company.all_users);

      const justifications = await api.getJustificationVisits();
      await saveJustification(justifications.data);

      const insemincao = await api.getInsemincaoVisita(dateLast);
      await saveSchedules(insemincao.data);

      const newSyncDate = new Date();
      const savedHistoryString =
        (await AsyncStorage.getItem(ASYNC_STORAGE_KEY)) || '[]';
      const oldHistory = JSON.parse(savedHistoryString);
      const newHistory = [newSyncDate.toISOString(), ...oldHistory];
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(newHistory));

      progress.setValue(1);
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
  };

  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const renderCardContent = () => {
    switch (syncState) {
      case 'syncing':
        return (
          <>
            <View style={styles.iconContainer}>
              <ActivityIndicator size="large" color="#008346" />
            </View>
            <Text style={styles.title}>Sincronizando...</Text>
            <Text style={styles.bodyText}>{syncMessage}</Text>
            <View style={styles.progressContainer}>
              <Animated.View
                style={[styles.progressBar, { width: animatedWidth }]}
              />
            </View>
            <Text style={styles.footerText}>
              Isso pode levar alguns instantes...
            </Text>
          </>
        );

      case 'complete':
        return (
          <>
            <View style={styles.iconContainer}>
              <CheckIcon2 />
            </View>
            <Text style={styles.title}>Sincronização Concluída!</Text>
            <Text style={styles.bodyText}>{syncMessage}</Text>
            <ActivityIndicator
              size="small"
              color="#8C8C8C"
              style={{ marginTop: 24 }}
            />
          </>
        );

      case 'error':
        return (
          <>
            <View
              style={[styles.iconContainer, { backgroundColor: '#FBE9E7' }]}
            >
              <ErrorIcon />
            </View>
            <Text style={styles.title}>Erro na Sincronização</Text>
            <Text style={styles.bodyText}>{syncMessage}</Text>
            <TouchableOpacity
              style={styles.syncButton}
              onPress={handleSync}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </>
        );

      case 'idle':
      default:
        return (
          <>
            <View style={styles.iconContainer}>
              <SyncDisabledIcon />
            </View>
            <Text style={styles.title}>Dados não sincronizados</Text>
            <Text style={styles.bodyText}>{syncMessage}</Text>
            <TouchableOpacity
              style={styles.syncButton}
              onPress={handleSync}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sincronizar Dados</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
              Certifique-se de estar conectado à internet
            </Text>
          </>
        );
    }
  };

  return <View style={styles.card}>{renderCardContent()}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 24,
    paddingVertical: 24,
    alignItems: 'center',
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginTop: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10, // Círculo perfeito
    backgroundColor: '#E6F4EB', // Verde bem claro
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 13,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  syncButton: {
    flexDirection: 'row',
    backgroundColor: '#008346', // Verde principal
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#8C8C8C',
    marginTop: 10,
  },
  progressContainer: {
    height: 12,
    width: '90%',
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
});
