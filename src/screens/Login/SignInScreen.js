import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Famato from '../../assets/Famato.svg';
import { ms } from 'react-native-size-matters';
import { EmailIcon, LockIcon } from '../../components/Icons/Icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const { height } = Dimensions.get('window');

export default function SignInScreen() {
  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const logoContainerY = useRef(new Animated.Value(0)).current;
  const logoX = useRef(new Animated.Value(-55)).current;
  const nomeX = useRef(new Animated.Value(60)).current;
  const nomeY = useRef(new Animated.Value(0)).current;
  const formY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoContainerY, {
        toValue: -(height / 3),
        duration: 800,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(logoX, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(nomeX, {
        toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(nomeY, {
        toValue: 5,
        duration: 800,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(formY, {
        toValue: 0,
        duration: 600,
        delay: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignClick = async () => {
    if (ValidarAcesso()) {
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: 'Por favor, preencha todos os campos corretamente.',
        button: 'Fechar',
      });
    }
    signIn(email, password);
  };

  const ValidarAcesso = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email === '' || password === '' || !reg.test(email.trim())) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.containerLogo,
          { transform: [{ translateY: logoContainerY }] },
        ]}
      >
        <Animated.View style={{ transform: [{ translateX: logoX }] }}>
          <Image
            source={require('../../assets/LogoOficial.png')}
            style={{ width: 90, height: 90 }}
          />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateX: nomeX }, { translateY: nomeY }],
          }}
        >
          <Image
            source={require('../../assets/NameApp.png')}
            style={{ width: 150, height: 60 }}
          />
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[styles.containerForm, { transform: [{ translateY: formY }] }]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAwareScrollView
            style={{ width: '100%' }}
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            extraScrollHeight={ms(20)} // Um pequeno ajuste extra de altura se necessário
          >
            <View style={styles.formContent}>
              <Text style={styles.title}>Seja Bem-vindo!</Text>
              <Text style={styles.text}>
                Para continuar é necessário fazer login
              </Text>

              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <EmailIcon />
                <TextInput
                  style={styles.input}
                  placeholder=" Digite seu email"
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputContainer}>
                <LockIcon />
                <TextInput
                  style={styles.input}
                  placeholder=" Digite sua senha"
                  placeholderTextColor="#aaa"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => navigation.navigate('ResetPassword')}
              >
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={handleSignClick}>
                {loadingAuth ? (
                  <ActivityIndicator size={20} color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Entrar</Text>
                )}
              </TouchableOpacity>
              <Famato width="70%" height={70} />
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#006837',
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerLogo: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    height: '70%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: ms(45),
    borderTopRightRadius: ms(45),
    paddingTop: ms(20),
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingBottom: ms(40),
  },
  formContent: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(14),
    color: '#333',
    marginBottom: ms(5),
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: ms(1),
    borderColor: '#e7e7e7ff',
    borderRadius: ms(12),
    paddingHorizontal: ms(15),
    marginBottom: ms(15),
    backgroundColor: '#fffffff9',
  },

  input: {
    fontFamily: 'Ubuntu-Light',
    flex: 1,
    height: ms(45),
    fontSize: ms(14),
    color: '#333',
    paddingLeft: ms(10),
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#333',
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(14),
    marginTop: ms(10),
  },
  title: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(18),
    marginBottom: ms(5),
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(14),
    marginBottom: ms(40),
    color: '#3d3d3dff',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: ms(40),
  },
  button: {
    backgroundColor: '#00A859',
    borderRadius: ms(10),
    paddingVertical: ms(12),
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ms(40),
  },
  buttonText: {
    fontFamily: 'Ubuntu-Bold',
    color: '#FFF',
    fontSize: ms(15),
  },
});
