// src/screens/ForgotPasswordScreen/steps/NewPasswordStep.js

import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import {
  EyeClosedIcon,
  EyeOpenIcon,
  CheckIcon,
} from '../../../components/Icons/Icons';

const ValidationCriteria = ({ text, isValid }) => (
  <View style={styles.criteriaRow}>
    <CheckIcon color={isValid ? '#28A745' : '#D1D5DB'} />
    <Text style={[styles.criteriaText, isValid && styles.criteriaTextValid]}>
      {text}
    </Text>
  </View>
);

export default function NewPasswordStep(props) {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isPasswordVisible,
    setIsPasswordVisible,
    isConfirmPasswordVisible,
    setIsConfirmPasswordVisible,
    validations,
    canChangePassword,
    handleChangePassword,
  } = props;

  return (
    <>
      <View>
        <Text style={styles.title}>Criar Nova Senha</Text>
        <Text style={styles.subtitle}>
          Crie uma nova senha com pelo menos 8 caracteres. Para aumentar a
          segurança, combine letras, números e símbolos.
        </Text>
        <Text style={styles.inputLabel}>Nova Senha</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="senha#123"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!isPasswordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </TouchableOpacity>
        </View>
        <View style={styles.criteriaContainer}>
          <ValidationCriteria
            text="Mínimo 8 caracteres"
            isValid={validations.length}
          />
          <ValidationCriteria
            text="Dever ter pelo menos 1 número"
            isValid={validations.number}
          />
          <ValidationCriteria
            text="1 Caracter especial"
            isValid={validations.specialChar}
          />
        </View>
        <Text style={styles.inputLabel}>Confirmar nova senha</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            style={styles.eyeIcon}
          >
            {isConfirmPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, !canChangePassword && styles.buttonDisabled]}
        onPress={handleChangePassword}
        disabled={!canChangePassword}
      >
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>
    </>
  );
}

// Os estilos permanecem os mesmos
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: ms(8),
    marginBottom: ms(16),
  },
  inputPassword: {
    flex: 1,
    padding: ms(14),
    fontSize: ms(16),
    color: '#111827',
  },
  eyeIcon: { padding: ms(10) },
  criteriaContainer: { marginBottom: ms(24) },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(8),
  },
  criteriaText: { marginLeft: ms(8), fontSize: ms(14), color: '#6B7280' },
  criteriaTextValid: { color: '#10B981' },
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
