import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../services/api';

const SavingsScreen = () => {
  const navigation = useNavigation();
  const [pendingInvitation, setPendingInvitation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [groupSavings, setGroupSavings] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

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

  useEffect(() => {
    loadPendingInvitation();
    loadGroupSavings();
  }, []);

  const loadPendingInvitation = async () => {
    try {
      const invitationData = await AsyncStorage.getItem('pending_group_savings_invitation');
      if (invitationData) {
        setPendingInvitation(JSON.parse(invitationData));
      }
    } catch (error) {
      console.error('Failed to load pending invitation:', error);
    }
  };

  const loadGroupSavings = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        setIsDataLoading(false);
        return;
      }

      const response = await apiService.getGroupSavings(token);
      setGroupSavings(response.groupSavings);
    } catch (error) {
      console.error('Failed to load group savings:', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleAcceptInvitation = async () => {
    if (!pendingInvitation?.groupSavingsId) return;
    
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        Alert.alert('Error', 'You need to be logged in');
        setIsLoading(false);
        return;
      }

      const response = await apiService.acceptGroupSavingsInvitation(token, pendingInvitation.groupSavingsId);
      
      // Clear pending invitation
      await AsyncStorage.removeItem('pending_group_savings_invitation');
      setPendingInvitation(null);
      
      // Navigate to success screen
      (navigation as any).navigate('Success', {
        amount: '',
        receiverPhone: '',
        receiverName: 'Group Savings Accepted',
        transactionType: 'GROUP_SAVINGS',
      });
    } catch (error: any) {
      Alert.alert('Error', error.errorMessage || 'Failed to accept invitation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectInvitation = async () => {
    if (!pendingInvitation?.groupSavingsId) return;
    
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        Alert.alert('Error', 'You need to be logged in');
        setIsLoading(false);
        return;
      }

      const response = await apiService.rejectGroupSavingsInvitation(token, pendingInvitation.groupSavingsId);
      
      // Clear pending invitation
      await AsyncStorage.removeItem('pending_group_savings_invitation');
      setPendingInvitation(null);
      
      // Navigate to success screen
      (navigation as any).navigate('Success', {
        amount: '',
        receiverPhone: '',
        receiverName: 'Group Savings Rejected',
        transactionType: 'GROUP_SAVINGS',
      });
    } catch (error: any) {
      Alert.alert('Error', error.errorMessage || 'Failed to reject invitation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader title="Savings" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pending Group Savings Invitation Card */}
        {pendingInvitation && (
          <View style={styles.invitationCard}>
            <View style={styles.invitationHeader}>
              <Icon name="people" size={24} color="#F8623F" />
              <Text style={styles.invitationTitle}>Group Savings Invitation</Text>
            </View>
            <Text style={styles.invitationBody}>{pendingInvitation.body}</Text>
            <View style={styles.invitationButtons}>
              <TouchableOpacity
                style={[styles.invitationButton, styles.rejectButton]}
                onPress={handleRejectInvitation}
                disabled={isLoading}
              >
                <Text style={styles.rejectButtonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.invitationButton, styles.acceptButton]}
                onPress={handleAcceptInvitation}
                disabled={isLoading}
              >
                <Text style={styles.acceptButtonText}>{isLoading ? 'Processing...' : 'Accept'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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

        {/* Group Savings Cards */}
        {isDataLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : groupSavings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No group savings yet</Text>
          </View>
        ) : (
          groupSavings.map((savings) => (
            <TouchableOpacity
              key={savings.id}
              style={styles.savingsPlanCard}
              onPress={() => (navigation as any).navigate('GroupSavingsDetails', { groupSavingsId: savings.id.toString() })}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{savings.name}</Text>
                <View style={styles.planStatusBadge}>
                  <Text style={styles.planStatusText}>{savings.status}</Text>
                </View>
              </View>
              <View style={styles.planInfoRow}>
                <Text style={styles.planLabel}>Goal</Text>
                <Text style={styles.planValue}>৳{savings.goal_amount.toLocaleString()}</Text>
              </View>
              <View style={styles.planInfoRow}>
                <Text style={styles.planLabel}>Saved</Text>
                <Text style={styles.planValue}>৳{savings.current_amount.toLocaleString()}</Text>
              </View>
              <View style={styles.planInfoRow}>
                <Text style={styles.planLabel}>Progress</Text>
                <Text style={styles.planValue}>{savings.percentage_paid}%</Text>
              </View>
              <View style={styles.planProgressBar}>
                <View style={[styles.planProgressBarFill, { width: `${savings.percentage_paid}%` }]} />
              </View>
            </TouchableOpacity>
          ))
        )}

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
          <TouchableOpacity style={styles.groupSavingsButton} onPress={() => navigation.navigate('GroupSavingsCreate' as never)}>
            <Text style={styles.groupSavingsButtonText}>+ Create Group Savings</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11182e',
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
    color: '#11182e',
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
    color: '#11182e',
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
    backgroundColor: '#11182e',
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
    color: '#11182e',
    fontSize: 16,
    fontWeight: '600',
  },
  groupSavingsButton: {
    backgroundColor: '#F8623F',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  groupSavingsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  invitationCard: {
    backgroundColor: '#FFF5F2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F8623F',
  },
  invitationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  invitationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  invitationBody: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  invitationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  invitationButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F8623F',
  },
  rejectButtonText: {
    color: '#F8623F',
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    backgroundColor: '#F8623F',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  savingsPlanCard: {
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
  planStatusBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  planStatusText: {
    color: '#0284c7',
    fontSize: 12,
    fontWeight: '600',
  },
  planInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planLabel: {
    fontSize: 13,
    color: '#9ca3af',
  },
  planValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  planProgressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    width: '100%',
    marginTop: 8,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  addButton: {
    backgroundColor: '#11182e',
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
