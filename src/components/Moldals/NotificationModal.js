// src/components/NotificationModal.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal'; // 1. Importado da biblioteca!
import { s, vs, ms } from 'react-native-size-matters';

const NotificationModal = ({ visible, onClose, notifications }) => {
  const renderItem = ({ item }) => (
    <View style={[styles.notificationCard, !item.read && styles.unreadCard]}>
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.6}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={1}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Notificações</Text>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FAFAFA',
    borderRadius: ms(10),
    padding: ms(20),
    width: '85%',
    height: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(15),
    color: '#212121',
    marginBottom: vs(15),
    textAlign: 'center',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: ms(8),
    padding: ms(10),
    marginBottom: vs(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: ms(4),
    borderColor: '#E0E0E0',
  },
  unreadCard: {
    borderColor: '#00A859',
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: ms(13),
    color: '#333',
  },
  notificationDescription: {
    fontFamily: 'Ubuntu-Light',
    fontSize: ms(12),
    color: '#666',
    marginTop: vs(3),
  },
  notificationTime: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(10),
    color: '#8b8b8bff',
    marginTop: vs(4),
    textAlign: 'right',
  },
});

export default NotificationModal;
