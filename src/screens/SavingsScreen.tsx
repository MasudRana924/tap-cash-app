import React from 'react';
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

const SavingsScreen = () => {
  const navigation = useNavigation();

  const savingsPlans = [
    {
      id: '1',
      name: 'Emergency Fund',
      rate: '5.5% p.a.',
      saved: '৳8,000',
      goal: '৳50,000',
      progress: 0.16,
    },
    {
      id: '2',
      name: 'Vacation 2027',
      rate: '4.8% p.a.',
      saved: '৳12,000',
      goal: '৳30,000',
      progress: 0.4,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Savings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Total Savings Card */}
        <View style={styles.totalSavingsCard}>
          <Text style={styles.totalLabel}>Total Savings</Text>
          <Text style={styles.totalAmount}>৳8,000.00</Text>

          <View style={styles.progressInfoRow}>
            <View style={styles.progressInfoItem}>
              <Text style={styles.progressInfoLabel}>Monthly Goal</Text>
              <Text style={styles.progressInfoValue}>৳10,000</Text>
            </View>
            <View style={styles.progressInfoItem}>
              <Text style={styles.progressInfoLabel}>Progress</Text>
              <Text style={styles.progressInfoValue}>80%</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '80%' }]} />
          </View>
        </View>

        {/* Savings Plans Section */}
        <Text style={styles.sectionTitle}>Savings Plans</Text>

        {savingsPlans.map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.ratePill}>
                <Text style={styles.rateText}>{plan.rate}</Text>
              </View>
            </View>
            <View style={styles.planDetailsRow}>
              <Text style={styles.planSaved}>{plan.saved} saved</Text>
              <Text style={styles.planGoal}>Goal: {plan.goal}</Text>
            </View>
            <View style={styles.planProgressBarBg}>
              <View style={[styles.planProgressBarFill, { width: `${plan.progress * 100}%` }]} />
            </View>
          </View>
        ))}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateSavingsPlan' as never)}>
            <Text style={styles.createButtonText}>+ Create New Savings Plan</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  totalSavingsCard: {
    backgroundColor: '#596372',
    borderRadius: 24,
    padding: 24,
    marginBottom: 30,
    overflow: 'hidden',
  },
  totalLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 4,
  },
  totalAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    // marginBottom: 30,
  },
  progressInfoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  progressInfoItem: {
    marginRight: 40,
  },
  progressInfoLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  progressInfoValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  ratePill: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rateText: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
  },
  planDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planSaved: {
    fontSize: 13,
    color: '#9ca3af',
  },
  planGoal: {
    fontSize: 13,
    color: '#9ca3af',
  },
  planProgressBarBg: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    width: '100%',
  },
  planProgressBarFill: {
    height: '100%',
    backgroundColor: '#6b7280',
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 10,
  },
  createButton: {
    backgroundColor: '#f4f5f7',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  createButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#6b7280',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SavingsScreen;
