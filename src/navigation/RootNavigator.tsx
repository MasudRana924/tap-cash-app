import React, { useRef, useEffect } from 'react';
import { Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OTPScreen from '../screens/OTPScreen';
import MainTabs from './MainTabs';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AmountScreen from '../screens/AmountScreen';
import SuccessScreen from '../screens/SuccessScreen';
import CashOutScreen from '../screens/CashOutScreen';
import CashOutAmountScreen from '../screens/CashOutAmountScreen';
import AddMoneyScreen from '../screens/AddMoneyScreen';
import AddMoneyCardScreen from '../screens/AddMoneyCardScreen';
import AddMoneyAmountScreen from '../screens/AddMoneyAmountScreen';
import BankSelectionScreen from '../screens/BankSelectionScreen';
import CardSelectionScreen from '../screens/CardSelectionScreen';
import CardInfoScreen from '../screens/CardInfoScreen';
import BankAccountEntryScreen from '../screens/BankAccountEntryScreen';
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
import ScanQRScreen from '../screens/ScanQRScreen';
import PaymentWebViewScreen from '../screens/PaymentWebViewScreen';
import GroupSavingsCreateScreen from '../screens/GroupSavingsCreateScreen';
import { useAuth } from '../context/AuthContext';
import { NavigationContainerRef } from '@react-navigation/native';
import { getMessaging, onNotificationOpenedApp, getInitialNotification } from '@react-native-firebase/messaging';

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
  Notification: undefined;
  Amount: { receiver: { id: number; phone: string; name: string | null; profile_image: string | null; user_type: string }; phone: string };
  Success: { amount: string; receiverPhone: string; receiverName: string | null; transactionType?: 'ADD_MONEY' | 'send_money' | 'GROUP_SAVINGS' };
  CashOut: undefined;
  CashOutAmount: undefined;
  AddMoney: undefined;
  AddMoneyCard: undefined;
  AddMoneyAmount: { method: string; bank?: string; cardType?: string };
  PaymentWebView: { paymentUrl: string; title?: string };
  BankSelection: undefined;
  CardSelection: undefined;
  CardInfo: { amount: string; cardType: string };
  BankAccountEntry: { amount: string; bank: string };
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
  GroupSavingsCreate: undefined;
  TransactionDetails: TransactionDetailParams;
  ScanQR: undefined;
  GroupSavingsDetails: { groupSavingsId: string };
};

// Global navigation ref
export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [isMessagingReady, setIsMessagingReady] = React.useState(false);

  useEffect(() => {
    // Delay notification setup to ensure messaging is ready
    const timer = setTimeout(() => {
      setIsMessagingReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url;
      console.log('Incoming deep link URL:', url);
      if (url && (url.includes('payment-success') || url.includes('tapcash://'))) {
        navigationRef.current?.navigate('Success', {
          amount: 'Payment Successful',
          receiverPhone: '',
          receiverName: 'Add Money',
          transactionType: 'ADD_MONEY',
        } as any);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          handleDeepLink({ url });
        }
      })
      .catch((err) => console.log('Error getting initial URL:', err));

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!isMessagingReady) return;

    // Handle notification taps when app is opened from background
    let unsubscribeOpened: any = null;

    try {
      console.debug('Setting up notification listeners...');

      const messagingInstance = getMessaging();

      if (messagingInstance) {
        unsubscribeOpened = onNotificationOpenedApp(messagingInstance, (data: any) => {
          console.debug('Notification opened from background:', data);
          handleNotificationNavigation(data);
        });

        // Handle notification taps when app is opened from quit state
        getInitialNotification(messagingInstance)
          .then((data: any) => {
            if (data) {
              console.debug('Notification opened from quit state:', data);
              handleNotificationNavigation(data);
            }
          })
          .catch((error: any) => {
            console.debug('Error getting initial notification:', error);
          });
      } else {
        console.debug('Messaging not available');
      }
    } catch (error) {
      console.debug('Error setting up notification listeners:', error);
    }

    return () => {
      if (unsubscribeOpened && typeof unsubscribeOpened === 'function') {
        unsubscribeOpened();
      }
    };
  }, [isMessagingReady]);

  const handleNotificationNavigation = (data: any) => {
    const notificationType = data?.data?.type;
    
    if (notificationType === 'group_savings_invitation') {
      const groupSavingsId = data?.data?.group_savings_id;
      if (groupSavingsId) {
        navigationRef.current?.navigate('GroupSavingsDetails', { groupSavingsId } as never);
      } else {
        navigationRef.current?.navigate('Savings' as never);
      }
    } else {
      navigationRef.current?.navigate('Notification' as never);
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
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
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Amount" component={AmountScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="CashOut" component={CashOutScreen} />
        <Stack.Screen name="CashOutAmount" component={CashOutAmountScreen} />
        <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
        <Stack.Screen name="AddMoneyCard" component={AddMoneyCardScreen} />
        <Stack.Screen name="AddMoneyAmount" component={AddMoneyAmountScreen} />
        <Stack.Screen name="BankSelection" component={BankSelectionScreen} />
        <Stack.Screen name="CardSelection" component={CardSelectionScreen} />
        <Stack.Screen name="CardInfo" component={CardInfoScreen} />
        <Stack.Screen name="BankAccountEntry" component={BankAccountEntryScreen} />
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
        <Stack.Screen name="GroupSavingsCreate" component={GroupSavingsCreateScreen} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
        <Stack.Screen name="ScanQR" component={ScanQRScreen} />
        <Stack.Screen name="PaymentWebView" component={PaymentWebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
