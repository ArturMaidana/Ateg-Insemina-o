import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../utils/theme';

const LoadingInfo = ({ visible, message = 'Carregando Informações...' }) => {
  if (!visible) return null; // Não renderiza se não estiver visível

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Ajuste a opacidade aqui
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Certifique-se de que o overlay fique acima de outros componentes
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent', // Para permitir que o fundo apareça
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingInfo;
