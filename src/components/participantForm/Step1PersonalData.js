import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { s, vs, ms } from 'react-native-size-matters';

import { SearchIcon } from '../Icons/Icons';

export default function Step1PersonalData(props) {
  const {
    cpf,
    setCpf,
    nome,
    setNome,
    sexo,
    setSexo,
    dataNascimento,
    setDataNascimento,
    email,
    setEmail,
    telefone,
    setTelefone,
    loadingCpf,
    estados,
    cidades,
    selectedEstado,
    setSelectedEstado,
    selectedCidade,
    setSelectedCidade,
    loadingCidades,
    onNext,
  } = props;

  return (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>CPF</Text>
        <View style={styles.cpfContainer}>
          <TextInput
            style={styles.inputCpf}
            placeholder="Informe o CPF"
            placeholderTextColor="#999"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            maxLength={14}
          />
          <TouchableOpacity style={styles.consultarButton}>
            {loadingCpf ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.buttonContent}>
                <SearchIcon width={16} height={16} color="#fff" />
                <Text style={styles.buttonText}>Consultar</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Informe o nome completo"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.flexHalf}>
          <Text style={styles.label}>Sexo</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.pickerText}
              selectedValue={sexo}
              onValueChange={itemValue => setSexo(itemValue)}
            >
              <Picker.Item
                label="Selecione"
                value=""
                style={styles.placeholderPicker}
              />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
            </Picker>
          </View>
        </View>
        <View style={styles.flexHalf}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            value={dataNascimento}
            onChangeText={setDataNascimento}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Estado</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerText}
            selectedValue={selectedEstado}
            onValueChange={itemValue => setSelectedEstado(itemValue)}
          >
            <Picker.Item
              label="Selecione o Estado"
              value=""
              style={styles.placeholderPicker}
            />
            {estados.map(e => (
              <Picker.Item key={e.id} label={e.nome} value={e.sigla} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cidade</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerText}
            selectedValue={selectedCidade}
            onValueChange={itemValue => setSelectedCidade(itemValue)}
            enabled={!loadingCidades && cidades.length > 0}
          >
            <Picker.Item
              label={loadingCidades ? 'Carregando...' : 'Selecione a Cidade'}
              value=""
              style={styles.placeholderPicker}
            />
            {cidades.map(c => (
              <Picker.Item key={c.id} label={c.nome} value={c.nome} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
        <Text style={styles.buttonTextPrimary}>Próximo</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: ms(15),
  },
  label: {
    fontSize: ms(13),
    color: '#333',
    marginBottom: ms(8),
    fontFamily: 'Ubuntu-Bold',
  },
  placeholderPicker: {
    fontSize: ms(13),
    color: '#999',
    fontFamily: 'Ubuntu-Regular',
  },
  input: {
    borderWidth: ms(1),
    borderColor: '#ccc',
    borderRadius: ms(8),
    paddingHorizontal: ms(15),
    fontSize: ms(13),
    height: ms(45),
    backgroundColor: '#fff',
    fontFamily: 'Ubuntu-Regular',
  },
  cpfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputCpf: {
    flex: 1,
    borderWidth: ms(1),
    borderColor: '#ccc',
    borderRadius: ms(8),
    paddingHorizontal: ms(15),
    fontSize: ms(13),
    height: ms(45),
    backgroundColor: '#fff',
    fontFamily: 'Ubuntu-Regular',
  },
  consultarButton: {
    backgroundColor: '#00A859',
    height: ms(45),
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ms(20),
    marginLeft: ms(10),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(14),
    marginLeft: ms(8),
  },
  buttonTextPrimary: {
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(15),
  },
  row: {
    flexDirection: 'row',
    gap: ms(10),
    marginBottom: ms(15),
  },
  flexHalf: {
    flex: ms(1),
  },
  pickerContainer: {
    borderWidth: ms(1),
    borderColor: '#ccc',
    borderRadius: ms(8),
    height: ms(45),
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  pickerText: {
    color: '#333',
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(13),
  },
  primaryButton: {
    backgroundColor: '#00A859',
    borderRadius: ms(8),
    height: ms(45),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ms(10),
  },
});
