import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';

interface Operator {
  id: string;
  name: string;
  logo: string;
  color: string;
}

const MobileRechargeScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);

  const operators: Operator[] = [
    { id: '1', name: 'Grameenphone', logo: '📱', color: '#E31837' },
    { id: '2', name: 'Banglalink', logo: '📡', color: '#FF6600' },
    { id: '3', name: 'Robi', logo: '📶', color: '#E30613' },
    { id: '4', name: 'Teletalk', logo: '📞', color: '#006633' },
    { id: '5', name: 'Airtel', logo: '📲', color: '#FF0000' },
  ];

  const handleOperatorSelect = (operator: Operator) => {
    setSelectedOperator(operator.id);
  };

  const handleContinue = () => {
    if (phoneNumber.length > 0 && selectedOperator) {
      navigation.navigate('MobileRechargeAmount' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ScreenHeader title="Mobile Recharge" />

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

          {/* Operators - Show only after phone number is entered */}
          {phoneNumber.length > 0 && (
            <View style={styles.operatorsSection}>
              <Text style={styles.sectionTitle}>Select Operator</Text>
              {operators.map((operator) => (
                <TouchableOpacity
                  key={operator.id}
                  style={styles.operatorItem}
                  onPress={() => handleOperatorSelect(operator)}
                >
                  <View style={styles.radioButtonContainer}>
                    <View style={[styles.radioButton, selectedOperator === operator.id && styles.radioButtonSelected]}>
                      {selectedOperator === operator.id && <View style={styles.radioButtonInner} />}
                    </View>
                  </View>
                  <View style={[styles.operatorLogoContainer, { backgroundColor: operator.color + '20' }]}>
                    <Text style={styles.operatorLogo}>{operator.logo}</Text>
                  </View>
                  <Text style={styles.operatorName}>{operator.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.continueButton, (phoneNumber.length === 0 || !selectedOperator) && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={phoneNumber.length === 0 || !selectedOperator}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    color: '#11182e',
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
    color: '#11182e',
  },
  operatorsSection: {
    marginTop: 10,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 15,
  },
  operatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  radioButtonContainer: {
    marginRight: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#F8623F',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F8623F',
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

export default MobileRechargeScreen;
