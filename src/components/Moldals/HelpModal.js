import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const CloseIcon = () => (
  <Text style={{ fontSize: 24, color: '#333', fontWeight: '300' }}>×</Text>
);

export default function HelpModal({ isVisible, onClose }) {
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ajuda</Text>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.title}>Precisa de ajuda?</Text>
          <Text style={styles.subtitle}>
            Se você tiver dúvidas, encontrar algum problema ou quiser enviar
            sugestões sobre o aplicativo{' '}
            <Text style={{ fontWeight: 'bold' }}>Senar Mutirão</Text>, entre em
            contato conosco pelos canais oficiais:
          </Text>

          <View style={styles.contactBox}>
            <Text style={styles.contactText}>
              📧 <Text style={styles.bold}>E-mail:</Text>{' '}
              atendimento@senarmt.org.br
            </Text>
            <Text style={styles.contactText}>
              🌐 <Text style={styles.bold}>Site:</Text>{' '}
              https://www.senarmt.org.br
            </Text>
            <Text style={styles.contactText}>
              📞 <Text style={styles.bold}>Telefone:</Text> (65) 3928-4600
            </Text>
          </View>

          <Text style={styles.footerText}>
            O SENAR Mato Grosso está à disposição para ajudar e aprimorar
            continuamente a sua experiência com o aplicativo.
          </Text>
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
    paddingBottom: 10,
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
    borderBottomColor: '#f0f0f0',
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
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 13,
    color: '#8d8d8d',
    textAlign: 'center',
    maxWidth: '95%',
    marginBottom: 18,
  },
  contactBox: {
    backgroundColor: '#f7f8fa55',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  contactText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
  },
  bold: {
    fontFamily: 'Ubuntu-Medium',
  },
  footerText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    maxWidth: '95%',
  },
});
