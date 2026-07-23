import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SavingsOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface Goal {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const SavingsScreen = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState<SavingsOption | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const savingsOptions: SavingsOption[] = [
    {
      id: '1',
      name: 'Regular Savings',
      description: 'Save daily, weekly or monthly',
      icon: 'wallet-outline',
      color: '#37c667',
    },
    {
      id: '2',
      name: 'Fixed Deposit',
      description: 'Lock money for fixed period',
      icon: 'lock-closed-outline',
      color: '#667EEA',
    },
    {
      id: '3',
      name: 'Goal Based Savings',
      description: 'Save for specific goals',
      icon: 'flag-outline',
      color: '#F093FB',
    },
  ];

  const goals: Goal[] = [
    { id: '1', name: 'Emergency Fund', icon: 'shield-checkmark-outline', color: '#667EEA' },
    { id: '2', name: 'Vacation', icon: 'airplane-outline', color: '#764BA2' },
    { id: '3', name: 'New Car', icon: 'car-outline', color: '#F093FB' },
    { id: '4', name: 'Home', icon: 'home-outline', color: '#4ECDC4' },
    { id: '5', name: 'Education', icon: 'book-outline', color: '#45B7D1' },
    { id: '6', name: 'Wedding', icon: 'heart-outline', color: '#FF6B6B' },
  ];

  const handleOptionSelect = (option: SavingsOption) => {
    setSelectedOption(option);
    if (option.id !== '3') {
      navigation.navigate('SavingsAmount' as never);
    }
  };

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleContinue = () => {
    if (selectedOption && selectedGoal) {
      navigation.navigate('SavingsAmount' as never);
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
          <Text style={styles.headerTitle}>Savings</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Total Savings Card */}
        <View style={styles.totalSavingsCard}>
          <Text style={styles.totalLabel}>Total Savings</Text>
          <Text style={styles.totalAmount}>৳ 45,000.00</Text>
          <View style={styles.growthContainer}>
            <Icon name="trending-up-outline" size={16} color="#37c667" />
            <Text style={styles.growthText}>+12% this month</Text>
          </View>
        </View>

        {/* Savings Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Choose Savings Type</Text>
          <View style={styles.optionsGrid}>
            {savingsOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionItem,
                  selectedOption?.id === option.id && styles.optionItemSelected,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <View style={[styles.optionIconContainer, { backgroundColor: option.color + '20' }]}>
                  <Icon name={option.icon as any} size={24} color={option.color} />
                </View>
                <Text style={styles.optionName}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Goal Selection (only for Goal Based Savings) */}
        {selectedOption?.id === '3' && (
          <View style={styles.goalsSection}>
            <Text style={styles.sectionTitle}>Select Your Goal</Text>
            <View style={styles.goalsGrid}>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.goalItem,
                    selectedGoal?.id === goal.id && styles.goalItemSelected,
                  ]}
                  onPress={() => handleGoalSelect(goal)}
                >
                  <View style={[styles.goalIconContainer, { backgroundColor: goal.color + '20' }]}>
                    <Icon name={goal.icon as any} size={20} color={goal.color} />
                  </View>
                  <Text style={styles.goalName}>{goal.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Continue Button */}
        {selectedOption?.id === '3' && (
          <TouchableOpacity
            style={[styles.continueButton, !selectedGoal && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!selectedGoal}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
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
  totalSavingsCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  totalLabel: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 12,
  },
  growthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  growthText: {
    fontSize: 13,
    color: '#37c667',
    fontWeight: '600',
  },
  optionsSection: {
    marginTop: 10,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  optionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  optionItem: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionItemSelected: {
    borderColor: '#37c667',
    backgroundColor: '#F0FDF4',
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  goalsSection: {
    marginBottom: 20,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  goalItem: {
    width: '31%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goalItemSelected: {
    borderColor: '#F093FB',
    backgroundColor: '#FDF2FF',
  },
  goalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  goalName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
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

export default SavingsScreen;
