// src/screens/ForgotPasswordScreen.js

import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ms, vs } from 'react-native-size-matters';
import { BackPage } from '../../components/Icons/Icons';

import useForgotPassword from '../../utils/useForgotPassword';
import EmailStep from './steps/EmailStep';
import PinStep from './steps/PinStep';
import NewPasswordStep from './steps/NewPasswordStep';

export default function ForgotPasswordScreen({ navigation }) {
  const hook = useForgotPassword(navigation);

  const renderCurrentStep = () => {
    switch (hook.step) {
      case 1:
        return <EmailStep {...hook} />;
      case 2:
        return <PinStep {...hook} />;
      case 3:
        return <NewPasswordStep {...hook} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={hook.handleGoBack}>
          <BackPage />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={ms(20)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contentWrapper}>{renderCurrentStep()}</View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: ms(15),
    paddingTop: vs(30),
    paddingBottom: vs(5),
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    padding: ms(20),
  },
});
