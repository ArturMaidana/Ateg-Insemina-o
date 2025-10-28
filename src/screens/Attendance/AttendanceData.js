// index.js (era Service.js)
import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  Image,
  View,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
  PermissionsAndroid,
  Platform,
  ActivityIndicator, // Importado para o Loading
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { Checkbox } from 'react-native-paper';
import GetLocation from 'react-native-get-location';

import MapView, { Marker } from 'react-native-maps';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setHeaderOptions } from '../../components/ui/HeaderTitle.js';
import { COLORS, FONTS } from '../../utils/theme.js';
import { GlobalStyleSheet } from '../../utils/StyleSheet.js';
import { getScheduleId, getRacas } from '../../database/modelSchedule.js';
import { allJustifications } from '../../database/modelJustificationVisit.js';
import {
  getLoadImages,
  saveImage,
  deleteImage,
} from '../../database/modelImage.js';
import { allTechnicianUsers } from '../../database/modelTechnicianUser.js';
import {
  getInseminacaoScheduleId,
  insertInseminacaoVisit,
  getInseminacaoScheduleExist,
  getUpdatedInseminacaoScheduleId,
} from '../../database/modelInseminacaoVisit.js';
import { dateInteger } from '../../utils/date.js';
import CardAlert from '../../components/ui/CardAlert.js';
import CardCheckout from '../../components/ui/CardCheckout.js';
import LoadingInfo from '../../components/ui/LoadingInfo.js';
import { dataAtual } from '../../utils/date.js';
import api from '../../services/endpont.js';
import db from '../../database/db.js';
import RNFS from 'react-native-fs';
import NetInfo from '@react-native-community/netinfo';

// Importe os componentes de aba
import InformationTab from './Sections/InfoTabs.js';
import PhotosTab from './Sections/PhotosTabs.js';
import LocationTab from './Sections/LocationTabs.js';
import {
  EyeIconModal,
  Lixeira,
  ArrowDownIcon,
  BackPage,
} from '../../components/Icons/Icons.js';

const { width } = Dimensions.get('window');

