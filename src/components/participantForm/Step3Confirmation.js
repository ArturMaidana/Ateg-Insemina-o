import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ReadOnlyField from '../ui/ReadOnlyField';
import { s, vs, ms } from 'react-native-size-matters';

export default function Step3Confirmation(props) {
  const {
    responsavel,
    nome,
    cpf,
    sexo,
    dataNascimento,
    idade,
    observacoes,
    setObservacoes,
    intercorrencia,
    setIntercorrencia,
    necessitaEspecialista,
    setNecessitaEspecialista,
    onFinalize,
    onPrevious,
  } = props;

  return (
    <>
      <ReadOnlyField label="Responsável pelo atendimento" value={responsavel} />
      <ReadOnlyField label="Participante" value={nome} />
      <ReadOnlyField label="CPF" value={cpf} />
      <View style={styles.row}>
        <View style={styles.flexHalf}>
          <ReadOnlyField label="Sexo" value={sexo} />
        </View>
        <View style={styles.flexHalf}>
          <ReadOnlyField
            label="Data de Nascimento"
            value={`${dataNascimento} - ${idade}`}
          />
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Descreva suas observações..."
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Intercorrência (Se houver)</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Descreva a intercorrência..."
          value={intercorrencia}
          onChangeText={setIntercorrencia}
          multiline
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Necessita de atuação de especialista?</Text>
        <Text style={styles.helperText}>
          Marque esta opção se foi identificado a necessidade de encaminhamento
          para especialista.
        </Text>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setNecessitaEspecialista(!necessitaEspecialista)}
        >
          <View
            style={[
              styles.checkbox,
              necessitaEspecialista && styles.checkboxChecked,
            ]}
          >
            {necessitaEspecialista && (
              <Text style={styles.checkboxCheck}>✓</Text>
            )}
          </View>
          <Text style={styles.checkboxLabel}>Sim, é necessário.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.previousButton} onPress={onPrevious}>
          <Text style={styles.previousButtonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={onFinalize}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: ms(20),
  },
  label: {
    fontSize: ms(14),
    fontFamily: 'Ubuntu-Bold',
    color: '#333',
    marginBottom: ms(8),
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(16),
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  flexHalf: {
    flex: ms(1),
    marginHorizontal: ms(4),
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
  previousButtonText: {
    color: '#333',
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: ms(10),
    marginTop: ms(20),
    marginBottom: ms(20),
  },
  sectionTitle: {
    fontSize: ms(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: ms(15),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: ms(24),
    height: ms(24),
    borderWidth: ms(2),
    borderColor: '#ccc',
    borderRadius: ms(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(10),
  },
  checkboxChecked: {
    backgroundColor: '#00A859',
    borderColor: '#00A859',
  },
  checkboxCheck: {
    color: 'white',
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(14),
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  helperText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
});
