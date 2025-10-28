// components/PersonCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PersonCard({ data }) {
  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'em atendimento':
        return '#FFA726';
      case 'preferencial':
        return '#42A5F5';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.indicator} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>
            #{data.id} - {data.name}
          </Text>
          <Icon name="dots-vertical" size={24} color="#555" />
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>CPF: {data.cpf}</Text>
          <Text style={styles.detailText}>Sexo: {data.sexo}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>Contato: {data.contato}</Text>
          <Text style={styles.detailText}>
            Situação:{' '}
            <Text
              style={{
                color: getStatusColor(data.situacao),
                fontWeight: 'bold',
              }}
            >
              {data.situacao}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  indicator: {
    width: 6,
    backgroundColor: '#00A859',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});
