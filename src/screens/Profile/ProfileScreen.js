import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import CredentialModal from '../../components/Moldals/CredentialModal';
import TermsOfUseModal from '../../components/Moldals/TermsOfUseModal';
import NotesUpdates from '../../components/Moldals/NotesUpdates';
import LogoutModal from '../../components/Moldals/LogoutModal';
import SyncModal from '../../components/Moldals/SyncModal';
import HelpModal from '../../components/Moldals/HelpModal';
import { s, vs, ms } from 'react-native-size-matters';

import {
  ShieldCheckIcon,
  HelpIcon,
  QrCodeIcon,
  CheckBadgeIcon,
  LogoutIcon,
  NotificationIcon,
  ArrowRightFilledIcon,
  BellIcon,
  CloudSync,
} from '../../components/Icons/Icons';

import CustomSwitch from '../../components/ui/CustomSwitch';

const userData = {
  name: 'Luis Felipe',
  email: 'Luis.Felipe@senarmt.org.br',
  avatarUrl: '../../assets/AdminPhoto.png',
};

const ProfileRow = ({
  iconName,
  text,
  type = 'navigate',
  isDestructive = false,
  switchValue,
  onSwitchChange,
  onPress,
}) => {
  const textColor = isDestructive ? '#D9534F' : '#333';

  const renderIcon = () => {
    const props = { width: 22, height: 22 };
    switch (iconName) {
      case 'shield':
        return <ShieldCheckIcon {...props} />;
      case 'activity':
        return <AcessIcon {...props} />;
      case 'grid':
        return <QrCodeIcon {...props} />;
      case 'cloud':
        return <CloudSync {...props} />;
      case 'refresh-cw':
        return <ReplaceIcon {...props} />;
      case 'bell':
        return <BellIcon {...props} />;
      case 'check-circle':
        return <CheckBadgeIcon {...props} />;
      case 'help-circle':
        return <HelpIcon {...props} />;
      case 'log-out':
        return <LogoutIcon {...props} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      disabled={type === 'switch'}
    >
      <View style={styles.rowIcon}>{renderIcon()}</View>
      <Text style={[styles.rowText, { color: textColor }]}>{text}</Text>

      {type === 'navigate' && <ArrowRightFilledIcon width={24} height={24} />}

      {type === 'switch' && (
        <CustomSwitch value={switchValue} onValueChange={onSwitchChange} />
      )}
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [isQrModalVisible, setQrModalVisible] = useState(false);
  const [isTermsModalVisible, setTermsModalVisible] = useState(false);
  const [isNotesModalVisible, setNotesModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isHelpModalVisible, setHelpModalVisible] = useState(false);
  const [isSyncModalVisible, setSyncModalVisible] = useState(false);

  const navigation = useNavigation();

  const confirmLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setLogoutModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível sair da conta. Tente novamente.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Text style={styles.title}>Gerencie suas informações e acessos.</Text>

        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <Image
              style={styles.avatar}
              defaultSource={require('../../assets/AdminPhoto.png')}
            />
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações</Text>
            <View style={styles.sectionGroup}>
              <ProfileRow
                iconName="shield"
                text="Termos de Uso"
                onPress={() => setTermsModalVisible(true)}
              />
              <View style={styles.separator} />
              <ProfileRow
                iconName="cloud"
                text="Sincronizar Dados"
                onPress={() => setSyncModalVisible(true)}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferências</Text>
            <View style={styles.sectionGroup}>
              <ProfileRow
                iconName="bell"
                text="Notificações"
                type="switch"
                switchValue={notificationsEnabled}
                onSwitchChange={setNotificationsEnabled}
              />
              <View style={styles.separator} />
              <ProfileRow
                iconName="grid"
                text="QRCode"
                onPress={() => setQrModalVisible(true)}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Outros</Text>
            <ProfileRow
              iconName="help-circle"
              text="Ajuda"
              onPress={() => setNotesModalVisible(true)}
            />
            <ProfileRow
              iconName="check-circle"
              text="Notas de Atualização"
              onPress={() => setNotesModalVisible(true)}
            />
            <View style={styles.separator} />
            <ProfileRow
              iconName="log-out"
              text="Sair da Conta"
              isDestructive={true}
              onPress={() => setLogoutModalVisible(true)}
            />
          </View>
        </View>
      </ScrollView>
      <LogoutModal
        isVisible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={confirmLogout}
      />
      <SyncModal
        isVisible={isSyncModalVisible}
        onClose={() => setSyncModalVisible(false)}
      />
      <CredentialModal
        isVisible={isQrModalVisible}
        onClose={() => setQrModalVisible(false)}
      />
      <TermsOfUseModal
        isVisible={isTermsModalVisible}
        onClose={() => setTermsModalVisible(false)}
      />
      <NotesUpdates
        isVisible={isNotesModalVisible}
        onClose={() => setNotesModalVisible(false)}
      />
      <HelpModal
        isVisible={isHelpModalVisible}
        onClose={() => setHelpModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  scrollContentContainer: {
    paddingHorizontal: ms(20),
    paddingBottom: ms(120),
    paddingTop: ms(13),
  },
  title: {
    fontSize: ms(20),
    fontFamily: 'Ubuntu-Bold',
    color: '#212121',
    marginBottom: ms(20),
    marginTop: ms(25),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: ms(8),
    padding: ms(25),
    elevation: ms(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: ms(20),
  },
  avatar: {
    width: ms(75),
    height: ms(75),
    borderRadius: ms(45),
    borderWidth: ms(3),
    borderColor: '#00A859',
    marginBottom: ms(12),
  },
  userName: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(17),
    color: '#212121',
  },
  userEmail: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(13),
    color: '#757575',
    marginBottom: ms(12),
  },
  editButton: {
    backgroundColor: '#212121',
    paddingVertical: ms(8),
    paddingHorizontal: ms(15),
    borderRadius: ms(20),
  },
  editButtonText: {
    fontFamily: 'Ubuntu-Regular',
    color: '#FFFFFF',
    fontSize: ms(12),
  },
  section: {
    marginBottom: ms(5),
  },
  sectionTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: ms(13),
    color: '#757575',
    marginBottom: ms(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(8),
  },
  rowIcon: {
    width: ms(20),
    alignItems: 'center',
    marginRight: ms(18),
  },
  rowText: {
    fontFamily: 'Ubuntu-Regular',
    flex: 1,
    fontSize: ms(13),
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerText: {
    marginRight: ms(4),
    fontSize: ms(13),
    fontFamily: 'Ubuntu-Regular',
    color: '#757575',
  },
  separator: {
    height: ms(1),
    backgroundColor: '#F0F0F0',
    marginLeft: -2,
  },
});
