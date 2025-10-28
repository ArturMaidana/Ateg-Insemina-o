import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccessProfile = ({ visible, onClose }) => {
  const handleProfile = index => {
    onClose(); // Fecha o modal
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Entre em contato</Text>
          <Text style={styles.subTitle}>E-mail: suporte@senarmt.org.br</Text>
          <Text style={styles.subTitle}>Telefone: (65) 3928-4800</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleProfile(2)}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2B9348', // verde escuro
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccessProfile;
