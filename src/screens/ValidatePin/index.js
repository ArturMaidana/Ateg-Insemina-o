import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setHeaderOptions } from '../../components/ui/HeaderTitle';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import api from './../../services/endpont';
import LoadingInfo from '../../screens/LoadingInfo/index';
import { COLORS } from '../../utils/theme';

export default function ValidatePin() {
  const navigation = useNavigation();
  const route = useRoute();
  const { cpf, name } = route.params || {};

  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  // Refs para cada PinInput
  const inputRefs = useRef([]);

  async function handleResendCode() {
    try {
      setLoading(true);
      const response = await api.getRecoverPassword(cpf);
      if (response.error) {
        return Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erro',
          textBody: response.message,
          button: 'Fechar',
        });
      }
      setPin('');
      return Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'Token Reenviado no e-mail.',
        button: 'Fechar',
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

  async function validatePin() {
    if (pin.length == 5) {
      try {
        setLoading(true);
        const response = await api.getVerifyToken(cpf, pin);
        if (response.error) {
          return Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Erro',
            textBody: response.message,
            button: 'Fechar',
          });
        }
        const name = response.data.name;
        const userId = response.data.id;
        const tokenId = response.token_id;

        navigation.navigate('NewPassword', { name, userId, tokenId });
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
  }

  function handleNotResendCode() {
    return Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Contato',
      textBody: 'Enviei um e-mail para suporte@senarmt.org.br',
      button: 'Fechar',
    });
  }

  useEffect(() => {
    setHeaderOptions(navigation, {
      headerTitle: 'Validar PIN',
      headerTitleStyle: { fontFamily: 'Arial', fontSize: 18, color: '#333333' },
      headerTintColor: '#333333',
    });
  }, [navigation]);

  // Determina a cor do botão com base no PIN
  const continueButtonColor = pin.length === 5 ? COLORS.primary : '#D3D3D3';

  return (
    <View style={styles.container}>
      <LoadingInfo visible={loading} />
      <Text style={styles.title}>Óla {name}</Text>
      <Text style={styles.description}>
        Digite abaixo o código PIN que enviamos para o seu celular cadastrado.
      </Text>

      <View style={styles.pinInputContainer}>
        {Array(5)
          .fill('')
          .map((_, index) => (
            <TextInput
              key={index}
              style={styles.pinInput}
              maxLength={1}
              keyboardType="numeric"
              value={pin[index] || ''}
              ref={ref => (inputRefs.current[index] = ref)} // Configura a referência
              onChangeText={text => {
                const newPin = pin.split('');
                newPin[index] = text;
                setPin(newPin.join(''));

                // Mover o foco para o próximo campo se houver
                if (text && index < 4) {
                  inputRefs.current[index + 1]?.focus();
                }
              }}
              onKeyPress={({ nativeEvent }) => {
                // Se o usuário pressionar Backspace e o campo estiver vazio, vá para o campo anterior
                if (
                  nativeEvent.key === 'Backspace' &&
                  !pin[index] &&
                  index > 0
                ) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
            />
          ))}
      </View>

      <Text style={styles.description}>
        Te enviamos o código PIN por e-mail, mas confira também sua caixa de
        spam.
      </Text>

      <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
        <Text style={styles.resendText}>Reenviar código</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: continueButtonColor },
        ]}
        onPress={validatePin}
        disabled={pin.length != 5}
      >
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.noPinButton}
        onPress={handleNotResendCode}
      >
        <Text style={styles.noPinButtonText}>Não recebi o PIN</Text>
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
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'start',
    marginBottom: 8,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'start',
    marginTop: 10,
    marginBottom: 40,
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    padding: 20,
  },
  pinInput: {
    borderBottomWidth: 2,
    borderColor: '#707070',
    fontSize: 18,
    textAlign: 'center',
    width: '10%',
  },
  resendButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  resendText: {
    fontSize: 16,
    color: '#707070',
    textAlign: 'center',
  },
  continueButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
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
});
