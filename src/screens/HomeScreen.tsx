import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { token, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const balanceMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error('No token found');
      return apiService.getBalance(token);
    },
    onSuccess: (data) => {
      setBalance(data.balance);
      setShowBalance(true);
    },
    onError: (error) => {
      console.error('Failed to fetch balance:', error);
      setBalance(null);
      setShowBalance(false);
    },
    onSettled: () => {
      setBalanceLoading(false);
    },
  });

  const handleBalanceTap = () => {
    if (!token || authLoading) {
      console.error('Cannot fetch balance: No token or auth still loading');
      return;
    }
    setBalanceLoading(true);
    balanceMutation.mutate();
  };

  const gridServices: Array<{
    id: string;
    name: string;
    icon: string;
    route: keyof RootStackParamList;
  }> = [
    // { id: '1', name: 'Send', icon: 'paper-plane-outline', route: 'SendMoney' },
    { id: '2', name: 'Add Money', icon: 'add-circle-outline', route: 'AddMoney' },
    { id: '3', name: 'Cash Out', icon: 'wallet-outline', route: 'CashOut' },
    { id: '4', name: 'Payment', icon: 'qr-code-outline', route: 'Payment' },
    // { id: '5', name: 'Bill', icon: 'flash-outline', route: 'PayBill' },
    { id: '6', name: 'Recharge', icon: 'phone-portrait-outline', route: 'MobileRecharge' },
    { id: '7', name: 'Savings', icon: 'save-outline', route: 'Savings' },
    { id: '8', name: 'Loan', icon: 'cash-outline', route: 'Loan' },
  ];

  const recentTransactions = [
    {
      id: '1',
      name: 'Arif Rahman',
      time: 'Today, 2:34 PM',
      amount: '-৳1,500',
      icon: 'arrow-up-outline',
      iconColor: '#475569',
      iconBg: '#F1F5F9',
      isPositive: false,
      category: 'Transfer',
      date: 'Today',
      transactionId: 'SWP2407210001',
      dateTime: 'Jul 21, 2026 • 2:34 PM',
      type: 'Money Transfer',
      note: '—',
    },
    {
      id: '2',
      name: 'Nadia Islam',
      time: 'Today, 11:10 AM',
      amount: '+৳5,000',
      icon: 'arrow-down-outline',
      iconColor: '#10B981',
      iconBg: '#ECFDF5',
      isPositive: true,
      category: 'Transfer',
      date: 'Today',
      transactionId: 'SWP2407210042',
      dateTime: 'Jul 21, 2026 • 11:10 AM',
      type: 'Money Transfer',
      note: 'For groceries',
    },
    {
      id: '3',
      name: 'DESCO Bill',
      time: 'Yesterday, 5:00 PM',
      amount: '-৳2,340',
      icon: 'flash-outline',
      iconColor: '#F59E0B',
      iconBg: '#FFFBEB',
      isPositive: false,
      category: 'Bill Payment',
      date: 'Yesterday',
      transactionId: 'SWP2407200018',
      dateTime: 'Jul 20, 2026 • 5:00 PM',
      type: 'Bill Payment',
      note: 'Electricity bill',
    },
    {
      id: '4',
      name: 'Grameenphone',
      time: 'Yesterday, 9:22 AM',
      amount: '-৳99',
      icon: 'phone-portrait-outline',
      iconColor: '#6366F1',
      iconBg: '#EEF2FF',
      isPositive: false,
      category: 'Mobile Recharge',
      date: 'Yesterday',
      transactionId: 'SWP2407200031',
      dateTime: 'Jul 20, 2026 • 9:22 AM',
      type: 'Mobile Recharge',
      note: '—',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          /* Skeleton Loader */
          <View>
            {/* Header Skeleton */}
            <View style={styles.header}>
              <View style={styles.profileSection}>
                <View style={[styles.profileImage, styles.skeleton]} />
                <View style={styles.greetingSection}>
                  <View style={[styles.skeleton, { width: 90, height: 14, marginBottom: 6, borderRadius: 4 }]} />
                  <View style={[styles.skeleton, { width: 70, height: 22, borderRadius: 4 }]} />
                </View>
              </View>
              <View style={[styles.notificationButton, styles.skeleton]} />
            </View>

            {/* Balance Card Skeleton */}
            <View style={[styles.balanceCard, { height: 190 }]}>
              <View style={styles.balanceHeader}>
                <View style={[styles.skeleton, { width: 120, height: 16, borderRadius: 4 }]} />
                <View style={[styles.skeleton, { width: 36, height: 36, borderRadius: 18 }]} />
              </View>
              <View style={[styles.skeleton, { width: 180, height: 40, marginVertical: 12, borderRadius: 6 }]} />
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={[styles.skeleton, { flex: 1, height: 48, borderRadius: 16 }]} />
                <View style={[styles.skeleton, { flex: 1, height: 48, borderRadius: 16 }]} />
              </View>
            </View>

            {/* Grid Skeleton */}
            <View style={styles.gridContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <View key={item} style={styles.gridItem}>
                  <View style={[styles.gridIconBox, styles.skeleton]} />
                  <View style={[styles.skeleton, { width: 50, height: 10, borderRadius: 4 }]} />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View>
            {/* Top Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.profileSection}
                onPress={() => navigation.navigate('Profile')}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                  style={styles.profileImage}
                />
                <View style={styles.greetingSection}>
                  <Text style={styles.greeting}>Good morning,</Text>
                  <Text style={styles.userName}>Sarah</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => navigation.navigate('Notifications')}
                activeOpacity={0.8}
              >
                <Icon name="notifications-outline" size={20} color="#F8623F" />
              </TouchableOpacity>
            </View>

            {/* Available Balance Card */}
            <View style={styles.balanceCard}>
              <View style={styles.balanceHeader}>
                <Text style={styles.balanceTitle}>Available Balance</Text>
              </View>

              {/* Amount Display */}
              <TouchableOpacity
                onPress={handleBalanceTap}
                activeOpacity={0.9}
                style={styles.amountContainer}
              >
                {balanceLoading ? (
                  <View style={styles.skeletonBalance} />
                ) : showBalance && balance ? (
                  <View style={styles.amountRow}>
                    <Text style={styles.takaSymbol}>৳</Text>
                    <Text style={styles.balanceInteger}>{balance.split('.')[0]}</Text>
                    <Text style={styles.balanceDecimal}>.{balance.split('.')[1] || '00'}</Text>
                  </View>
                ) : (
                  <Text style={styles.tapToShowText}>Tap to Show</Text>
                )}
              </TouchableOpacity>

              {/* Action Buttons: Send Money & History */}
              <View style={styles.cardActionsRow}>
                <TouchableOpacity
                  style={styles.sendMoneyBtn}
                  onPress={() => navigation.navigate('SendMoney')}
                  activeOpacity={0.85}
                >
                  <Icon name="arrow-up-outline" size={18} color="#FFFFFF" style={styles.btnIconTilted} />
                  <Text style={styles.sendMoneyBtnText}>Send Money</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.historyBtn}
                  onPress={() => navigation.navigate('AddMoney')}
                  activeOpacity={0.85}
                >
                  <Icon name="add-circle-outline" size={18} color="#0F172A" style={{ marginRight: 8 }} />
                  <Text style={styles.historyBtnText}>Add Money</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Services Grid */}
            <View style={styles.gridContainer}>
              {gridServices.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.gridItem}
                  onPress={() => navigation.navigate(item.route as any)}
                  activeOpacity={0.7}
                >
                  <View style={styles.gridIconBox}>
                    <Icon name={item.icon} size={24} color="#F8623F" />
                  </View>
                  <Text style={styles.gridItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Recent Activity */}
            <View style={styles.recentSection}>
              <View style={styles.recentHeader}>
                <Text style={styles.recentTitle}>Recent Activity</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
                  <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.recentCard}>
                {recentTransactions.map((tx, index) => (
                  <TouchableOpacity
                    key={tx.id}
                    style={[
                      styles.recentRow,
                      index === recentTransactions.length - 1 && { borderBottomWidth: 0 },
                    ]}
                    onPress={() => navigation.navigate('TransactionDetails', tx as any)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.recentIconWrap, { backgroundColor: tx.iconBg }]}>
                      <Icon name={tx.icon as any} size={18} color={tx.iconColor} />
                    </View>
                    <View style={styles.recentMid}>
                      <Text style={styles.recentName}>{tx.name}</Text>
                      <Text style={styles.recentTime}>{tx.time}</Text>
                    </View>
                    <Text style={[styles.recentAmount, tx.isPositive ? styles.positiveAmt : styles.negativeAmt]}>
                      {tx.amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
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
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  greetingSection: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '400',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#f6f6f6',
  },

  // Balance Card
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,

    // borderWidth: 1,
    // borderColor: '#F1F5F9',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceTitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountContainer: {
    marginVertical: 8,
    marginBottom: 20,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  takaSymbol: {
    fontSize: 24,
    fontWeight: '500',
    color: '#94A3B8',
    marginRight: 6,
  },
  balanceInteger: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  balanceDecimal: {
    fontSize: 28,
    fontWeight: '700',
    color: '#94A3B8',
  },
  balanceHidden: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 2,
  },
  tapToShowText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
  },
  skeletonBalance: {
    width: 180,
    height: 48,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sendMoneyBtn: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIconTilted: {
    marginRight: 8,
    transform: [{ rotate: '45deg' }],
  },
  sendMoneyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  historyBtn: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },

  // Grid Services
  gridContainer: {
    flexDirection: 'row',
gap: 14,
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    marginBottom: 16,
  },
  gridItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
  },
  gridIconBox: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f6f6f6',
  },
  gridItemText: {
    fontSize: 12,
    color: '#11182e',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Recent Activity
  recentSection: {
    marginTop: 8,
    marginBottom: 20,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11182e',
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
  },
  recentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: '#F1F5F9',
    // paddingHorizontal: 16,

  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  recentIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentMid: {
    flex: 1,
  },
  recentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 3,
  },
  recentTime: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '400',
  },
  recentAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  positiveAmt: {
    color: '#10B981',
  },
  negativeAmt: {
    color: '#0F172A',
  },
  skeleton: {
    backgroundColor: '#E2E8F0',
  },
});

export default HomeScreen;

