// src/components/LogoutModal.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { LogoutIcon } from '../Icons/Icons';

export default function LogoutModal({ isVisible, onClose, onConfirm }) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.5}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={1}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <LogoutIcon width={30} height={30} fill="#D9534F" />
        </View>

        <Text style={styles.title}>Sair da Conta</Text>
        <Text style={styles.message}>
          Tem certeza que deseja encerrar sua sessão?
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={[styles.buttonText, styles.confirmButtonText]}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 340,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FEECEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 18,
    color: '#212121',
    marginBottom: 8,
  },
  message: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#D9534F',
    marginLeft: 8,
  },
  buttonText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
  },
  cancelButtonText: {
    color: '#555',
  },
  confirmButtonText: {
    color: '#FFFFFF',
  },
});
