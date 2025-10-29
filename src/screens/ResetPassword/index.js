import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { setHeaderOptions } from '../../components/ui/HeaderTitle';
import api from './../../services/endpont';
import LoadingInfo from '../../screens/LoadingInfo/index';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import { COLORS } from '../../utils/theme';

export default function ResetPassword() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para formatar o CPF
  const formatCPF = cpf => {
    cpf = cpf.replace(/\D/g, ''); // Remove tudo que não for número
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  };

  const handleCpfChange = text => {
    let cleanedText = text.replace(/\D/g, '');
    if (cleanedText.length <= 11) {
      // O comprimento máximo para o valor limpo deve ser 11
      setCpf(formatCPF(cleanedText));
    }
  };

  async function handleCpfPress() {
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
      const name = response.data.name;
      navigation.navigate('ValidatePin', { cpf, name });
    } catch (error) {
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: error.message || 'Erro ao processar a solicitação', // ← Acesse a propriedade message
        button: 'Fechar',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setHeaderOptions(navigation, {
      headerTitle: 'Esqueceu sua senha?',
      headerTitleStyle: { fontFamily: 'Arial', fontSize: 18, color: '#333333' },
      headerTintColor: '#333333',
    });
  }, [navigation]);

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <LoadingInfo visible={loading} />
      <View style={styles.container}>
        <Text style={styles.title}>Não se preocupe, vamos te ajudar</Text>
        <Text style={styles.subtitle}>
          Digite seu CPF no campo abaixo e escolha como quer receber um PIN de
          validação.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Informe o CPF ou CNPJ"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={cpf}
            onChangeText={handleCpfChange}
            maxLength={14}
          />
        </View>

        {cpf.length > 13 && (
          <>
            <TouchableOpacity
              onPress={() => handleCpfPress()}
              style={styles.optionButton}
            >
              <Icon
                name="mail-outline"
                size={24}
                color={COLORS.primary3}
                style={styles.icon}
              />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>E-mail</Text>
                <Text style={styles.optionSubtitle}>
                  Receber PIN no E-mail cadastrado
                </Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={24}
                color={COLORS.primary3}
              />
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Vamos te enviar o código PIN por e-mail, confira sua caixa de
              spam.
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    color: '#007C6F',
    fontFamily: 'Ubuntu',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
    marginBottom: 30,
  },
  input: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  icon: {
    marginRight: 10,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#007C6F',
    fontWeight: 'bold',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  label: {
    color: '#333',
    fontFamily: 'Ubuntu',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
});
