// src/hooks/useForgotPassword.js

import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

// O hook recebe a navegação como argumento para poder interagir com outras telas.
export default function useForgotPassword(navigation) {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // --- REFS ---
  const pinInputRef = useRef(null);

  // --- DERIVED STATE & VALIDATIONS (usando useMemo para otimização) ---
  const isEmailValid = useMemo(
    () => email.includes('@') && email.includes('.'),
    [email],
  );
  const isPinComplete = useMemo(() => pin.length === 5, [pin]);

  const validations = useMemo(
    () => ({
      length: newPassword.length >= 8,
      number: /\d/.test(newPassword),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    }),
    [newPassword],
  );

  const isPasswordStructureValid = useMemo(
    () => validations.length && validations.number && validations.specialChar,
    [validations],
  );

  const passwordsMatch = useMemo(
    () => newPassword === confirmPassword && newPassword !== '',
    [newPassword, confirmPassword],
  );

  const canChangePassword = useMemo(
    () => isPasswordStructureValid && passwordsMatch,
    [isPasswordStructureValid, passwordsMatch],
  );

  // --- HANDLERS / ACTIONS ---
  const handleSendCode = () => {
    if (isEmailValid) setStep(2);
  };
  const handleConfirmPin = () => {
    if (isPinComplete) setStep(3);
  };
  const handleChangePassword = () => {
    if (canChangePassword) {
      console.log('Password successfully changed!');
      navigation.navigate('SignIn');
    }
  };
  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  // --- EFFECTS ---
  useEffect(() => {
    if (step === 2) {
      pinInputRef.current?.focus();
    }
  }, [step]);

  // O hook retorna tudo que o componente precisa para renderizar e funcionar.
  return {
    step,
    email,
    setEmail,
    pin,
    setPin,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isPasswordVisible,
    setIsPasswordVisible,
    isConfirmPasswordVisible,
    setIsConfirmPasswordVisible,
    pinInputRef,
    isEmailValid,
    isPinComplete,
    validations,
    canChangePassword,
    handleSendCode,
    handleConfirmPin,
    handleChangePassword,
    handleGoBack,
  };
}
