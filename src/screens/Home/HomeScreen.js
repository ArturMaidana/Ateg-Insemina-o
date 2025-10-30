import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {
  ScrollView,
  PermissionsAndroid,
  Platform,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator, // Importado para o loading
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../contexts/auth';

import CardAgenda from '../../components/ui/CardAgenda';
import CardNotAgenda from '../../components/ui/CardNotAgenda';
import SyncComponent from '../../components/ui/SyncCompoent';
import Header from '../../components/ui/Header';
import MonthCarousel from '../../components/ui/MonthCarousel';
import { initializeTables } from '../../database/schemas';
import {
  loadSchedules, // Agora é uma Promise
  getMonthlyScheduleCounts, // Agora é uma Promise
} from '../../database/modelSchedule';

const ASYNC_STORAGE_KEY = '@syncHistory';

export default function Home() {
  const { logoff } = useContext(AuthContext);

  const [locationPermission, setLocationPermission] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [agendas, setAgendas] = useState([]);
  const [monthlyEventCounts, setMonthlyEventCounts] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [hasEverSynced, setHasEverSynced] = useState(false);

  /**
   * [MODIFICADO]
   * Esta função agora é 'async' e usa 'await' nas novas
   * funções do banco de dados.
   */
  async function updatedMonth(index) {
    setIsLoading(true); // Inicia o loading
    setAgendas([]); // Limpa as agendas antigas
    setSelectedMonth(index);
    const year = new Date().getFullYear();

    try {
      // 1. Carrega as contagens e os agendamentos em paralelo
      const countsPromise = getMonthlyScheduleCounts(year);
      const schedulesPromise = loadSchedules(
        year,
        String(index + 1).padStart(2, '0'),
      );

      // 2. Espera os dois terminarem
      const [counts, schedules] = await Promise.all([
        countsPromise,
        schedulesPromise,
      ]);

      // 3. Atualiza o estado
      setMonthlyEventCounts(counts);
      setAgendas(schedules);
    } catch (error) {
      console.error('Erro ao atualizar mês:', error);
      setAgendas([]); // Garante que está vazio em caso de erro
    } finally {
      // 4. GARANTE que o loading termine, não importa o que aconteça
      setIsLoading(false);
    }
  }

  // Esta função não é mais necessária, pois a lógica está em 'updatedMonth'
  // const updateMonthlyEventCounts = () => { ... };

  /**
   * [MODIFICADO]
   * Este é o principal fluxo de carregamento da tela.
   */
  useFocusEffect(
    useCallback(() => {
      const loadInitialData = async () => {
        setIsLoading(true); // Inicia o loading
        try {
          // 1. Verifica se o usuário já sincronizou alguma vez
          const syncHistory = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
          setHasEverSynced(syncHistory !== null);

          // 2. Espera as tabelas serem inicializadas
          //    (Assumindo que initializeTables() é uma Promise.
          //    Se não for, mude para: await initializeTables(); )
          await initializeTables();

          // 3. Carrega os dados do mês (esta função agora é async
          //    e desliga o loading automaticamente)
          const currentMonthIndex = new Date().getMonth();
          await updatedMonth(currentMonthIndex);
        } catch (error) {
          console.error('Erro ao carregar dados iniciais:', error);
          setIsLoading(false); // Garante que o loading pare em caso de erro
        }
      };

      loadInitialData();
      checkLocationPermission();
    }, []),
  );

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      setLocationPermission(granted);
    } else {
      setLocationPermission(true);
    }
  };

  /**
   * [MODIFICADO]
   * O handleSyncComplete agora é 'async'
   */
  const handleSyncComplete = async () => {
    setIsLoading(true); // Mostra o spinner
    await updatedMonth(selectedMonth); // Recarrega os dados
    setHasEverSynced(true); // Marca que o app foi sincronizado
    // O 'setIsLoading(false)' já está dentro de 'updatedMonth'
  };

  const handleSessionExpired = () => {
    Alert.alert(
      'Sessão Expirada',
      'Sua sessão expirou. Por favor, faça login novamente.',
      [{ text: 'OK', onPress: () => logoff(false) }],
    );
  };

  /**
   * A lógica de renderização agora tem 4 estados
   */
  const renderContent = () => {
    // Estado 1: Carregando dados do banco
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          color="#008346"
          style={{ marginTop: 50 }}
        />
      );
    }

    // Estado 2: Carregado e com agendamentos
    if (agendas.length > 0) {
      return agendas.map(schedule => (
        <CardAgenda
          key={schedule.id}
          scheduleId={schedule.id}
          title={schedule.property}
          produtor={schedule.producer}
          dateEvent={schedule.dateEvent}
          date={schedule.date}
          datatime={schedule.time}
          status={schedule.visited}
          grupo={schedule.group_name}
          protocolStep={schedule.protocol_step}
          pending={schedule.pending}
          sent={schedule.sent}
          checkin={schedule.checkin}
        />
      ));
    }

    // Estado 3: Carregado, sem agendamentos, MAS JÁ SINCRONIZADO
    if (hasEverSynced) {
      return <CardNotAgenda />;
    }

    // Estado 4: Carregado, sem agendamentos E NUNCA SINCRONIZADO
    return (
      <SyncComponent
        onSyncComplete={handleSyncComplete}
        onSessionExpired={handleSessionExpired}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <MonthCarousel
        displayMonthIndex={selectedMonth}
        onMonthChange={updatedMonth} // Passa a nova função async
        monthlyEventCounts={monthlyEventCounts}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
});
