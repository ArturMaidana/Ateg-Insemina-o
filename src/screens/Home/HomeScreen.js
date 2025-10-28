// Home.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ScrollView,
  PermissionsAndroid,
  Platform,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CardAgenda from '../../components/ui/CardAgenda';
import CardNotAgenda from '../../components/ui/CardNotAgenda';
import Header from '../../components/ui/Header';
import MonthCarousel from '../../components/ui/MonthCarousel'; // Importe o novo componente
import { initializeTables } from '../../database/schemas';
import { loadSchedules } from '../../database/modelSchedule';

export default function Home() {
  const [locationPermission, setLocationPermission] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [agendas, setAgendas] = useState([]);
  const [monthlyEventCounts, setMonthlyEventCounts] = useState({});

  async function updatedMonth(index) {
    setSelectedMonth(index);
    const year = new Date().getFullYear();
    const firstDayOfMonth = new Date(year, index, 1);

    // Carrega os agendamentos para o mês selecionado
    loadSchedules(
      setAgendas,
      firstDayOfMonth.getFullYear(),
      String(firstDayOfMonth.getMonth() + 1).padStart(2, '0'),
    );

    // Aqui você pode adicionar a lógica para contar eventos por mês
    // Por enquanto, vou deixar um placeholder
    updateMonthlyEventCounts();
  }

  const updateMonthlyEventCounts = () => {
    // Esta função deve contar quantos eventos existem em cada mês
    // Por enquanto, vou criar dados mockados
    const counts = {};
    for (let i = 0; i < 12; i++) {
      counts[i] = Math.floor(Math.random() * 10); // Mock data
    }
    setMonthlyEventCounts(counts);
  };

  useFocusEffect(
    useCallback(() => {
      initializeTables();
      const currentMonthIndex = new Date().getMonth();
      setSelectedMonth(currentMonthIndex);
      updatedMonth(currentMonthIndex);
      updateMonthlyEventCounts();
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

  return (
    <View style={styles.container}>
      <Header />

      {/* Use o novo componente MonthCarousel */}
      <MonthCarousel
        displayMonthIndex={selectedMonth}
        onMonthChange={updatedMonth}
        monthlyEventCounts={monthlyEventCounts}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {agendas.length > 0 ? (
          agendas.map(schedule => (
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
          ))
        ) : (
          <CardNotAgenda />
        )}
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
