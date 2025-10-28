import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../utils/theme';

const CardCheckout = ({ title }) => {
  return (
    <View style={styles.card}>
      <Icon
        name="info"
        size={32}
        color={COLORS.primary}
        style={{ marginTop: 5 }}
      />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardDescription}>{title}</Text>
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
    height: 100,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});

export default CardCheckout;
