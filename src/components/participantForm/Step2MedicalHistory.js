import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ReadOnlyField from '../ui/ReadOnlyField';
import CustomCheckbox from '../ui/CustomCheckbox';
import ServiceItem from '../ui/ServiceItem';

import { s, vs, ms } from 'react-native-size-matters';

export default function Step2MedicalHistory(props) {
  const {
    nome,
    prioridade,
    setPrioridade,
    atendimentos,
    setAtendimentos,
    possuiAlergias,
    setPossuiAlergias,
    descAlergias,
    setDescAlergias,
    usaMedicamentos,
    setUsaMedicamentos,
    descMedicamentos,
    setDescMedicamentos,
    temCondicoes,
    setTemCondicoes,
    descCondicoes,
    setDescCondicoes,
    onNext,
    onPrevious,
  } = props;

  const servicosDisponiveis = [
    { id: 'oftalmo', nome: 'Oftalmologia', disp: 15 },
    { id: 'odonto', nome: 'Odontologia', disp: 15 },
    { id: 'enfermagem', nome: 'Enfermagem', disp: 15 },
    { id: 'cabelo', nome: 'Corte de Cabelo', disp: 15 },
    { id: 'maquiagem', nome: 'Maquiagem', disp: 15 },
  ];

  return (
    <>
      <ReadOnlyField label="Nome do Participante" value={nome} />
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Prioridade</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={prioridade}
            onValueChange={itemValue => setPrioridade(itemValue)}
          >
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Urgente" value="Urgente" />
            <Picker.Item label="Preferencial" value="Preferencial" />
          </Picker>
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.sectionTitle}>Selecione os atendimentos</Text>
        {servicosDisponiveis.map(s => (
          <ServiceItem
            key={s.id}
            service={s}
            isSelected={!!atendimentos[s.id]}
            onSelect={() => setAtendimentos(p => ({ ...p, [s.id]: !p[s.id] }))}
          />
        ))}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.sectionTitle}>Histórico Médico</Text>
        <CustomCheckbox
          label="Possui alergias?"
          value={possuiAlergias}
          onValueChange={setPossuiAlergias}
          descriptionValue={descAlergias}
          onDescriptionChange={setDescAlergias}
          placeholder="Descreva as alergias..."
        />
        <CustomCheckbox
          label="Medicamentos em uso?"
          value={usaMedicamentos}
          onValueChange={setUsaMedicamentos}
          descriptionValue={descMedicamentos}
          onDescriptionChange={setDescMedicamentos}
          placeholder="Descreva os medicamentos..."
        />
        <CustomCheckbox
          label="Condições Médicas?"
          value={temCondicoes}
          onValueChange={setTemCondicoes}
          descriptionValue={descCondicoes}
          onDescriptionChange={setDescCondicoes}
          placeholder="Descreva as condições médicas..."
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.previousButton} onPress={onPrevious}>
          <Text style={styles.previousButtonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: ms(12),
  },
  label: {
    fontSize: ms(14),
    color: '#333',
    marginBottom: ms(8),
    fontFamily: 'Ubuntu-Bold',
  },
  pickerContainer: {
    borderWidth: ms(1),
    borderColor: '#ccc',
    borderRadius: ms(8),
    height: ms(45),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: ms(14),
    fontFamily: 'Ubuntu-Bold',
    color: '#333',
    marginBottom: ms(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: ms(10),
    marginTop: ms(5),
    marginBottom: ms(25),
  },
  primaryButton: {
    flex: ms(1),
    backgroundColor: '#00A859',
    borderRadius: ms(8),
    height: ms(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  previousButton: {
    flex: ms(1),
    backgroundColor: '#fff',
    borderWidth: ms(1),
    borderColor: '#ccc',
    borderRadius: ms(8),
    height: ms(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(16),
  },
  previousButtonText: {
    color: '#333',
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(16),
  },
});
