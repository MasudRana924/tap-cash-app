import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OTPScreen from '../screens/OTPScreen';
import MainTabs from './MainTabs';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AmountScreen from '../screens/AmountScreen';
import SuccessScreen from '../screens/SuccessScreen';
import CashOutScreen from '../screens/CashOutScreen';
import CashOutAmountScreen from '../screens/CashOutAmountScreen';
import AddMoneyScreen from '../screens/AddMoneyScreen';
import AddMoneyCardScreen from '../screens/AddMoneyCardScreen';
import AddMoneyAmountScreen from '../screens/AddMoneyAmountScreen';
import SavingsScreen from '../screens/SavingsScreen';
import SavingsAmountScreen from '../screens/SavingsAmountScreen';
import MobileRechargeScreen from '../screens/MobileRechargeScreen';
import MobileRechargeAmountScreen from '../screens/MobileRechargeAmountScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentAmountScreen from '../screens/PaymentAmountScreen';
import PayBillScreen from '../screens/PayBillScreen';
import PayBillAmountScreen from '../screens/PayBillAmountScreen';
import LoanScreen from '../screens/LoanScreen';
import LoanAmountScreen from '../screens/LoanAmountScreen';
import CreateSavingsPlanScreen from '../screens/CreateSavingsPlanScreen';
import TransactionDetailsScreen, { TransactionDetailParams } from '../screens/TransactionDetailsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  OTP: undefined;
  MainHome: undefined;
  SendMoney: undefined;
  Transactions: undefined;
  Notifications: undefined;
  Amount: undefined;
  Success: undefined;
  CashOut: undefined;
  CashOutAmount: undefined;
  AddMoney: undefined;
  AddMoneyCard: undefined;
  AddMoneyAmount: undefined;
  Savings: undefined;
  SavingsAmount: undefined;
  MobileRecharge: undefined;
  MobileRechargeAmount: undefined;
  Payment: undefined;
  PaymentAmount: undefined;
  PayBill: undefined;
  PayBillAmount: undefined;
  Loan: undefined;
  LoanAmount: undefined;
  CreateSavingsPlan: undefined;
  TransactionDetails: TransactionDetailParams;
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
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="MainHome" component={MainTabs} />
        <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Amount" component={AmountScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="CashOut" component={CashOutScreen} />
        <Stack.Screen name="CashOutAmount" component={CashOutAmountScreen} />
        <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
        <Stack.Screen name="AddMoneyCard" component={AddMoneyCardScreen} />
        <Stack.Screen name="AddMoneyAmount" component={AddMoneyAmountScreen} />
        <Stack.Screen name="Savings" component={SavingsScreen} />
        <Stack.Screen name="SavingsAmount" component={SavingsAmountScreen} />
        <Stack.Screen name="MobileRecharge" component={MobileRechargeScreen} />
        <Stack.Screen name="MobileRechargeAmount" component={MobileRechargeAmountScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentAmount" component={PaymentAmountScreen} />
        <Stack.Screen name="PayBill" component={PayBillScreen} />
        <Stack.Screen name="PayBillAmount" component={PayBillAmountScreen} />
        <Stack.Screen name="Loan" component={LoanScreen} />
        <Stack.Screen name="LoanAmount" component={LoanAmountScreen} />
        <Stack.Screen name="CreateSavingsPlan" component={CreateSavingsPlanScreen} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
