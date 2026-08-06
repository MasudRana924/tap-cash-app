import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';

interface LoanOption {
  id: string;
  name: string;
  amount: string;
  duration: string;
  interest: string;
  icon: string;
  color: string;
}

const LoanScreen = () => {
  const navigation = useNavigation();

  const loanOptions: LoanOption[] = [
    {
      id: '1',
      name: 'Quick Loan',
      amount: 'Up to ৳50,000',
      duration: '30 days',
      interest: '5%',
      icon: 'flash-outline',
      color: '#FF6B6B',
    },
    {
      id: '2',
      name: 'Personal Loan',
      amount: 'Up to ৳200,000',
      duration: '12 months',
      interest: '12%',
      icon: 'person-outline',
      color: '#4ECDC4',
    },
    {
      id: '3',
      name: 'Business Loan',
      amount: 'Up to ৳500,000',
      duration: '24 months',
      interest: '15%',
      icon: 'briefcase-outline',
      color: '#667EEA',
    },
  ];

  const handleOptionSelect = (option: LoanOption) => {
    navigation.navigate('LoanAmount' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Loan" />

        {/* Credit Score Card */}
        <View style={styles.creditCard}>
          <View style={styles.creditHeader}>
            <Text style={styles.creditLabel}>Your Credit Score</Text>
            <Icon name="information-circle-outline" size={20} color="#11182e" />
          </View>
          <Text style={styles.creditScore}>750</Text>
          <Text style={styles.creditStatus}>Excellent</Text>
        </View>

        {/* Loan Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Choose Loan Type</Text>
          {loanOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={() => handleOptionSelect(option)}
            >
              <View style={[styles.optionIconContainer, { backgroundColor: option.color + '20' }]}>
                <Icon name={option.icon as any} size={24} color={option.color} />
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionName}>{option.name}</Text>
                <Text style={styles.optionAmount}>{option.amount}</Text>
                <View style={styles.optionMeta}>
                  <Text style={styles.optionMetaText}>{option.duration}</Text>
                  <Text style={styles.optionMetaText}>•</Text>
                  <Text style={styles.optionMetaText}>{option.interest} interest</Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11182e',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  creditCard: {
    backgroundColor: '#11182e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  creditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  creditLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  creditScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  creditStatus: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  optionsSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionDetails: {
    flex: 1,
  },
  optionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 4,
  },
  optionAmount: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  optionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  optionMetaText: {
    fontSize: 12,
    color: '#999',
  },
});

export default LoanScreen;
