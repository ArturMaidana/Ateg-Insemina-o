// components/InputField.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  editable = true,
  multiline = false,
  style
}) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          !editable && styles.inputDisabled,
          multiline && styles.textArea,
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 16 },
  label: {
    fontFamily: "Ubuntu-Bold",
    fontSize: 14,
    color: '#272727',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Ubuntu-Regular',
  },
  textArea: { 
    height: 100, 
    textAlignVertical: 'top' 
},
  inputDisabled: { 
    backgroundColor: '#F8F8F8', 
    color: '#999' 
},
});
