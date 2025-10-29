import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../utils/theme';
import { formatDateTime } from '../../utils/dateFormat';
import { CheckIcon } from '../Icons/Icons';

const CardNotAgenda = ({ title, dateStart, dateEnd }) => {
  return (
    <View style={styles.card}>
      <CheckIcon />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardDescription}>{title}</Text>
        <Text style={styles.cardDescription}>Data do Inicio: {dateStart}</Text>
        <Text style={styles.cardDescription}>Data do Término: {dateEnd}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    elevation: 3,
    width: '86%',
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  cardDescription: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default CardNotAgenda;
