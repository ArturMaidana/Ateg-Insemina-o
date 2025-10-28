import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';

export default function ReadOnlyField({ label, value }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.inputDisabled} value={value} editable={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: ms(20),
  },
  label: {
    fontSize: ms(14),
    color: '#333',
    marginBottom: ms(8),
    fontFamily: 'Ubuntu-Bold',
  },
  input: {
    borderWidth: ms(1),
    borderColor: '#ccc',
    borderRadius: ms(8),
    paddingHorizontal: ms(15),
    fontSize: ms(14),
    height: ms(45),
    backgroundColor: '#fff',
  },
  inputDisabled: {
    borderWidth: ms(1),
    borderColor: '#ccc',
    borderRadius: ms(8),
    paddingHorizontal: ms(15),
    fontSize: ms(16),
    height: ms(45),
    backgroundColor: '#f0f0f0',
    color: '#555',
  },
});
