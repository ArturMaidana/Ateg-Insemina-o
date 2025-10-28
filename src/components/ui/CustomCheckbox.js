import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function CustomCheckbox({
  label,
  value,
  onValueChange,
  descriptionValue,
  onDescriptionChange,
  placeholder,
}) {
  return (
    <View style={styles.customCheckboxContainer}>
      <TouchableOpacity
        style={styles.checkboxLabelContainer}
        onPress={() => onValueChange(!value)}
      >
        <View style={[styles.checkbox, value && styles.checkboxChecked]}>
          {value && <Text style={styles.checkboxCheck}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
      </TouchableOpacity>
      {value && (
        <TextInput
          style={styles.textarea}
          placeholder={placeholder}
          value={descriptionValue}
          onChangeText={onDescriptionChange}
          multiline
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
