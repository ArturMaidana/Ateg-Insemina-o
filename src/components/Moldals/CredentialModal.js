import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';

import { QrCodeIcon } from '../Icons/Icons';

const CloseIcon = () => (
  <Text style={{ fontSize: 24, color: '#333', fontWeight: '300' }}>×</Text>
);

const INSTRUCTIONS = [
  'Abra o app do evento',
  'Escaneie o QR code',
  'Complete seu credenciamento',
  'Apresente na entrada do evento',
];

export default function CredentialModal({ isVisible, onClose }) {
  const qrCodeValue = 'https://senarmt.org.br/user/12345';

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.5}
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionOutTiming={1}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <QrCodeIcon />
            <Text style={styles.headerTitle}>Credenciamento</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Identificação em eventos</Text>
          <Text style={styles.subtitle}>
            Escaneie o QR code para fazer seu credenciamento no evento
          </Text>

          <View style={styles.qrCodeWrapper}>
            <QRCode
              value={qrCodeValue}
              size={180}
              backgroundColor="transparent"
            />
          </View>

          <View style={styles.instructionsBox}>
            <Text style={styles.instructionsTitle}>Como usar:</Text>
            {INSTRUCTIONS.map((item, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.instructionText}>{item}</Text>
              </View>
            ))}
          </View>
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
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    width: '100%',
    maxWidth: 380,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 6,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffffff',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
    color: '#212121',
  },
  body: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 16,
    color: '#212121',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 13,
    color: '#8d8d8dff',
    textAlign: 'center',
    maxWidth: '95%',
    marginBottom: 24,
  },
  qrCodeWrapper: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 24,
  },
  instructionsBox: {
    backgroundColor: '#f7f8fa44',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  instructionsTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#555',
    marginRight: 8,
    lineHeight: 20,
  },
  instructionText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    color: '#555',
    flex: 1,
  },
});