export default function Service() {
  const { colors } = useTheme(); // Mantido para ButtonContainer, se necessário
  const navigation = useNavigation();
  const route = useRoute();
  const { scheduleId } = route.params || {};
  const [messageText, setMessageText] = useState('');
  const [inseminacaoVisitExist, setInseminacaoVisitExist] = useState(false);
  const [isHaveAttendence, setIsHaveAttendence] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [racas, setRacas] = useState([]);
  const [inseminacaoVisit, setInseminacaoVisit] = useState([]);
  const [justifications, setJustifications] = useState([]);
  const [images, setImages] = useState([]);
  const [technicianUsers, setTechnicianUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [titleLoading, setTitleLoading] = useState('Atualizando Informações');
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [latitudeApp, setLatitudeApp] = useState('');
  const [longitudeApp, setLongitudeApp] = useState('');
  const [technicianName, setTechnicianName] = useState(null);
  const [motivo, setMotivo] = useState(null);
  const [motivoId, setMotivoId] = useState(null);
  const [modalVisibleObs, setModalVisibleObs] = useState(false);
  const [modalVisibleUser, setModalVisibleUser] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionUser, setSelectedOptionUser] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [nameTecnico, setNameTecnico] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null); // <--- DEVE ESTAR AQUI
  const buttons = ['Informações', 'Fotos', 'Localização'];
  const [active, setActive] = useState(0);

  const onClick = i => {
    setActive(i);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: i * width });
    }
  };

  const loadImages = () => {
    getLoadImages(setImages, scheduleId);
  };

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissão da Câmera',
            message:
              'Este aplicativo precisa acessar sua câmera para tirar fotos.',
            buttonNeutral: 'Perguntar Depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissão da câmera concedida');
          setHasCameraPermission(true);
          return true;
        } else {
          console.log('Permissão da câmera negada');
          setHasCameraPermission(false);
          return false;
        }
      } else {
        // Para iOS, a permissão é solicitada automaticamente ao usar launchCamera
        setHasCameraPermission(true);
        return true;
      }
    } catch (err) {
      console.warn('Erro ao solicitar permissão da câmera:', err);
      return false;
    }
  };

  // Verificar se já tem permissão da câmera
  const checkCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      setHasCameraPermission(hasPermission);
      return hasPermission;
    } else {
      // iOS - assumir que tem permissão (será solicitada automaticamente)
      setHasCameraPermission(true);
      return true;
    }
  };

  const checkIfFileExists = async uri => {
    try {
      const fileExists = await RNFS.exists(uri);
      if (!fileExists) {
        console.log('Arquivo de imagem não encontrado.');
        return false;
      }

      const stats = await RNFS.stat(uri);
      if (stats.size === 0) {
        console.log('Arquivo de imagem corrompido.');
        return false;
      }

      return true;
    } catch (err) {
      console.log('Erro ao verificar o arquivo: ', err);
      return false;
    }
  };

  const getLocationCheckin = async () => {
    setError(null);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLoading(false);
        const { latitude, longitude } = location;
        handleCheckinService(latitude, longitude);
        setError(null);
      })
      .catch(error => {
        setLoading(false);
        const { code, message } = error;
        setLoading(false);
        setError(
          'Verificar se o GPS esta ativo ou se o aparelho está com a permissão de localização ativada!',
        );
        return Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Localização',
          textBody: 'Não foi possivel encontrar a localização!',
          button: 'Fechar',
        });
      });
  };

  const getLocationPhoto = async () => {
    setError(null);
    setTitleLoading('Aguarde...');
    setLoading(true);

    // Verificar permissão da câmera primeiro
    const hasPermission = await checkCameraPermission();
    if (!hasPermission) {
      const granted = await requestCameraPermission();
      if (!granted) {
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Permissão Negada',
          textBody: 'Não é possível tirar fotos sem permissão da câmera.',
          button: 'Fechar',
        });
        return;
      }
    }

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        const { latitude, longitude } = location;
        const qtd = attempt + 1;
        setAttempt(qtd);
        takePhoto(latitude, longitude);
        setError(null);
      })
      .catch(error => {
        const { code, message } = error;
        console.log(code, message);
        setLoading(false);
        setError(
          'Verificar se o GPS esta ativo ou se o aparelho está com a permissão de localização ativada!',
        );
        return Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Localização',
          textBody: 'Não foi possivel encontrar a localização!',
          button: 'Fechar',
        });
      });
  };

  const getLocationCheckout = async () => {
    setError(null);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        const { latitude, longitude } = location;
        handleCheckoutService(latitude, longitude);
        setError(null);
      })
      .catch(error => {
        const { code, message } = error;
        console.log(code, message);
        setLoading(false);
        setError(
          'Verificar se o GPS esta ativo ou se o aparelho está com a permissão de localização ativada!',
        );
        return Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Localização',
          textBody: 'Não foi possivel encontrar a localização!',
          button: 'Fechar',
        });
      });
  };

  const fetchLastSchedule = async () => {
    try {
      const users = await allTechnicianUsers();
      setTechnicianUsers(users);
      if (users.length == 1) {
        setNameTecnico(users[0].name);
      }
      await getScheduleId(setSchedule, scheduleId);
      await getRacas(setRacas, scheduleId);
      await getInseminacaoScheduleId(setInseminacaoVisit, scheduleId);
      await getInseminacaoScheduleExist(setInseminacaoVisitExist);
      await allJustifications(setJustifications);

      const currentDateTime = new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Cuiaba',
      });

      loadImages();
      setLoading(false);
    } catch (error) {
      console.log('Erro ao buscar última sincronização: ', error);
    }
  };

  const handleCheckinService = async (lat, log) => {
    try {
      if (lat == '' || log == '') {
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Aviso',
          textBody: 'Tente novamente não foi possivel encontrar a localização!',
          button: 'Fechar',
        });
      }
      if (nameTecnico == '') {
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Aviso',
          textBody: 'Informe o técnico do atendimento!',
          button: 'Fechar',
        });
      }
      if (inseminacaoVisit.length == 0) {
        const dateNow = dateInteger();
        await insertInseminacaoVisit(
          scheduleId,
          nameTecnico,
          lat,
          log,
          dateNow,
        );
        await getInseminacaoScheduleId(setInseminacaoVisit, scheduleId);
        await getInseminacaoScheduleExist(setInseminacaoVisitExist);
        return Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Sucesso',
          textBody: 'Atendimento inicializado.',
          button: 'Fechar',
        });
      } else {
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Aviso',
          textBody:
            'Impossivel inicializar, existe um atendimento inicializado!',
          button: 'Fechar',
        });
      }
    } catch (error) {
      setLoading(false);
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error,
        button: 'Fechar',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartService = async () => {
    await getInseminacaoScheduleExist(setInseminacaoVisitExist);
    if (inseminacaoVisitExist) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Existe um atendimento em aberto finalize primeiro!',
        button: 'Fechar',
      });
    }
    if (nameTecnico == '') {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Informe o técnico do atendimento!',
        button: 'Fechar',
      });
    }
    setTitleLoading('Salvando Registro.');
    setLoading(true);
    getLocationCheckin();
  };

  const validateImages = async images => {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const isValid = await checkIfFileExists(image.uri);
      if (!isValid) {
        return false;
      }
    }
    return true;
  };

  const sendService = async () => {
    if (!isConnected) {
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Sem conexão',
        textBody: 'Não há conexão com a internet. Verifique sua rede.',
        button: 'Fechar',
      });
    }

    try {
      const areImagesValid = await validateImages(images);
      if (!areImagesValid) {
        return Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Imagens Inválidas',
          textBody:
            'Algumas imagens estão corrompidas ou ausentes. Verifique e tente novamente.',
          button: 'Fechar',
        });
      }
      const response = await api.postSendVisita(inseminacaoVisit);
      if (response.error) {
        return Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erro',
          textBody: 'Houve uma falha na visita, tente novamente!',
          button: 'Fechar',
        });
      }
      const sendImg = await enviarImagens();
    } catch (error) {
      console.log('Erro ao enviar dados para o servidor: ', error);
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: 'Houve uma falha tente novamente!' + error,
        button: 'Fechar',
      });
    }
  };

  const enviarImagens = async () => {
    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const response = await sendToBackend(image);
        if (response && response.message) {
          console.log(`Imagem ${image.name} enviada com sucesso`);
        } else {
          throw new Error(`Falha ao enviar a imagem ${image.name}`);
        }
      }
      const json = await api.postSendVisitaVisited(inseminacaoVisit);
      if (json.error) {
        return Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erro',
          textBody: 'Houve uma falha na visita, tente novamente!',
          button: 'Fechar',
        });
      }
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Inseminacao_visits SET sent = ? WHERE id = ?',
          [1, inseminacaoVisit.id],
          () =>
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Sucesso',
              textBody: `Atendimento enviado com sucesso`,
              button: 'Fechar',
            }),
          (tx, error) =>
            console.log('Erro ao atualizar o campo "sent": ', error),
        );
      });
      fetchLastSchedule();
    } catch (error) {
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: `Falha ao enviar a imagem ` + error,
        button: 'Fechar',
      });
    }
  };

  const sendToBackend = async image => {
    const formData = new FormData();

    formData.append('image', {
      uri: image.uri,
      type: 'image/jpeg',
      name: image.name,
    });

    formData.append('inseminacao_schedule_id', image.inseminacao_schedule_id);
    formData.append('date_time', image.date_time);
    formData.append('latitude', image.latitude);
    formData.append('longitude', image.longitude);
    formData.append('name', image.name);

    try {
      const response = await api.postSendVisitaImage(
        inseminacaoVisit.inseminacao_visit_id,
        formData,
      );
      return response;
    } catch (error) {
      console.error('Erro ao enviar imagem para o servidor', error);
      throw error;
    }
  };

  const handleCheckoutService = async (lat, log) => {
    try {
      if (lat == '' || log == '') {
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Aviso',
          textBody: 'Tente novamente não foi possivel encontrar a localização!',
          button: 'Fechar',
        });
      }
      await getUpdatedInseminacaoScheduleId(
        scheduleId,
        !isHaveAttendence,
        messageText,
        lat,
        log,
        motivoId,
        motivo,
      );
      await getInseminacaoScheduleId(setInseminacaoVisit, scheduleId);
      await getInseminacaoScheduleExist(setInseminacaoVisitExist);
    } catch (error) {
      setLoading(false);
      return Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error,
        button: 'Fechar',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEndService = async () => {
    if (isHaveAttendence) {
      if (motivo == '' || motivo == null) {
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Aviso',
          textBody: 'Selecione o motivo!',
          button: 'Fechar',
        });
      }
      if (messageText == '' && motivoId == 4) {
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Aviso',
          textBody: 'Para finalizar obrigatorio informar a observação!',
          button: 'Fechar',
        });
      }
      if (images.length != 1) {
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Aviso',
          textBody: 'Informe no minimo uma foto!',
          button: 'Fechar',
        });
      }
    } else if (images.length < 3) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Informe no minimo 3 fotos!',
        button: 'Fechar',
      });
    }
    setTitleLoading('Salvando Registro.');
    setLoading(true);
    getLocationCheckout();
  };

  const openImage = uri => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const takePhoto = async (latitude, longitude) => {
    setLoading(false);

    if (images.length >= 5) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Quantidade máximo de foto, impossivel adicionar foto!',
        button: 'Fechar',
      });
    }

    if (images.length >= 1 && isHaveAttendence) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Quantidade máximo de foto, impossivel adicionar foto!',
        button: 'Fechar',
      });
    }

    if ((latitude == '' || longitude == '') && attempt < 3) {
      return getLocationPhoto();
    }

    if ((latitude == '' || longitude == '') && attempt >= 3) {
      setAttempt(0);
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Tente novamente!',
        button: 'Fechar',
      });
    }

    setAttempt(0);

    const hasPermission = await checkCameraPermission();
    if (!hasPermission) {
      const granted = await requestCameraPermission();
      if (!granted) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Permissão Negada',
          textBody: 'Não é possível tirar fotos sem permissão da câmera.',
          button: 'Fechar',
        });
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
      saveToPhotos: false,
      cameraType: 'back',
    };

    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('Usuário cancelou a captura de imagem');
        setLoading(false);
      } else if (response.error) {
        console.log('Erro no ImagePicker: ', response.error);
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erro na Câmera',
          textBody: 'Não foi possível abrir a câmera. Verifique as permissões.',
          button: 'Fechar',
        });
      } else if (response.assets && response.assets[0]) {
        try {
          const photoUri = response.assets[0].uri;
          console.log('Foto capturada:', photoUri);

          const isValid = await checkIfFileExists(photoUri);
          if (!isValid) {
            setLoading(false);
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Erro',
              textBody: 'A imagem está corrompida ou não encontrada.',
              button: 'Fechar',
            });
            return;
          }

          const dateNow = dateInteger();
          const photoName = `${scheduleId}_${dateNow}.jpg`;

          // Salvar a imagem
          await saveImage(
            scheduleId,
            latitude,
            longitude,
            photoName,
            photoUri,
            loadImages,
          );

          setLoading(false);

          // Feedback de sucesso
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Sucesso',
            textBody: 'Foto salva com sucesso!',
            button: 'Fechar',
          });
        } catch (err) {
          console.log('Erro ao processar imagem:', err);
          setLoading(false);
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Erro',
            textBody: 'Erro ao salvar a foto. Tente novamente.',
            button: 'Fechar',
          });
        }
      } else {
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erro',
          textBody: 'Não foi possível capturar a imagem.',
          button: 'Fechar',
        });
      }
    });
  };

  useEffect(() => {
    try {
      fetchLastSchedule();
      checkCameraPermission();
    } catch (error) {
      console.log('Erro ao buscar última sincronização: ', error);
    }
  }, []);

  useEffect(() => {
    setHeaderOptions(navigation, {
      headerTitle: 'Atendimento Ateg',
      headerTitleStyle: { fontFamily: 'Arial', fontSize: 14, color: '#FFF' },
      headerTintColor: '#FFF',
      headerStyle: { backgroundColor: COLORS.primary },
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const openMap = () => {
    if (schedule.latitude == '' || schedule.longitude == '') {
      Alert.alert('Erro', 'A latitude e longitude não estão disponíveis.');
      return;
    }
    setModalLocationVisible(true);
  };

  const CustomSelect = ({ options, onSelect }) => {
    const handleSelect = (id, value) => {
      setMotivoId(id);
      setMotivo(value);
      onSelect(value);
      setModalVisibleObs(false);
    };

    return (
      <View>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setModalVisibleObs(true)}
        >
          <View style={styles.selectContent}>
            <Text style={styles.selectText}>
              {motivo ? motivo : 'Selecione o motivo'}
            </Text>
            <ArrowDownIcon />
          </View>
        </TouchableOpacity>

        <Modal
          visible={modalVisibleObs}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={justifications}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item.id, item.name)}
                  >
                    <Text style={styles.optionText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisibleObs(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const CustomSelectUser = ({ options, onSelect }) => {
    const handleSelectUser = value => {
      setNameTecnico(value);
      onSelect(value);
      setModalVisibleUser(false);
    };

    return (
      <View>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setModalVisibleUser(true)}
        >
          <View style={styles.selectContent}>
            <Text style={styles.selectText}>
              {nameTecnico ? nameTecnico : 'Selecione o Técnico do atendimento'}
            </Text>
            <ArrowDownIcon />
          </View>
        </TouchableOpacity>

        <Modal
          visible={modalVisibleUser}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={technicianUsers}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelectUser(item.name)}
                  >
                    <Text style={styles.optionText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisibleUser(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  function ButtonContainer({ buttons, onClick, scrollX, active }) {
    const { colors } = useTheme();
    const [btnContainerWidth, setWidth] = useState(0);
    const btnWidth = btnContainerWidth / buttons.length;
    const translateX = scrollX.interpolate({
      inputRange: [0, width, width * 2],
      outputRange: [0, btnWidth, btnWidth * 2],
    });
    return (
      <View
        style={[styles.btnContainer, { borderColor: colors.borderColor }]}
        onLayout={e => setWidth(e.nativeEvent.layout.width)}
      >
        {buttons.map((btn, i) => (
          <TouchableOpacity
            key={btn}
            style={styles.btn}
            onPress={() => onClick(i)}
          >
            <Text
              style={[
                styles.btnText,
                { color: colors.text },
                active === i && styles.activeBtnText,
              ]}
            >
              {btn}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.animatedBtnContainer,
            {
              width: btnWidth,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    );
  }

  const confirmDelete = id => {
    Alert.alert(
      'Excluir Imagem',
      'Você tem certeza que deseja excluir esta imagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => deleteImage(id, loadImages) },
      ],
      { cancelable: false },
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.cardes}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.brand}>Foto {index + 1}</Text>
        <Text style={styles.title}>{item.date_time}</Text>
        {item.sent == 0 ? (
          <Text style={styles.description}>Pendente</Text>
        ) : (
          <Text style={styles.description}>Enviado</Text>
        )}
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => openImage(item.uri)}
          style={styles.iconButton}
        >
          <EyeIconModal />
        </TouchableOpacity>
        {inseminacaoVisit &&
          inseminacaoVisit.id &&
          !inseminacaoVisit.checkout && (
            <>
              <TouchableOpacity
                onPress={() => confirmDelete(item.id)}
                style={styles.iconButton}
              >
                <Lixeira />
              </TouchableOpacity>
            </>
          )}
      </View>
    </View>
  );

  const getStatusInfo = () => {
    if (inseminacaoVisit.pending == 1) {
      return { text: 'Atendimento Realizado', color: '#00A859' };
    }
    if (inseminacaoVisit.id && !inseminacaoVisit.checkout) {
      return { text: 'Atendimento em Progresso', color: '#007BFF' };
    }
    if (
      schedule.date == dataAtual() &&
      !inseminacaoVisit.id &&
      !inseminacaoVisitExist
    ) {
      return { text: 'Aguardando Atendimento', color: '#FFA500' };
    }
    if (schedule.date != dataAtual() && !inseminacaoVisit.id) {
      return { text: 'Agendamento Fora da Data', color: '#6c757d' };
    }
    if (inseminacaoVisitExist) {
      return { text: 'Atendimento Pendente', color: '#DC3545' };
    }
    return { text: 'Indefinido', color: '#6c757d' };
  };

  const statusInfo = getStatusInfo();

  // --- Renderização (Loading) ---
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#008346" />
      </View>
    );
  }

  // --- Renderização (Principal) ---
  return (
    <View style={styles.screen}>
      <LoadingInfo visible={loading} message={titleLoading} />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.imageModalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseText}>Fechar</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalLocationVisible}
        onRequestClose={() => setModalLocationVisible(false)}
      >
        <View style={styles.mapModalContainer}>
          {schedule.latitude != '' && schedule.longitude != '' ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(schedule.latitude),
                longitude: parseFloat(schedule.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(schedule.latitude),
                  longitude: parseFloat(schedule.longitude),
                }}
              />
            </MapView>
          ) : (
            <Text style={styles.errorText}>Aguardando localização...</Text>
          )}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setModalLocationVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackPage />
        <Text style={styles.backButtonText}>Dados do atendimento</Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.labelErro}>{error}</Text>
          </View>
        )}

        <View style={styles.cardContainer}>
          <View style={styles.infoBlock}>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusTag,
                  { backgroundColor: statusInfo.color },
                ]}
              >
                <Text style={styles.statusTagText}>Status</Text>
              </View>
              <Text style={[styles.statusText, { color: statusInfo.color }]}>
                {statusInfo.text}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Propriedade:</Text>
              <Text style={styles.infoValue}>{schedule.property}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Produtor:</Text>
              <Text style={styles.infoValue}>{schedule.producer}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Técnico de Campo:</Text>
              <Text style={styles.infoValue}>{schedule.name_tecnico}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefone:</Text>
              <Text style={styles.infoValue}>{schedule.telephone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Protocolo:</Text>
              <Text style={styles.infoValue}>{schedule.protocolo}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Diagnóstico de Gestação:</Text>
              <Text style={styles.infoValue}>
                {schedule.diagnosis_gestation}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Raças:</Text>
              <Text style={styles.infoValue}>{racas.name}</Text>
            </View>
          </View>

          <ButtonContainer
            buttons={buttons}
            onClick={onClick}
            scrollX={scrollX}
            active={active}
          />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            ref={scrollViewRef}
            horizontal={true}
            pagingEnabled={true}
            scrollEventThrottle={16}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
          >
            <View style={styles.tabContent}>
              <InformationTab
                schedule={schedule}
                inseminacaoVisit={inseminacaoVisit}
                inseminacaoVisitExist={inseminacaoVisitExist}
                technicianUsers={technicianUsers}
                setSelectedOptionUser={setSelectedOptionUser}
                handleStartService={handleStartService}
                isHaveAttendence={isHaveAttendence}
                setIsHaveAttendence={setIsHaveAttendence}
                justifications={justifications}
                setSelectedOption={setSelectedOption}
                motivoId={motivoId}
                messageText={messageText}
                setMessageText={setMessageText}
                handleEndService={handleEndService}
                isConnected={isConnected}
                sendService={sendService}
                CustomSelectUser={CustomSelectUser}
                CustomSelect={CustomSelect}
              />
            </View>

            <View style={styles.tabContent}>
              <PhotosTab
                inseminacaoVisit={inseminacaoVisit}
                hasCameraPermission={hasCameraPermission}
                loading={loading}
                getLocationPhoto={getLocationPhoto}
                images={images}
                renderItem={renderItem}
                isHaveAttendence={isHaveAttendence}
              />
            </View>

            <View style={styles.tabContent}>
              <LocationTab
                openMap={openMap}
                location={location}
                error={error}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  screen: {
    flex: 1,
    backgroundColor: '#ffffffff',
    paddingTop: 40,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  infoBlock: {
    backgroundColor: '#ffffffff',
    padding: 12,
    marginBottom: 0,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusTag: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
  },
  backButtonText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 3,
  },
  statusTagText: {
    fontFamily: 'Ubuntu-Bold',
    color: '#FFFFFF',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  statusText: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 13,
    color: '#333',
    marginRight: 6,
  },
  infoValue: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 13,
    color: '#555',
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    height: 45,
    overflow: 'hidden',
    width: '100%',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 14,
    color: '#888',
  },
  activeBtnText: {
    color: '#008346',
    fontWeight: 'bold',
  },
  animatedBtnContainer: {
    height: 3,
    backgroundColor: '#008346',
    position: 'absolute',
    bottom: 0,
  },

  errorContainer: {
    padding: 10,
    backgroundColor: '#ffebee',
    marginHorizontal: 14,
  },
  labelErro: {
    color: 'red',
    fontSize: 14,
  },
  scrollContent: {
    flexGrow: 1,
  },
  tabContent: {
    width: width - 18 * 1,
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  secondaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  selectButton: {
    padding: 12,
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ffffffff',
  },
  selectContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    color: '#333',
    fontSize: 14,
  },
  imagesList: {
    marginTop: 16,
  },
  cardes: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 6,
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  brand: {
    color: '#2a9df4',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    paddingHorizontal: 8,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  fullImage: {
    width: '90%',
    height: '70%',
    borderRadius: 8,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapModalContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    color: '#333',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
