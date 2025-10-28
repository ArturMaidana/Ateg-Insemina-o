// components/ServiceCheckbox.js
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function ServiceCheckbox({ label, available, checked, onToggle }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onToggle}>
      <View style={styles.row}>
        <View style={[styles.box, checked && styles.boxChecked]}>
          {checked && <Text style={styles.check}>✓</Text>}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.availability}>{available} disponíveis</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  box: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#B0B0B0',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: '#00A859',
    borderColor: '#00A859',
  },
  check: { 
    color: 'white', 
    fontSize: 12, 
    fontWeight: 'bold' 
},
  label: { 
    fontSize: 14, 
    color: '#333', 
    fontFamily: 'Ubuntu-Regular'
 },
  availability: {
     fontSize: 13, 
     color: '#777' },
});
