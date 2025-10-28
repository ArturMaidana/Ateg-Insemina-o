// src/components/ServiceCard.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { ArrowDownIcon, EyeIcon } from '../Icons/Icons';
export default function ServiceCard({ location, onPress }) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <EyeIcon width={35} height={35} style={styles.icon} />
          <Text style={styles.infoText}>{location}</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        <ArrowDownIcon width={20} height={10} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
    color: '#1f1f1fff',
  },
  statusRow: {
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
