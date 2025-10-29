import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../utils/theme';
import { formatDateTime } from '../../utils/dateFormat';
import { CheckCircleSolid, CheckIcon } from '../Icons/Icons';

const CardNotAgenda = ({ title, dateStart, dateEnd }) => {
  return (
    <View style={styles.card}>
      <CheckCircleSolid />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardDescription}>
          <Text style={styles.cardtitle}>{title}</Text>
        </Text>
        <Text style={styles.cardDescription}>
          Data do Inicio:<Text style={styles.cardtexts}> {dateStart}</Text>
        </Text>
        <Text style={styles.cardDescription}>
          Data do Término: <Text style={styles.cardtexts}> {dateEnd}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    elevation: 3,
    width: '100%',
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  cardDescription: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
    fontWeight: '600',
  },
  cardtexts: {
    fontSize: 12,
    color: '#333',
    fontWeight: '400',
  },
  cardtitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '900',
  },
});

export default CardNotAgenda;
