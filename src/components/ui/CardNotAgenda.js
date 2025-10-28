import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ClockAlert } from '../Icons/Icons';

export default function CardAlert() {
  return (
    <View style={styles.body}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <ClockAlert />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardDescription}>
              Nenhuma agenda para esse período...
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  scrollContent: {
    padding: 0,
  },
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B9348',
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
