import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ServiceItem({ service, isSelected, onSelect }) {
  return (
    <TouchableOpacity style={styles.serviceItem} onPress={onSelect}>
      <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
        {isSelected && <Text style={styles.checkboxCheck}>✓</Text>}
      </View>
      <Text style={styles.serviceItemText}>{service.nome}</Text>
      <Text style={styles.serviceItemDisp}>{service.disp} disponíveis</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  serviceItemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    color: '#333',
  },
  serviceItemDisp: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
  },
  customCheckboxContainer: {
    marginBottom: 20,
  },
  checkboxLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    color: '#333',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    fontFamily: 'Ubuntu-Regular',
    marginTop: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#00A859',
    borderColor: '#00A859',
  },
  checkboxCheck: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
