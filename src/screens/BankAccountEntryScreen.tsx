import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PINModal from '../components/PINModal';

const BankAccountEntryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { amount, bank } = route.params as any;
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [showPINModal, setShowPINModal] = useState(false);

  const handleContinue = () => {
    if (accountNumber.length > 0 && confirmAccountNumber.length > 0 && accountNumber === confirmAccountNumber) {
      setShowPINModal(true);
    } else if (accountNumber !== confirmAccountNumber) {
      Alert.alert('Error', 'Account numbers do not match');
    }
  };

  const handlePINSuccess = () => {
    setShowPINModal(false);
    navigation.navigate('Success' as never);
  };

  const handlePINCancel = () => {
    setShowPINModal(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Bank Account</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Amount Display */}
          <View style={styles.amountDisplay}>
            <Text style={styles.amountLabel}>Amount</Text>
            <Text style={styles.amountValue}>৳{amount}</Text>
          </View>

          {/* Bank Display */}
          <View style={styles.bankDisplay}>
            <Text style={styles.bankLabel}>Bank</Text>
            <Text style={styles.bankValue}>{bank}</Text>
          </View>

          {/* Account Number */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter account number"
              placeholderTextColor="#999"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
              maxLength={20}
            />
          </View>

          {/* Confirm Account Number */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Confirm Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter account number"
              placeholderTextColor="#999"
              value={confirmAccountNumber}
              onChangeText={setConfirmAccountNumber}
              keyboardType="numeric"
              maxLength={20}
            />
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              (accountNumber.length === 0 || confirmAccountNumber.length === 0) && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={accountNumber.length === 0 || confirmAccountNumber.length === 0}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PIN Modal */}
      <PINModal
        visible={showPINModal}
        onClose={handlePINCancel}
        onSuccess={handlePINSuccess}
      />
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
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
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
    width: 34,
  },
  amountDisplay: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11182e',
  },
  bankDisplay: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 25,
  },
  bankLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  bankValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#11182e',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#11182e',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  continueButton: {
    backgroundColor: '#11182e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BankAccountEntryScreen;
