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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const menuOptions = [
    { id: 1, name: 'Savings', icon: 'wallet-outline' },
    { id: 2, name: 'Add Money', icon: 'add-circle-outline' },
    { id: 3, name: 'Mobile Recharge', icon: 'phone-portrait-outline' },
    { id: 4, name: 'Payment', icon: 'card-outline' },
    { id: 5, name: 'Pay Bill', icon: 'receipt-outline' },
    { id: 6, name: 'Loan', icon: 'cash-outline' },
  ];



  const recentTransactions = [
    {
      id: '1',
      name: 'Arif Rahman',
      time: 'Today, 2:34 PM',
      amount: '-৳1,500',
      icon: 'arrow-up',
      iconColor: '#6b7280',
      iconBg: '#f3f4f6',
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
      icon: 'arrow-down',
      iconColor: '#10b981',
      iconBg: '#ecfdf5',
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
      icon: 'flash',
      iconColor: '#f59e0b',
      iconBg: '#fffbeb',
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
      iconColor: '#6366f1',
      iconBg: '#ede9fe',
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          // Skeleton Loader - matches exact content structure
          <View>
            {/* Header Skeleton */}
            <View style={styles.header}>
              <View style={styles.profileSection}>
                <View style={[styles.profileImage, styles.skeleton]} />
                <View style={styles.greetingSection}>
                  <View style={[styles.skeleton, { width: 80, height: 14, marginBottom: 8 }]} />
                  <View style={[styles.skeleton, { width: 120, height: 20 }]} />
                </View>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <View style={[styles.skeleton, { width: 24, height: 24, borderRadius: 12 }]} />
                <View style={[styles.notificationDot, styles.skeleton]} />
              </TouchableOpacity>
            </View>

            {/* Balance Card Skeleton */}
            <View style={styles.balanceCard}>
              <View style={styles.balanceHeader}>
                <View style={[styles.skeleton, { width: 100, height: 16 }]} />
                <View style={[styles.skeleton, { width: 20, height: 20, borderRadius: 10 }]} />
              </View>
              <View style={[styles.skeleton, { width: 150, height: 36, marginBottom: 16 }]} />
              <View style={styles.balanceActions}>
                <View style={styles.balanceAction}>
                  <View style={[styles.skeleton, { width: 16, height: 16, borderRadius: 8 }]} />
                  <View style={[styles.skeleton, { width: 60, height: 14 }]} />
                </View>
                <View style={styles.balanceAction}>
                  <View style={[styles.skeleton, { width: 16, height: 16, borderRadius: 8 }]} />
                  <View style={[styles.skeleton, { width: 60, height: 14 }]} />
                </View>
              </View>
            </View>

            {/* Action Buttons Skeleton */}
            <View style={styles.actionButtons}>
              <View style={[styles.actionButton, styles.skeleton]}>
                <View style={[styles.skeleton, { width: 24, height: 24, borderRadius: 12 }]} />
                <View style={[styles.skeleton, { width: 80, height: 16 }]} />
              </View>
              <View style={[styles.actionButton, styles.skeleton]}>
                <View style={[styles.skeleton, { width: 24, height: 24, borderRadius: 12 }]} />
                <View style={[styles.skeleton, { width: 80, height: 16 }]} />
              </View>
              <View style={[styles.menuButton, styles.skeleton]}>
                <View style={styles.menuIconContainer}>
                  <View style={[styles.skeleton, { width: 24, height: 24, borderRadius: 12 }]} />
                </View>
              </View>
            </View>

          </View>
        ) : (
          // Actual Content
          <View>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.profileSection}>
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                  style={styles.profileImage}
                />
                <View style={styles.greetingSection}>
                  <Text style={styles.greeting}>Hi, User</Text>
                  <Text style={styles.goodMorning}>Good Morning!</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('Notifications' as never)}>
                <Icon name="notifications-outline" size={24} color="#333" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>

            {/* Balance Card */}
            <View style={styles.balanceCard}>
              <View style={styles.balanceHeader}>
                <Text style={styles.balanceTitle}>Total Balance</Text>
                <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                  <Icon name={showBalance ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                <Text style={styles.balanceAmount}>{showBalance ? '$12,765.00' : 'Show Balance'}</Text>
              </TouchableOpacity>
              <View style={styles.balanceActions}>
                <View style={styles.balanceAction}>
                  <Icon name="arrow-up-outline" size={16} color="#6b7280" />
                  <Text style={styles.balanceActionText}>+$2,450</Text>
                </View>
                <View style={styles.balanceAction}>
                  <Icon name="arrow-down-outline" size={16} color="#FF6B6B" />
                  <Text style={styles.balanceActionText}>-$1,230</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('SendMoney' as never)}>
                <Icon name="arrow-up-outline" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CashOut' as never)}>
                <Icon name="arrow-down-outline" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Cash Out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuExpanded(!isMenuExpanded)}>
                <View style={styles.menuIconContainer}>
                  <Icon name="ellipsis-horizontal" size={24} color="#6b7280" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Expandable Menu Section */}
            {isMenuExpanded && (
              <View style={styles.expandedMenu}>
                <View style={styles.menuGrid}>
                  {menuOptions.map((option) => {
                    const routeMap: Record<number, string> = {
                      1: 'Savings',
                      2: 'AddMoney',
                      3: 'MobileRecharge',
                      4: 'Payment',
                      5: 'PayBill',
                      6: 'Loan',
                    };
                    return (
                      <TouchableOpacity 
                        key={option.id} 
                        style={styles.menuOption}
                        onPress={() => navigation.navigate(routeMap[option.id] as never)}
                      >
                        <Icon name={option.icon as any} size={20} color="#333" />
                        <Text style={styles.menuOptionText}>{option.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Recent Activity */}
            <View style={styles.recentSection}>
              <View style={styles.recentHeader}>
                <Text style={styles.recentTitle}>Recent Activity</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Transactions' as never)}>
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
                    onPress={() => navigation.navigate('TransactionDetails' as never, tx as never)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.recentIconWrap, { backgroundColor: tx.iconBg }]}>
                      <Icon name={tx.icon as any} size={16} color={tx.iconColor} />
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  greetingSection: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
  },
  goodMorning: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  notificationDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceTitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 20,
  },
  balanceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  balanceActionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#6b7280',
    borderRadius: 20,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    paddingHorizontal: 16,
    shadowColor: '#6b7280',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  menuButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    shadowColor: '#6b7280',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedMenu: {
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    padding: 15,
    marginBottom: 25,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuOption: {
    width: '30%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  menuOptionText: {
    fontSize: 10,
    color: '#333',
    marginTop: 5,
    fontWeight: '400',
    textAlign: 'center',
  },
  cashbackBanner: {
    backgroundColor: '#7C3AED',
    borderRadius: 24,
    padding: 24,
    marginBottom: 28,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  cashbackContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cashbackTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 6,
  },
  cashbackSubtitle: {
    fontSize: 13,
    color: '#C4B5FD',
    fontWeight: '400',
  },
  inviteButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inviteButtonText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '600',
  },
  inviteLink: {
    fontSize: 14,
    color: '#C4B5FD',
    fontWeight: '500',
  },
  transactionsSection: {
    marginBottom: 25,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  seeAll: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  transactionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionIconText: {
    fontSize: 24,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
    fontWeight: '400',
  },
  transactionDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '600',
  },
  amountNegative: {
    color: '#333',
  },
  amountPositive: {
    color: '#6b7280',
  },
  discoverSection: {
    marginBottom: 100,
  },
  promoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  skeleton: {
    backgroundColor: '#F6F6F6',
  },
  quickStatsSection: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '400',
    marginTop: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 4,
  },
  statSubtitle: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '400',
    marginTop: 2,
  },
  savingsSection: {
    marginBottom: 28,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  billsSection: {
    marginBottom: 28,
  },
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  billIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  billDetails: {
    flex: 1,
  },
  billTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  billDueDate: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '400',
  },
  billAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
  },

  // Recent Activity
  recentSection: {
    marginBottom: 32,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.2,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9ca3af',
  },
  recentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
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
    color: '#111827',
    marginBottom: 3,
  },
  recentTime: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '400',
  },
  recentAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  positiveAmt: {
    color: '#10b981',
  },
  negativeAmt: {
    color: '#111827',
  },
});

export default HomeScreen;
