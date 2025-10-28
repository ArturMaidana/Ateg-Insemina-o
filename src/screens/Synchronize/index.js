import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setHeaderOptions } from '../../components/ui/HeaderTitle';
import { COLORS } from '../../utils/theme';
import {
  saveSchedules,
  saveJustification,
} from '../../database/synchronizeSchedules';
import { schedules } from '../../services/data';
import {
  getLastSynchronization,
  loadSynchronizations,
  getListVisits,
  getListVisitImages,
  listPending,
  listImagePending,
  updateInseminacaoPending,
} from '../../database/modelSynchronize';
import { createUsuario } from '../../database/synchronizeUsuario';
import { allTechnicianUsers } from '../../database/modelTechnicianUser';
import db from '../../database/db';
import api from '../../services/endpont';
import { AuthContext } from '../../contexts/auth';
import NetInfo from '@react-native-community/netinfo';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function Synchronize() {
  const navigation = useNavigation();
  const { logoff } = useContext(AuthContext);
  const [dataSchedules, setDataSchedules] = useState([]);
  const [dataSynchronizes, setDataSynchronizes] = useState([]);
  const [visitsPending, setVisitsPending] = useState([]);
  const [visitsImagesPending, setVisitsImagesPending] = useState([]);
  const [lastSync, setLastSync] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storageToken, setStorageToken] = useState('');
  const [insemincaoName, setInsemincaoName] = useState('');
  const [insemincaoEmail, setInsemincaoEmail] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace('T', ' ');
  };

  const handleSynchronize = async () => {
    if (!isConnected) {
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Sem conexão',
        textBody: 'Não há conexão com a internet. Verifique sua internet.',
        button: 'Fechar',
      });
    }
    try {
      const getUser = await api.getUsuario();
    } catch (error) {
      return Alert.alert(
        'Aviso',
        'Sessão do usuário expirou, acesse novamente o aplicativo?',
        [{ text: 'Ok', onPress: () => logoff(false) }],
      );
    }

    try {
      if (!loading) {
        const dateLast = !lastSync ? '2024-01-01' : lastSync;
        setLoading(true);

        const syncId = await startSynchronization();
        const usuario = await api.getUsuario();
        const user = await createUsuario(usuario.data.company.all_users);
        const justifications = await api.getJustificationVisits();
        const just = await saveJustification(justifications.data);

        const insemincao = await api.getInsemincaoVisita(dateLast);
        console.log(insemincao);
        await saveSchedules(insemincao.data);
        await endSynchronization(syncId);
        await fetchLastSynchronization();
        await loadSynchronize();
        //await sendInseminacaoVisits();
        setLoading(false);
        return Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Sucesso',
          textBody: 'Sincronização Realizada com sucesso!',
          button: 'Fechar',
        });
      }
    } catch (error) {
      setLoading(false);
      console.log('Erro durante a sincronização: ', error);
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: 'Houve uma falha tente novamente!',
        button: 'Fechar',
      });
    }
  };

  const sendInseminacaoVisits = async () => {
    const visitPendingSents = await listPending();
    for (const visit of visitPendingSents) {
      const imageSent = await listImagePending(visit);
      try {
        const response = await api.postVisita(imageSent);
        // const response = await host.post('/ateg/inseminacao/mobile/registrar-inseminacao', imageSent, {
        // 	headers: {
        // 		'Content-Type': 'multipart/form-data',
        // 		'Authorization': `Bearer ${storageToken}`
        // 	},
        // });
        const update = await updateInseminacaoPending(visit.id);
      } catch (error) {
        console.log('Erro ao enviar dados para o servidor: ', error);
        reject(error); // Rejeitado caso haja erro no envio
      }
      console.log('FIM');
    }
  };

  //Rodina para saber quais campos foram criados
  const logTableFields = () => {
    db.transaction(tx => {
      tx.executeSql(
        'PRAGMA table_info(Schedules)',
        [],
        (tx, results) => {
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            const column = rows.item(i);
            console.log(
              `Field: ${column.name}, Type: ${column.type}, Not Null: ${column.notnull}, Default: ${column.dflt_value}`,
            );
          }
        },
        error => {
          console.error('Error fetching table info:', error);
        },
      );
    });
  };

  const loadSynchronize = async () => {
    try {
      loadSynchronizations(setDataSynchronizes);
    } catch (error) {
      console.log('Erro durante a sincronização: ', error);
    }
  };

  const startSynchronization = async () => {
    const startedAt = getCurrentDateTime();

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Synchronize (started_at) VALUES (?)`,
          [startedAt],
          (_, result) => {
            console.log('Synchronization started at: ', startedAt);
            resolve(result.insertId); // Retorna o ID do registro inserido
          },
          (_, error) => {
            console.log('Erro ao iniciar sincronização: ', error);
            reject(error);
          },
        );
      });
    });
  };

  const endSynchronization = async id => {
    const endedAt = getCurrentDateTime();
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE Synchronize SET ended_at = ? WHERE id = ?`,
        [endedAt, id],
        () => console.log('Synchronization ended at: ', endedAt),
        (_, error) => console.log('Erro ao finalizar sincronização: ', error),
      );
    });
  };

  function formatDate(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-');
    return `${day}-${month}-${year} ${timePart}`;
  }

  const fetchLastSynchronization = async () => {
    try {
      const lastSyncDate = await getLastSynchronization();
      const users = await allTechnicianUsers();
      const storageUser = await AsyncStorage.getItem('@ategInsemincaoToken');
      const nameUser = await AsyncStorage.getItem('@ategInsemincaoName');
      const emailUser = await AsyncStorage.getItem('@ategInsemincaoEmail');
      setStorageToken(storageUser);
      setInsemincaoName(nameUser);
      setInsemincaoEmail(emailUser);
      setLastSync(lastSyncDate);
      getListVisits(setVisitsPending);
      getListVisitImages(setVisitsImagesPending);
    } catch (error) {
      console.log('Erro ao buscar última sincronização: ', error);
    }
  };

  useEffect(() => {
    fetchLastSynchronization();
    loadSynchronize();
    setDataSchedules(schedules);
  }, []);

  useEffect(() => {
    setHeaderOptions(navigation, {
      headerTitle: 'Sincronizador',
      headerTitleStyle: { fontFamily: 'Arial', fontSize: 14, color: '#FFF' },
      headerTintColor: '#FFF',
      headerStyle: { backgroundColor: COLORS.primary },
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderSynchronization = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        Data Sincronização: {formatDate(item.started_at)}
      </Text>
      {item.ended_at ? (
        <Text style={styles.itemText}>Realizada com sucesso</Text>
      ) : (
        <Text style={styles.itemText}>Houve falha.</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Ateg Inseminação</Text>
      </View>

      {lastSync ? (
        <Text style={styles.input}>
          Última atualização: {formatDate(lastSync)}
        </Text>
      ) : (
        <Text style={styles.input}>Nenhuma sincronização realizada ainda.</Text>
      )}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSynchronize}
        activeOpacity={0.8}
        disabled={loading}
      >
        {loading ? (
          <>
            <View style={styles.row}>
              <ActivityIndicator size={20} color="#FFF" />
              <Text style={styles.submitText}>Atualizando</Text>
            </View>
          </>
        ) : (
          <Text style={styles.submitText}>Atualizar Informações</Text>
        )}
      </TouchableOpacity>

      <FlatList
        data={dataSynchronizes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderSynchronization}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerTitle: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  list: {
    marginTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
});
