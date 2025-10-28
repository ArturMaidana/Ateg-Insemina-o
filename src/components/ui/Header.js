import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BellIcon } from '../Icons/Icons';

export default function Header() {
  const [userName, setUserName] = useState('Carregando...');
  const [userAvatar, setUserAvatar] = useState(null);
  const [location, setLocation] = useState('Buscando localização...');

  async function loadStorage() {
    try {
      const storageUser = await AsyncStorage.getItem('@ategInsemincaoName');
      setUserName(storageUser || 'Visitante');

      setUserAvatar(require('../../assets/AdminPhoto.png'));

      // Mock da localização - você pode implementar geolocalização real aqui
      setLocation('Cuiabá, Mato Grosso');
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setUserName('Visitante');
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  const handleNotificationPress = () => {
    // Aqui você pode adicionar a lógica para abrir notificações
    console.log('Notificações pressionadas');
  };

  return (
    <View style={styles.staticHeader}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={userAvatar}
          defaultSource={require('../../assets/AdminPhoto.png')}
        />
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Bem-vindo, {userName}</Text>
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={handleNotificationPress}
        >
          <BellIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  staticHeader: {
    paddingTop: 45,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0EE',
    borderWidth: 2,
    borderColor: '#00A859',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212121',
  },
  locationText: {
    fontWeight: 'light',
    fontSize: 13,
    color: '#757575',
  },
  notificationButton: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
