import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CardAgenda from '../../components/ui/CardAgenda';
import CardNotAgenda from '../../components/ui/CardNotAgenda';
import { loadDateSchedules } from '../../database/modelSchedule';
import { dataAtual } from '../../utils/date';

export default function Schedule() {
  const [agendas, setAgendas] = useState([]);

  async function updatedSchedules() {
    loadDateSchedules(setAgendas, dataAtual());
    console.log(agendas);
  }

  useFocusEffect(
    useCallback(() => {
      updatedSchedules();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.eventosText}>
          Confira os atendimentos em execução no momento.
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
    paddingTop: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 80,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    padding: 10,
  },
  eventosText: {
    color: '#454652',
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
  },
  programadosText: {
    color: '#7C7A80',
    fontFamily: 'Ubuntu',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  spacer: {
    width: 5,
  },
  // Estilos para componentes que podem ser usados em outras partes
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 30,
  },
  greeting: {
    fontSize: 18,
    color: '#000',
  },
  monthSelector: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#ffffffff',
    maxHeight: 80,
    height: 850,
  },
  monthButton: {
    marginRight: 10,
    padding: 10,
    borderRadius: 50,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffffff', // Cor padrão
  },
  monthButtonActive: {
    backgroundColor: '#07814f', // Cor quando active
  },
  monthText: {
    color: '#000',
    fontSize: 16,
  },
  monthTextActive: {
    color: '#ffffff',
  },
});

// Componentes reutilizáveis baseados nos estilos
export const MonthButton = ({ active, onPress, children }) => (
  <TouchableOpacity
    style={[styles.monthButton, active && styles.monthButtonActive]}
    onPress={onPress}
  >
    <Text style={[styles.monthText, active && styles.monthTextActive]}>
      {children}
    </Text>
  </TouchableOpacity>
);

export const MonthSelector = ({ children }) => (
  <ScrollView
    horizontal
    style={styles.monthSelector}
    showsHorizontalScrollIndicator={false}
  >
    {children}
  </ScrollView>
);

export const ProgramadosText = ({ children }) => (
  <Text style={styles.programadosText}>{children}</Text>
);

export const Spacer = () => <View style={styles.spacer} />;
