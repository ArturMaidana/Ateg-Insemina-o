// src/components/EventCard.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  CalendarIcon,
  PinIcon,
  ArrowRightIcon,
  User1,
  UserAddLine,
  Boxes,
} from '../Icons/Icons';

const STATUS_COLORS = {
  Aguardando: '#FFA500',
  'Em Progresso': '#007BFF',
  Realizado: '#00A859',
  Cancelado: '#DC3545',
  default: '#6c757d',
};

export default function RunningCard({
  tagText,
  idText,
  productor,
  date,
  group,
  statusText,
  onPress,
}) {
  const tagColor = STATUS_COLORS[statusText] || STATUS_COLORS.default;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.topRow}>
        <View style={[styles.tagContainer, { backgroundColor: tagColor }]}>
          <Text style={styles.tagText}>{tagText}</Text>
        </View>
        <Text style={styles.idText} numberOfLines={1}>
          {idText}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <User1 width={16} />
          <Text style={styles.infoText}>
            <Text style={styles.primaryText}>Produtor: </Text>
            {productor}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Boxes width={16} />
          <Text style={styles.infoText}>
            <Text style={styles.primaryText}>Grupo: </Text>
            {group}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <CalendarIcon width={16} />
          <Text style={styles.infoText}>{date}</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        <Text style={[styles.statusText, { color: tagColor }]}>
          {statusText}
        </Text>
        <ArrowRightIcon width={20} />
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryText: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 13,
  },
  tagContainer: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 5,
  },
  tagText: {
    fontFamily: 'Ubuntu-Bold',
    color: '#FFFFFF',
    fontSize: 12,
  },
  idText: {
    flex: 1,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    color: '#333',
  },
  infoSection: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  infoText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    color: '#333',
    marginLeft: 8,
  },
  statusRow: {
    marginTop: -18,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 12,
    marginRight: 4,
  },
});
