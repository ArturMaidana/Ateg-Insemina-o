import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import {
  EyeIconModal,
  EyeIcon,
  ToothIcon,
  GlassesIcon,
  MakeupBrushIcon,
  ScissorsIcon,
  MedicalBagIcon,
  PersonIcon,
  CheckIcon,
  CancelIcon,
  ArrowDownIcon,
  ArrowUpSLine,
  SharpMoreVert,
} from '../Icons/Icons';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const statusConfig = {
  Realizada: { color: '#00A859', label: 'Realizada' },
  'Em Atendimento': { color: '#007BFF', label: 'Em Atendimento' },
  Desistência: { color: '#DC3545', label: 'Desistência' },
  Aguardando: { color: '#f78020ff', label: 'Aguardando' },
  Preferencial: { color: '#20a8f7ff', label: 'Preferencial' },
};

const categoryIcons = {
  Oftalmologia: <EyeIcon />,
  Odontologia: <ToothIcon />,
  Enfermagem: <MedicalBagIcon />,
  Barbearia: <ScissorsIcon />,
  Maquiagem: <MakeupBrushIcon />,
  'Confecção Óculos': <GlassesIcon />,
};

const AttendanceDetailModal = ({
  visible,
  attendance,
  onClose,
  onActionPress,
}) => {
  if (!attendance) return null;

  const currentStatus = statusConfig[attendance.status] || {
    color: '#6c757d',
    label: 'Indefinido',
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Atendimento #{attendance.id}
              </Text>

              <View style={styles.participantInfoContainer}>
                <View style={styles.participantIcon}>
                  <PersonIcon />
                </View>

                <View style={styles.participantTextContainer}>
                  <Text style={styles.participantName} numberOfLines={2}>
                    {attendance.name}
                  </Text>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.participantDetails} numberOfLines={1}>
                      {attendance.cpf}
                    </Text>
                    <Text style={styles.participantDetails} numberOfLines={1}>
                      {attendance.contact}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: currentStatus.color },
                ]}
              >
                <Text style={styles.statusBadgeText}>
                  {currentStatus.label}
                </Text>
              </View>

              <Text style={styles.actionsTitle}>Ações Disponíveis</Text>

              <TouchableOpacity
                style={[styles.actionButton, styles.attendButton]}
                onPress={() => onActionPress('atender', attendance)}
              >
                <CheckIcon />
                <Text
                  style={[styles.actionButtonText, styles.attendButtonText]}
                >
                  Atender Cliente
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.detailsButton]}
                onPress={() => onActionPress('detalhes', attendance)}
              >
                <EyeIconModal />
                <Text
                  style={[styles.actionButtonText, styles.detailsButtonText]}
                >
                  Visualizar Detalhes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => onActionPress('cancelar', attendance)}
              >
                <CancelIcon />
                <Text
                  style={[styles.actionButtonText, styles.cancelButtonText]}
                >
                  Cancelar Atendimento
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const AttendanceItemCard = ({ item, onPress }) => {
  const currentStatus = statusConfig[item.status] || {
    color: '#6c757d',
    label: 'Indefinido',
  };

  return (
    <TouchableOpacity
      style={[styles.itemCard, { borderLeftColor: currentStatus.color }]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemName} numberOfLines={1}>
          #{item.id} - {item.name}
        </Text>
        <TouchableOpacity>
          <SharpMoreVert />
        </TouchableOpacity>
      </View>
      <View style={styles.itemBody}>
        <View style={styles.itemColumn}>
          <Text style={styles.itemLabel}>
            CPF: <Text style={styles.itemValue}>{item.cpf}</Text>
          </Text>
          <Text style={styles.itemLabel}>
            Contato: <Text style={styles.itemValue}>{item.contact}</Text>
          </Text>
        </View>
        <View style={styles.itemColumn}>
          <Text style={styles.itemLabel}>
            Sexo: <Text style={styles.itemValue}>{item.gender}</Text>
          </Text>
          <Text style={styles.itemLabel}>
            Situação:{' '}
            <Text
              style={[
                styles.itemValue,
                { color: currentStatus.color, fontFamily: 'Ubuntu-Bold' },
              ]}
            >
              {currentStatus.label}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function AttendanceCategoryCard({
  categoryName,
  attendances = [],
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const handleItemPress = attendance => {
    setSelectedAttendance(attendance);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAttendance(null);
  };

  const handleActionPress = (action, attendance) => {
    console.log(`Ação: ${action}`, attendance);
    handleCloseModal();
  };

  const icon = categoryIcons[categoryName] || (
    <View style={styles.iconPlaceholder} />
  );

  return (
    <View style={styles.categoryWrapper}>
      <TouchableOpacity
        style={[
          styles.categoryHeader,
          isExpanded && styles.categoryHeaderExpanded,
        ]}
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>{icon}</View>
          <Text style={styles.categoryTitle}>
            {categoryName.toUpperCase()} -{' '}
          </Text>
          <Text style={styles.categoryCount}>
            {attendances.length} Atendimentos
          </Text>
        </View>
        <ArrowDownIcon isExpanded={isExpanded} />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.itemList}>
          {attendances.map(item => (
            <AttendanceItemCard
              key={item.id}
              item={item}
              onPress={handleItemPress}
            />
          ))}
        </View>
      )}

      <AttendanceDetailModal
        visible={modalVisible}
        attendance={selectedAttendance}
        onClose={handleCloseModal}
        onActionPress={handleActionPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  categoryWrapper: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 9,
  },
  categoryHeaderExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 5,
    backgroundColor: '#E1FFEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    color: '#333',
  },
  categoryCount: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 13,
    color: '#00A859',
  },
  itemList: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  itemCard: {
    height: 81,
    backgroundColor: '#F8F9FA',
    borderRadius: 4,
    elevation: 3,
    paddingLeft: 8,
    paddingTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ffffffff',
    borderLeftWidth: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemName: {
    fontFamily: 'Ubuntu-Medium',
    color: '#343A40',
    flex: 1,
  },
  itemBody: {
    flexDirection: 'row',
  },
  itemColumn: {
    flex: 1,
  },
  itemLabel: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 12,
    color: '#424242ff',
    marginBottom: 4,
  },
  itemValue: {
    fontFamily: 'Ubuntu',
    fontWeight: '400',
    color: '#3f3f3fff',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 20,
    color: '#333',
    marginBottom: 16,
  },
  participantInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fafcffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  participantIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1FFEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
    flexShrink: 0,
  },
  participantTextContainer: {
    flex: 1,
    minWidth: 0,
  },
  participantName: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 16,
    color: '#475569',
    marginBottom: 8,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  participantDetails: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#6C757D',
    flexShrink: 1,
    minWidth: 0,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 8,
  },
  statusBadgeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Ubuntu-Regular',
  },
  actionsTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    color: '#495057',
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  actionButtonText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    marginLeft: 10,
  },
  attendButton: {
    backgroundColor: '#00A859',
    borderColor: '#00A859',
  },
  attendButtonText: {
    color: '#FFFFFF',
  },
  detailsButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CED4DA',
  },
  detailsButtonText: {
    color: '#4A5568',
  },
  cancelButton: {
    backgroundColor: '#ffffffff',
    borderColor: '#DC3545',
    marginBottom: 0,
  },
  cancelButtonText: {
    color: '#DC3545',
  },
});
