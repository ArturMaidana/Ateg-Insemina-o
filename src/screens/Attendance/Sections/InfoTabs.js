// Information.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardAlert from '../../../components/ui/CardAlert.js';
import CardCheckout from '../../../components/ui/CardCheckout.js';
import { dataAtual } from '../../../utils/date.js';
import {
  Checkbox,
  CheckboxFilled,
  CheckIcon,
  CircleAlert,
} from '../../../components/Icons/Icons.js';

const WarningBox = ({ text }) => (
  <View style={styles.warningBox}>
    <CircleAlert
      name="info-outline"
      size={24}
      color="#FFA500"
      style={styles.warningIcon}
    />
    <Text style={styles.warningText}>{text}</Text>
  </View>
);

export default function InformationTab({
  schedule,
  inseminacaoVisit,
  inseminacaoVisitExist,
  technicianUsers,
  setSelectedOptionUser,
  handleStartService,
  isHaveAttendence,
  setIsHaveAttendence,
  justifications,
  setSelectedOption,
  motivoId,
  messageText,
  setMessageText,
  handleEndService,
  isConnected,
  sendService,
  CustomSelectUser,
  CustomSelect,
}) {
  return (
    <ScrollView>
      <View style={styles.formTabContainer}>
        {schedule &&
          schedule.date == dataAtual() &&
          !inseminacaoVisit.id &&
          inseminacaoVisitExist == false && (
            <>
              <WarningBox text="Antes de iniciar a análise, certifique-se de que não há nenhum atendimento em aberto." />

              {/* Rótulo para o Select */}
              <Text style={styles.selectLabel}>
                Selecione o Técnico de Campo
              </Text>
              <View style={styles.pickerContainer}>
                <CustomSelectUser
                  options={technicianUsers}
                  onSelect={value => setSelectedOptionUser(value)}
                />
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleStartService}
                activeOpacity={0.8}
              >
                <CheckIcon name="play-arrow" size={22} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Iniciar Atendimento</Text>
              </TouchableOpacity>
            </>
          )}

        {inseminacaoVisit.pending == 1 && (
          <CardCheckout
            title="Atendimento Realizado"
            dateStart={inseminacaoVisit.checkin}
            dateEnd={inseminacaoVisit.checkout}
          />
        )}

        {inseminacaoVisitExist && !inseminacaoVisit.id && (
          // CardAlert substituído pela WarningBox do protótipo
          <WarningBox text="Há um atendimento em andamento. Finalize-o antes de abrir outro." />
        )}

        {schedule &&
          schedule.date != dataAtual() &&
          !inseminacaoVisit.id &&
          inseminacaoVisitExist == false && (
            <CardAlert title="Não está na data do agendamento." />
          )}

        {inseminacaoVisit &&
          inseminacaoVisit.id &&
          !inseminacaoVisit.checkout && (
            <>
              <View style={styles.checkboxRow}>
                <Pressable
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => setIsHaveAttendence(!isHaveAttendence)}
                >
                  {isHaveAttendence ? (
                    <Checkbox color="#008346" />
                  ) : (
                    <CheckboxFilled color="#888888" />
                  )}

                  <Text style={styles.checkboxLabel}>
                    Marque esta opção se o atendimento não foi realizado
                    conforme o previsto.
                  </Text>
                </Pressable>
              </View>

              {isHaveAttendence && (
                <>
                  <Text style={[styles.selectLabel, { width: '90%' }]}>
                    Selecione o Motivo
                  </Text>
                  <View style={styles.pickerContainer}>
                    <CustomSelect
                      options={justifications}
                      onSelect={value => setSelectedOption(value)}
                    />
                  </View>
                  {motivoId == 4 && (
                    <>
                      <Text style={styles.inputLabel}>Observação</Text>
                      <TextInput
                        style={styles.textArea}
                        value={messageText}
                        onChangeText={setMessageText}
                        multiline={true}
                        numberOfLines={4}
                        editable={isHaveAttendence}
                        placeholder="Descreva o motivo..."
                      />
                    </>
                  )}
                </>
              )}

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: '#D32F2F' }, // Botão vermelho para finalizar
                ]}
                onPress={handleEndService}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>
                  Finalizar Atendimento
                </Text>
              </TouchableOpacity>
            </>
          )}

        {inseminacaoVisit &&
          isConnected &&
          inseminacaoVisit.pending == 1 &&
          inseminacaoVisit.sent == 0 && (
            <TouchableOpacity
              style={[
                styles.actionButton,
                { marginTop: 15, backgroundColor: '#007BFF' }, // Botão azul para enviar
              ]}
              onPress={sendService}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Enviar Atendimento</Text>
            </TouchableOpacity>
          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // NOVOS ESTILOS PARA O DESIGN
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderWidth: 1,
    borderColor: '#FFE5B3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    width: '90%',
  },
  warningIcon: {
    marginRight: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#665A3E',
    lineHeight: 20,
    paddingLeft: 10,
  },
  selectLabel: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
    marginBottom: 8,
    width: '90%',
    textAlign: 'left',
  },
  // FIM DOS NOVOS ESTILOS

  formTabContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16, // Adicionado padding horizontal
    backgroundColor: '#ffffffff',
    width: '100%',
  },
  formImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  formTitle: {
    // Este estilo não é mais usado, substituído por WarningBox
    fontFamily: 'Ubuntu-Light',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    maxWidth: '90%',
    lineHeight: 20,
  },
  pickerContainer: {
    width: '90%',
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    // Estilos de borda e select movidos para o CustomSelect (styles.selectButton)
  },
  actionButton: {
    backgroundColor: '#008346',
    paddingVertical: 14, // Padding aumentado
    borderRadius: 12, // Bordas aumentadas
    width: '70%', // Largura aumentada
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    marginVertical: 5,
    flexDirection: 'row', // Para o ícone
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '90%', // Largura aumentada
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Ubuntu-Light',
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    width: '90%', // Largura aumentada
    textAlign: 'left',
    fontFamily: 'Ubuntu-Regular',
  },
  textArea: {
    width: '90%', // Largura aumentada
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    fontFamily: 'Ubuntu-Light',
  },
});
