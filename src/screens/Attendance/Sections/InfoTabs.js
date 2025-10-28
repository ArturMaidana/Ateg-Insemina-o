// Information.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import CardAlert from '../../../components/ui/CardAlert.js';
import CardCheckout from '../../../components/ui/CardCheckout.js';
import { dataAtual } from '../../../utils/date.js';
import { CheckboxFilled } from '../../../components/Icons/Icons.js';

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
    <View style={styles.formTabContainer}>
      {schedule &&
        schedule.date == dataAtual() &&
        !inseminacaoVisit.id &&
        inseminacaoVisitExist == false && (
          <>
            <Image
              source={require('../../../assets/AvisoAtendimento.png')}
              style={styles.formImage}
            />
            <Text style={styles.formTitle}>
              Antes de iniciar a análise, certifique-se de que não há nenhum
              atendimento em aberto.
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
        <CardAlert title="Existe um atendimento em aberto." />
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
            <Image
              source={require('../../../assets/CancelarAtendimento.png')}
              style={styles.formImage}
            />

            <View style={styles.checkboxRow}>
              <Pressable
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => setIsHaveAttendence(!isHaveAttendence)}
              >
                <CheckboxFilled
                  status={isHaveAttendence ? 'checked' : 'unchecked'}
                  color="#008346"
                />
                <Text style={styles.checkboxLabel}>
                  Marque esta opção se o atendimento não foi realizado conforme
                  o previsto.
                </Text>
              </Pressable>
            </View>

            {isHaveAttendence && (
              <>
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
              style={styles.actionButton}
              onPress={handleEndService}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Finalizar Atendimento</Text>
            </TouchableOpacity>
          </>
        )}

      {inseminacaoVisit &&
        isConnected &&
        inseminacaoVisit.pending == 1 &&
        inseminacaoVisit.sent == 0 && (
          <TouchableOpacity
            style={[styles.actionButton, { marginTop: 15 }]}
            onPress={sendService}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>Enviar Atendimento</Text>
          </TouchableOpacity>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  timelineContainer: {
    padding: 16,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineGutter: {
    width: 20,
    alignItems: 'center',
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    top: 8,
    bottom: -4,
    width: 4,
    backgroundColor: '#008346',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 14,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#008346',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  checkIconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  formTabContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#ffffffff',
  },
  formImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  formTitle: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    maxWidth: '90%',
    lineHeight: 20,
  },
  pickerContainer: {
    width: '85%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  actionButton: {
    backgroundColor: '#008346',
    paddingVertical: 14,
    borderRadius: 8,
    width: '80%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    marginVertical: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 15,
    textAlign: 'center',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
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
    width: '80%',
    textAlign: 'left',
    fontFamily: 'Ubuntu-Regular',
  },
  textArea: {
    width: '80%',
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
