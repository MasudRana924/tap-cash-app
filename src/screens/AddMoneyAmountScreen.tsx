import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PINModal from '../components/PINModal';
import { RootStackParamList } from '../navigation/RootNavigator';
import ScreenHeader from '../components/ScreenHeader';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const AddMoneyAmountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'AddMoneyAmount'>>();
  const { method, bank, cardType } = route.params as any;
  const { token } = useAuth();
  const [amount, setAmount] = useState('');
  const [showPINModal, setShowPINModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const amountInputRef = useRef<TextInput>(null);
  const availableBalance = '৳ 25,450.00';

  useEffect(() => {
    setTimeout(() => {
      amountInputRef.current?.focus();
    }, 100);
  }, []);

  const handleConfirm = async () => {
    console.log('handleConfirm called - amount:', amount, 'token:', token ? 'exists' : 'null');
    
    if (amount.length > 0 && token) {
      try {
        setIsLoading(true);
        console.log('Calling API with amount:', amount);
        const response = await apiService.addMoney(token, amount);
        
        console.log('Add money response:', response);
        console.log('Response success:', response.success);
        console.log('Response paymentUrl:', response.paymentUrl);
        
        if (response.success && response.paymentUrl) {
          console.log('Navigating to PaymentWebView with URL:', response.paymentUrl);
          (navigation as any).navigate('PaymentWebView', { 
            paymentUrl: response.paymentUrl,
            title: 'Add Money'
          });
        } else {
          console.log('Invalid response - success:', response.success, 'paymentUrl:', response.paymentUrl);
          Alert.alert('Error', 'Failed to process payment. Please try again.');
        }
      } catch (error: any) {
        console.error('Add money error:', error);
        Alert.alert('Error', error.errorMessage || 'Failed to add money. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Cannot proceed - amount:', amount.length, 'token:', token ? 'exists' : 'null');
      if (!token) {
        Alert.alert('Error', 'Please login first');
      }
    }
  };

  const handlePINSuccess = () => {
    setShowPINModal(false);
    navigation.navigate('Success' as never);
  };

  const handlePINCancel = () => {
    setShowPINModal(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ScreenHeader title="Enter Amount" onBackPress={handleBack} />

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount (BDT)</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>৳</Text>
            <TextInput
              ref={amountInputRef}
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor="#999"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              selectionColor="#11182e"
            />
          </View>
          <Text style={styles.balanceAmount}>Balance: {availableBalance}</Text>
        </View>

        {/* Quick Amounts */}
        <View style={styles.quickAmountContainer}>
          {['500', '1,000', '2,000', '5,000'].map((amt) => (
            <TouchableOpacity 
              key={amt} 
              style={styles.quickAmountButton}
              onPress={() => setAmount(amt.replace(',', ''))}
            >
              <Text style={styles.quickAmountText}>৳{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.flexSpacer} />

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.confirmButton, (amount.length === 0 || isLoading) && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={amount.length === 0 || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.confirmButtonText, amount.length === 0 && styles.confirmButtonTextDisabled]}>Continue</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* PIN Modal */}
      <PINModal
        visible={showPINModal}
        onClose={handlePINCancel}
        onSuccess={handlePINSuccess}
      />
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11182e',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  currencySymbol: {
    fontSize: 48,
    fontWeight: '500',
    color: '#8e96a3',
    marginRight: 10,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#11182e',
    minWidth: 40,
    paddingVertical: 0,
  },
  balanceAmount: {
    fontSize: 13,
    color: '#999',
  },
  quickAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  quickAmountButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  flexSpacer: {
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#11182e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonDisabled: {
    backgroundColor: '#d6d9df',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonTextDisabled: {
    color: '#9ea7b4',
  },
});

export default AddMoneyAmountScreen;
