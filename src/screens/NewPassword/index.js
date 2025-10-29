import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';
import { setHeaderOptions } from '../../components/ui/HeaderTitle';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EyeIcon from 'react-native-vector-icons/Feather';
import EyeOffIcon from 'react-native-vector-icons/Feather';
import api from './../../services/endpont';
import LoadingInfo from '../../screens/LoadingInfo/index';
import { COLORS } from '../../utils/theme';

export default function NewPassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, userId, tokenId } = route.params || {};

  const [passwordField, setPasswordField] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const [passwordNewField, setPasswordNewField] = useState('');
  const [passwordNewHide, setPasswordNewHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const iconColorPassWord = passwordField.length > 0 ? COLORS.primary2 : '#000';
  const iconColorPassWordNew =
    passwordNewField.length > 0 ? COLORS.primary2 : '#000';

  async function handlePassword() {
    if (passwordField == '' || passwordNewField == '') {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Informe a senha.',
        button: 'Fechar',
      });
    }
    if (passwordField.length < 6) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Senha deve ter no minímo 6 caracteres.',
        button: 'Fechar',
      });
    }

    if (passwordField != passwordNewField) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Senha são diferentes por gentileza conferir.',
        button: 'Fechar',
      });
    }

    try {
      setLoading(true);

      const response = await api.postUpdatePassword(
        passwordField,
        passwordNewField,
        userId,
        tokenId,
      );
      if (response.error) {
        return Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erro',
          textBody: response.message,
          button: 'Fechar',
        });
      }
      setPasswordField('');
      setPasswordNewField('');

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'Senha alterada com sucesso',
        button: 'OK',
        onHide: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
          });
        },
      });
    } catch (error) {
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: error,
        button: 'Fechar',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setHeaderOptions(navigation, {
      headerTitle: 'Senha',
      headerTitleStyle: { fontFamily: 'Arial', fontSize: 18, color: '#333333' },
      headerTintColor: '#333333',
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => {
            // Resetar a pilha de navegação e navegar para "SignIn"
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              }),
            );
          }}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LoadingInfo visible={loading} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>
        Digite abaixo a nova senha e também confirme esta nova senha.
      </Text>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Nova Senha</Text>
        <View style={styles.inputContainer}>
          <MCIcon
            name="lock-outline"
            size={24}
            color={iconColorPassWord}
            style={styles.icon}
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#888"
            style={styles.input}
            value={passwordField}
            secureTextEntry={passwordHide}
            onChangeText={t => setPasswordField(t)}
          />
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => setPasswordHide(!passwordHide)}
          >
            {passwordHide && (
              <EyeIcon name="eye" size={24} style={styles.eyeIcon} />
            )}
            {!passwordHide && (
              <EyeOffIcon name="eye-off" size={24} style={styles.eyeIcon} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Confirmação da nova senha</Text>
        <View style={styles.inputContainer}>
          <MCIcon
            name="lock-outline"
            size={24}
            color={iconColorPassWordNew}
            style={styles.icon}
          />
          <TextInput
            placeholder="Confirma Senha"
            placeholderTextColor="#888"
            style={styles.input}
            value={passwordNewField}
            secureTextEntry={passwordNewHide}
            onChangeText={t => setPasswordNewField(t)}
          />
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => setPasswordNewHide(!passwordNewHide)}
          >
            {passwordNewHide && (
              <EyeIcon name="eye" size={24} style={styles.eyeIcon} />
            )}
            {!passwordNewHide && (
              <EyeOffIcon name="eye-off" size={24} style={styles.eyeIcon} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handlePassword}>
        <Text style={styles.continueButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    color: '#007C6F',
    fontFamily: 'Ubuntu',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 40,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 10,
    marginTop: 16,
  },
  label: {
    color: COLORS.primary2,
    fontFamily: 'Rubik',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: COLORS.primary2,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: 'black',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: '#37C064',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  noPinButton: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
  },
  noPinButtonText: {
    fontSize: 16,
    color: '#707070',
  },
  error: {
    lineHeight: 20,
    fontSize: 16,
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
  },
  input2: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.primary4,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    color: 'black',
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  eyeIconContainer: {
    paddingHorizontal: 10,
  },
});
