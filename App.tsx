import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthContextProvider from './src/contexts/auth';
import MainStack from './src/stacks/MainStack';
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AlertNotificationRoot>
              <MainStack />
            </AlertNotificationRoot>
          </GestureHandlerRootView>
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
