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

interface Merchant {
  id: string;
  name: string;
  category: string;
  logo: string;
  color: string;
}

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [merchantNumber, setMerchantNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');

  const merchants: Merchant[] = [
    { id: '1', name: 'Daraz', category: 'E-commerce', logo: '🛒', color: '#F57C00' },
    { id: '2', name: 'Pathao', category: 'Ride Sharing', logo: '🚗', color: '#00A651' },
    { id: '3', name: 'Foodpanda', category: 'Food Delivery', logo: '🍔', color: '#FF6B35' },
    { id: '4', name: 'Uber', category: 'Ride Sharing', logo: '🚕', color: '#000000' },
    { id: '5', name: 'Shopee', category: 'E-commerce', logo: '🛍️', color: '#EE4D2D' },
  ];

  const handleMerchantSelect = (merchant: Merchant) => {
    navigation.navigate('PaymentAmount' as never);
  };

  const handleContinue = () => {
    if (merchantNumber.length > 0) {
      navigation.navigate('PaymentAmount' as never);
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
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Merchant Number Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Enter Merchant Number</Text>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.flag}>🇧🇩</Text>
              <Text style={styles.countryCode}>+880</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="1XXX-XXXXXX"
              placeholderTextColor="#999"
              value={merchantNumber}
              onChangeText={setMerchantNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        {/* Quick Amounts */}
        <View style={styles.quickAmountSection}>
          <Text style={styles.sectionTitle}>Quick Amount</Text>
          <View style={styles.quickAmountGrid}>
            {['100', '500', '1000', '2000', '5000', '10000'].map((amount) => (
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

        {/* Popular Merchants */}
        <View style={styles.merchantsSection}>
          <Text style={styles.sectionTitle}>Popular Merchants</Text>
          {merchants.map((merchant) => (
            <TouchableOpacity
              key={merchant.id}
              style={styles.merchantItem}
              onPress={() => handleMerchantSelect(merchant)}
            >
              <View style={[styles.merchantLogoContainer, { backgroundColor: merchant.color + '20' }]}>
                <Text style={styles.merchantLogo}>{merchant.logo}</Text>
              </View>
              <Text style={styles.merchantName}>{merchant.name}</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, merchantNumber.length === 0 && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={merchantNumber.length === 0}
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
  merchantsSection: {
    marginTop: 10,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  merchantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  merchantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  merchantLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  merchantLogo: {
    fontSize: 24,
  },
  merchantName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
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

export default PaymentScreen;
