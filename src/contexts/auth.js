import React, { createContext, useState, useEffect, useReducer } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { clearRegister } from '../database/clearTable';

export const AuthContext = createContext();

export default ({ children }) => {
  const navigation = useNavigation();
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadStorage() {
    try {
      const storageUser = await AsyncStorage.getItem('@ategInsemincaoToken');
      if (storageUser) {
        try {
          api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
          checkLocationPermission();
        } finally {
          setUser(null);
          setLoading(false);
        }
      } else {
        navigation.reset({ routes: [{ name: 'SignIn' }] });
        setUser(null);
      }
    } catch (error) {
      await AsyncStorage.setItem('@ategInsemincaoToken', '');
      console.error('Erro ao carregar o armazenamento:', error);
      navigation.reset({ routes: [{ name: 'SignIn' }] });
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    //loadStorage();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      const response = await api.post('/app-login', {
        email: email,
        password: password,
        device_name: 'MOBILE',
      });

      const accessToken = response.data.data.token || '';

      api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      const responseJson = await api.get('/usuario');

      // Salva o token no AsyncStorage
      await AsyncStorage.setItem(
        '@ategInsemincaoName',
        responseJson.data.data.user.name,
      );
      await AsyncStorage.setItem(
        '@ategInsemincaoEmail',
        responseJson.data.data.user.email,
      );
      await AsyncStorage.setItem('@ategInsemincaoToken', accessToken);
      await loadStorage();
    } catch (err) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: 'Credenciais inválidas',
        button: 'Fechar',
      });
      console.log('ERRO AO LOGAR ', err);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function logoff(clear) {
    if (clear) {
      await clearRegister();
    }
    setUser(null);
    const accessToken = '';
    await AsyncStorage.setItem('@ategInsemincaoToken', accessToken);
    await loadStorage();
  }

  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted) {
        navigation.reset({ routes: [{ name: 'MainTabs' }] });
      } else {
        navigation.reset({ routes: [{ name: 'MainTabs' }] });
        //navigation.reset({ routes: [{ name: 'Permission' }] });
      }
    } else {
      // Para iOS, você pode usar a permissão automática
      navigation.reset({ routes: [{ name: 'MainTabs' }] });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        loadingAuth,
        loading,
        logoff,
        loadStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
