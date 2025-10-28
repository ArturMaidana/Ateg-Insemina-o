// src/screens/ForgotPasswordScreen/steps/PinStep.js

import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import { ms } from 'react-native-size-matters';

export default function PinStep({
  pin,
  setPin,
  isPinComplete,
  handleConfirmPin,
  pinInputRef,
}) {
  return (
    <>
      <View>
        <Text style={styles.title}>Esqueceu a senha? A gente te ajuda!</Text>
        <Text style={styles.subtitle}>
          Digite abaixo o código PIN que enviamos para o seu e-mail cadastrado.
        </Text>
        <Pressable
          style={styles.pinContainer}
          onPress={() => pinInputRef.current?.focus()}
        >
          {[...Array(5)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.pinBox,
                pin.length === index && styles.pinBoxFocused,
              ]}
            >
              <Text style={styles.pinText}>{pin[index] || ''}</Text>
            </View>
          ))}
        </Pressable>
        <TextInput
          ref={pinInputRef}
          style={styles.hiddenInput}
          keyboardType="numeric"
          maxLength={5}
          value={pin}
          onChangeText={setPin}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, !isPinComplete && styles.buttonDisabled]}
        onPress={handleConfirmPin}
        disabled={!isPinComplete}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: ms(20),
    fontFamily: 'Ubuntu-Bold',
    color: '#333',
    marginBottom: ms(10),
  },
  subtitle: {
    fontSize: ms(14),
    color: '#333',
    marginBottom: ms(20),
    fontFamily: 'Ubuntu-Light',
    lineHeight: ms(20),
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ms(24),
  },
  pinBox: {
    width: ms(45),
    height: ms(45),
    borderWidth: ms(1),
    borderColor: '#D1D5DB',
    borderRadius: ms(8),
    elevation: ms(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  pinBoxFocused: {
    borderColor: '#28A745',
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  pinText: { fontSize: ms(24), fontFamily: 'Ubuntu-Regular', color: '#333' },
  hiddenInput: { position: 'absolute', width: 1, height: 1, opacity: 0 },
  button: {
    backgroundColor: '#00A859',
    borderRadius: ms(10),
    paddingVertical: ms(12),
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#D1D5DB' },
  buttonText: {
    color: '#FFFFFF',
    fontSize: ms(15),
    fontFamily: 'Ubuntu-Regular',
  },
});
