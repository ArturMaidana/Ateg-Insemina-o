import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/Login/SignInScreen';
import Splash from '../screens/Preload/SplashScreen';
import MainTabs from '../stacks/MainTabs';
import Atendimento from '../screens/Attendance/Index';
import AgendaPrevious from '../screens/Attendance/AttendanceData';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import SyncHistory from '../screens/SyncHistoryScreen/SyncHistoryScreen';
import Synchronize from '../screens/Synchronize/index';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        lazy: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="Atendimentos" component={Atendimento} />
      <Stack.Screen name="SyncHistory" component={SyncHistory} />
      <Stack.Screen name="AgendaPrevious" component={AgendaPrevious} />
      <Stack.Screen name="Synchronize" component={Synchronize} />

      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}
