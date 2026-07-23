import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Operator {
  id: string;
  name: string;
  logo: string;
  color: string;
}

const MobileRechargeScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');

  const operators: Operator[] = [
    { id: '1', name: 'Grameenphone', logo: '📱', color: '#E31837' },
    { id: '2', name: 'Banglalink', logo: '📡', color: '#FF6600' },
    { id: '3', name: 'Robi', logo: '📶', color: '#E30613' },
    { id: '4', name: 'Teletalk', logo: '📞', color: '#006633' },
    { id: '5', name: 'Airtel', logo: '📲', color: '#FF0000' },
  ];

  const handleOperatorSelect = (operator: Operator) => {
    if (phoneNumber.length > 0) {
      navigation.navigate('MobileRechargeAmount' as never);
    }
  };

  const handleContinue = () => {
    if (phoneNumber.length > 0) {
      navigation.navigate('MobileRechargeAmount' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mobile Recharge</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Phone Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Enter Mobile Number</Text>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.flag}>🇧🇩</Text>
              <Text style={styles.countryCode}>+880</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="1XXX-XXXXXX"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        {/* Quick Amounts */}
        <View style={styles.quickAmountSection}>
          <Text style={styles.sectionTitle}>Quick Amount</Text>
          <View style={styles.quickAmountGrid}>
            {['50', '100', '200', '500', '1000', '2000'].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[styles.quickAmountItem, selectedAmount === amount && styles.quickAmountSelected]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text style={[styles.quickAmountText, selectedAmount === amount && styles.quickAmountTextSelected]}>৳{amount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Operators */}
        <View style={styles.operatorsSection}>
          <Text style={styles.sectionTitle}>Select Operator</Text>
          {operators.map((operator) => (
            <TouchableOpacity
              key={operator.id}
              style={styles.operatorItem}
              onPress={() => handleOperatorSelect(operator)}
            >
              <View style={[styles.operatorLogoContainer, { backgroundColor: operator.color + '20' }]}>
                <Text style={styles.operatorLogo}>{operator.logo}</Text>
              </View>
              <Text style={styles.operatorName}>{operator.name}</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, phoneNumber.length === 0 && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={phoneNumber.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  inputSection: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRightWidth: 0,
    width: 95,
    height: 58,
    marginRight: 8,
  },
  flag: {
    fontSize: 16,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    height: 58,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    fontSize: 16,
    color: '#333',
  },
  quickAmountSection: {
    marginBottom: 25,
  },
  quickAmountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickAmountItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  quickAmountSelected: {
    backgroundColor: '#37c667',
    borderColor: '#37c667',
  },
  quickAmountText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  quickAmountTextSelected: {
    color: '#fff',
  },
  operatorsSection: {
    marginTop: 10,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  operatorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  operatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  operatorLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  operatorLogo: {
    fontSize: 24,
  },
  operatorName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#37c667',
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

export default MobileRechargeScreen;
