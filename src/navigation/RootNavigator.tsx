import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OTPScreen from '../screens/OTPScreen';
import MainTabs from './MainTabs';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AmountScreen from '../screens/AmountScreen';
import SuccessScreen from '../screens/SuccessScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  OTP: undefined;
  MainHome: undefined;
  SendMoney: undefined;
  Transactions: undefined;
  Notifications: undefined;
  Amount: undefined;
  Success: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="MainHome" component={MainTabs} />
        <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Amount" component={AmountScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
