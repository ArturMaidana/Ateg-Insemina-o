// components/SelectField.js
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SelectField({
  label,
  selectedValue,
  onValueChange,
  items,
  loading = false,
  placeholder = 'Selecione',
}) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#00A859" />
        ) : (
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={styles.pickerText}
          >
            <Picker.Item label={placeholder} value="" color="#A9A9A9" />
            {items.map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
                color="#333"
              />
            ))}
          </Picker>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    color: '#272727',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  pickerText: {
    color: '#333',
    fontFamily: 'Ubuntu-Regular',
  },
});
