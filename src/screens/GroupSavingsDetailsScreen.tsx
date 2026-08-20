import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService, GroupSavingsDetailResponse, PaymentScheduleResponse } from '../services/api';
import { RootStackParamList } from '../navigation/RootNavigator';

const Skeleton = ({ width, height, style }: { width?: number | string; height?: number; style?: any }) => {
  const [opacity] = useState(new Animated.Value(0.3));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width: width || '100%', height: height || 20 },
        style,
        { opacity },
      ]}
    />
  );
};

const GroupSavingsDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'GroupSavingsDetails'>>();
  const { groupSavingsId } = route.params;

  const [savingsDetails, setSavingsDetails] = useState<GroupSavingsDetailResponse | null>(null);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentScheduleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

  useEffect(() => {
    loadSavingsDetails();
  }, [groupSavingsId]);

  const loadSavingsDetails = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        Alert.alert('Error', 'You need to be logged in');
        setIsLoading(false);
        return;
      }

      const [detailsResponse, scheduleResponse] = await Promise.all([
        apiService.getGroupSavingsDetails(token, parseInt(groupSavingsId)),
        apiService.getPaymentSchedule(token, parseInt(groupSavingsId)),
      ]);

      setSavingsDetails(detailsResponse);
      setPaymentSchedule(scheduleResponse);
    } catch (error: any) {
      Alert.alert('Error', error.errorMessage || 'Failed to load savings details');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#10b981';
      case 'due':
        return '#f59e0b';
      case 'upcoming':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#d1fae5';
      case 'due':
        return '#fef3c7';
      case 'upcoming':
        return '#f3f4f6';
      default:
        return '#f3f4f6';
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Header Skeleton */}
        <View style={styles.header}>
          <View style={styles.backButtonSkeleton} />
          <Skeleton width={150} height={20} />
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Info Card Skeleton */}
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Skeleton width={120} height={24} />
              <Skeleton width={60} height={24} />
            </View>
            <View style={styles.infoRow}>
              <Skeleton width={80} height={16} />
              <Skeleton width={100} height={16} />
            </View>
            <View style={styles.infoRow}>
              <Skeleton width={80} height={16} />
              <Skeleton width={100} height={16} />
            </View>
            <View style={styles.infoRow}>
              <Skeleton width={80} height={16} />
              <Skeleton width={50} height={16} />
            </View>
            <Skeleton width="100%" height={8} style={{ marginBottom: 20 }} />
            <View style={styles.installmentsRow}>
              <Skeleton width={40} height={16} />
              <Skeleton width={40} height={16} />
              <Skeleton width={60} height={16} />
            </View>
          </View>

          {/* Members Section Skeleton */}
          <View style={styles.section}>
            <Skeleton width={150} height={22} style={{ marginBottom: 16 }} />
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.memberItem}>
                <Skeleton width={40} height={40} style={{ borderRadius: 20, marginRight: 12 }} />
                <View style={styles.memberInfo}>
                  <Skeleton width={100} height={16} style={{ marginBottom: 4 }} />
                  <Skeleton width={80} height={12} />
                </View>
                <Skeleton width={60} height={14} />
              </View>
            ))}
          </View>

          {/* Payment Schedule Skeleton */}
          <View style={styles.section}>
            <Skeleton width={150} height={22} style={{ marginBottom: 16 }} />
            {[1, 2, 3, 4].map((i) => (
              <View key={i} style={styles.scheduleItem}>
                <Skeleton width={32} height={32} style={{ borderRadius: 16, marginRight: 12 }} />
                <View style={styles.scheduleInfo}>
                  <Skeleton width={100} height={14} style={{ marginBottom: 2 }} />
                  <Skeleton width={60} height={12} />
                </View>
                <Skeleton width={60} height={24} style={{ borderRadius: 12 }} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!savingsDetails) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load savings details</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadSavingsDetails}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { groupSavings, members } = savingsDetails;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Savings Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Savings Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.savingsName}>{groupSavings.name}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Goal Amount</Text>
            <Text style={styles.infoValue}>৳{groupSavings.goal_amount.toLocaleString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Current Amount</Text>
            <Text style={styles.infoValue}>৳{groupSavings.current_amount.toLocaleString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Progress</Text>
            <Text style={styles.infoValue}>{groupSavings.percentage_paid}%</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { width: `${groupSavings.percentage_paid}%` }]} />
          </View>

          <View style={styles.installmentsRow}>
            <View style={styles.installmentItem}>
              <Text style={styles.installmentLabel}>Total</Text>
              <Text style={styles.installmentValue}>{groupSavings.total_installments}</Text>
            </View>
            <View style={styles.installmentItem}>
              <Text style={styles.installmentLabel}>Remaining</Text>
              <Text style={styles.installmentValue}>{groupSavings.remaining_installments}</Text>
            </View>
            <View style={styles.installmentItem}>
              <Text style={styles.installmentLabel}>Next Payment</Text>
              <Text style={styles.installmentValue}>
                {new Date(groupSavings.next_payment_date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Members Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Members ({members.length})</Text>
          {members.map((member: any, index: number) => (
            <View key={index} style={styles.memberItem}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>
                  {member.name?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name || 'Unknown'}</Text>
                <Text style={styles.memberPhone}>{member.phone || ''}</Text>
              </View>
              <Text style={styles.memberContribution}>
                ৳{member.contribution_amount?.toLocaleString() || 0}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Schedule Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Schedule</Text>
          {paymentSchedule?.payment_schedule.map((item) => (
            <View key={item.installment_number} style={styles.scheduleItem}>
              <View style={styles.scheduleNumber}>
                <Text style={styles.scheduleNumberText}>#{item.installment_number}</Text>
              </View>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleDate}>
                  {new Date(item.payment_date).toLocaleDateString()}
                </Text>
                <Text style={styles.scheduleAmount}>৳{item.amount.toFixed(2)}</Text>
              </View>
              <View
                style={[
                  styles.scheduleStatus,
                  { backgroundColor: getStatusBgColor(item.status) },
                ]}
              >
                <Text style={[styles.scheduleStatusText, { color: getStatusColor(item.status) }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  skeleton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  backButtonSkeleton: {
    width: 34,
    height: 34,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#F8623F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  savingsName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    width: '100%',
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F8623F',
    borderRadius: 4,
  },
  installmentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  installmentItem: {
    alignItems: 'center',
  },
  installmentLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  installmentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8623F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  memberPhone: {
    fontSize: 12,
    color: '#9ca3af',
  },
  memberContribution: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  scheduleNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  scheduleAmount: {
    fontSize: 12,
    color: '#9ca3af',
  },
  scheduleStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scheduleStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default GroupSavingsDetailsScreen;
