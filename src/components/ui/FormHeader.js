// src/components/FormHeader.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ms } from 'react-native-size-matters';
import { BackPage } from '../Icons/Icons';

export default function FormHeader({ step, setStep, navigation }) {
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={handleBackPress} style={styles.button}>
        <BackPage width={ms(24)} height={ms(24)} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Dados do Atendimento</Text>

      <View style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(10),
    backgroundColor: '#ffffffff',
    width: '100%',
  },
  button: {
    width: ms(20),
    height: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: ms(16),
    fontFamily: 'Ubuntu-Regular',
    color: '#333',
    marginRight: ms(95),
  },
});
