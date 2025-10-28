// src/screens/ForgotPasswordScreen/steps/EmailStep.js

import React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { ms } from 'react-native-size-matters';

export default function EmailStep({
  email,
  setEmail,
  isEmailValid,
  handleSendCode,
}) {
  return (
    <>
      <View>
        <Text style={styles.title}>Esqueceu a senha? A gente te ajuda!</Text>
        <Text style={styles.subtitle}>
          Informe seu e-mail no campo abaixo e escolha como deseja receber o
          código de verificação.
        </Text>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe seu e-mail"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, !isEmailValid && styles.buttonDisabled]}
        onPress={handleSendCode}
        disabled={!isEmailValid}
      >
        <Text style={styles.buttonText}>Enviar Código</Text>
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
  inputLabel: {
    fontSize: ms(14),
    fontFamily: 'Ubuntu-Bold',
    color: '#374151',
    marginBottom: ms(8),
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: ms(1),
    borderColor: '#D1D5DB',
    borderRadius: ms(8),
    padding: ms(13),
    fontSize: ms(13),
    fontFamily: 'Ubuntu-Regular',
    color: '#333',
    marginBottom: ms(20),
  },
  button: {
    backgroundColor: '#00A859',
    borderRadius: ms(10),
    paddingVertical: ms(12),
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#D1D5DB' },
  buttonText: {
    color: '#FFFFFF',
    fontSize: ms(14),
    fontFamily: 'Ubuntu-Regular',
  },
});
