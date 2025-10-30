import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { formatDate } from '../../utils/dateFormat';
// 1. Importe a função dataAtual (ajuste o caminho se necessário)
import { dataAtual } from '../../utils/date';
import {
  ArrowRightIcon,
  OutlineCalendarToday,
  Boxes,
  PersonIcon,
} from '../Icons/Icons';

const STATUS_COLORS = {
  'Aguardando Atendimento': '#FFA500',
  'Atendimento em Progresso': '#007BFF',
  'Atendimento Realizado': '#00A859',
  'Aguardando Sincronização': '#6c757d',
  'Propriedade já atendida': '#DC3545',
  'Agendamento Fora da Data': '#6b0aacff',
  default: '#6c757d',
};

export default function CardAgenda({
  scheduleId,
  title,
  date,
  datatime,
  status,
  grupo,
  produtor,
  protocolStep,
  pending,
  sent,
  checkin,
}) {
  const navigation = useNavigation();

  const handleCardPress = async () => {
    if (status == 1 && pending == null && sent == null) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Aviso',
        textBody: 'Atendimento realizado em outro aplicativo!',
        button: 'Fechar',
      });
    }
    navigation.navigate('AgendaPrevious', { scheduleId });
  };

  const getIdContainerBackgroundColor = protocolStep => {
    switch (protocolStep) {
      case 'D0':
        return '#61B569';
      case 'D8':
        return '#F7D308';
      case 'D10':
        return '#D30707';
      default:
        return '#D1D1D1';
    }
  };

  // 3. Atualize a função getStatusText
  const getStatusText = () => {
    // --- Status de prioridade (em progresso ou concluído) ---
    // Esses são checados primeiro.
    if (status == 1 && pending == null && sent == null) {
      return 'Propriedade já atendida';
    }
    if (pending == 1 && sent == 1) {
      return 'Atendimento Realizado';
    }
    if (pending == 0) {
      return 'Atendimento em Progresso';
    }
    if (pending == 1 && sent == 0) {
      return 'Aguardando Sincronização';
    }

    // --- Se nenhum status acima, checa a data ---
    // (Assume que 'data' é 'YYYY-MM-DD' e 'dataAtual()' retorna o mesmo formato)
    const today = dataAtual();
    if (date != today) {
      return 'Agendamento Fora da Data';
    }

    // Se a data for hoje e nenhum status se aplica, está aguardando.
    return 'Aguardando Atendimento';
  };

  const statusText = getStatusText();
  const tagColor = STATUS_COLORS[statusText] || STATUS_COLORS.default;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleCardPress}>
      <View style={styles.topRow}>
        <View
          style={[
            styles.tagContainer,
            { backgroundColor: getIdContainerBackgroundColor(protocolStep) },
          ]}
        >
          <Text style={styles.tagText}>{protocolStep}</Text>
        </View>
        <Text style={styles.idText} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <PersonIcon width={16} />
          <Text style={styles.infoText}>
            <Text style={styles.primaryText}>Produtor: </Text>
            {produtor}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Boxes width={16} />
          <Text style={styles.infoText}>
            <Text style={styles.primaryText}>Grupo: </Text>
            {grupo}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <OutlineCalendarToday width={16} />
          <Text style={styles.infoText}>{formatDate(date)}</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        <Text style={[styles.statusText, { color: tagColor }]}>
          {statusText}
        </Text>
        <ArrowRightIcon width={20} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tagContainer: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 5,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  idText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  infoSection: {
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 8,
  },
  statusRow: {
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
  },
});
