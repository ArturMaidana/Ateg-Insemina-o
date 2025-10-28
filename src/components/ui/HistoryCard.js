import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HistoryCard({ title, startDate, endDate }) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDate}>Data do Início: {startDate}</Text>
      <Text style={styles.cardDate}>Data do Término: {endDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  cardDate: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
});
