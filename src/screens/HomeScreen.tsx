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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const transactions = [
    {
      id: 1,
      name: 'Figma',
      category: 'Subscriptions',
      date: 'Today, 12:30 PM',
      amount: '-$250.00',
      icon: '🎨',
      isNegative: true,
    },
    {
      id: 2,
      name: 'Receive from Alex',
      category: 'Money In',
      date: 'Yesterday, 08:00 AM',
      amount: '+$580.00',
      icon: '⬇️',
      isNegative: false,
    },
    {
      id: 3,
      name: 'Medium',
      category: 'Subscriptions',
      date: 'Yesterday, 10:30 AM',
      amount: '-$99.00',
      icon: '📝',
      isNegative: true,
    },
  ];

  const menuOptions = [
    { id: 1, name: 'Savings', icon: 'wallet-outline' },
    { id: 2, name: 'Add Money', icon: 'add-circle-outline' },
    { id: 3, name: 'Mobile Recharge', icon: 'phone-portrait-outline' },
    { id: 4, name: 'Payment', icon: 'card-outline' },
    { id: 5, name: 'Pay Bill', icon: 'receipt-outline' },
    { id: 6, name: 'Loan', icon: 'cash-outline' },
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
                <TouchableOpacity>
                  <View style={[styles.skeleton, { width: 20, height: 20, borderRadius: 10 }]} />
                </TouchableOpacity>
              </View>
              <View style={[styles.skeleton, { width: 150, height: 28, marginTop: 8 }]} />
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

            {/* Cashback Banner Skeleton */}
            <View style={[styles.cashbackBanner, styles.skeleton]}>
              <View style={[styles.skeleton, { width: 200, height: 16 }]} />
              <TouchableOpacity>
                <View style={[styles.skeleton, { width: 100, height: 14 }]} />
              </TouchableOpacity>
            </View>

            {/* Transactions Skeleton */}
            <View style={styles.transactionsSection}>
              <View style={styles.transactionsHeader}>
                <View style={[styles.skeleton, { width: 100, height: 20 }]} />
                <TouchableOpacity>
                  <View style={[styles.skeleton, { width: 50, height: 14 }]} />
                </TouchableOpacity>
              </View>
              {[1, 2, 3].map((item) => (
                <View key={item} style={styles.transactionItem}>
                  <View style={styles.transactionIcon}>
                    <View style={[styles.skeleton, { width: 50, height: 50, borderRadius: 25 }]} />
                  </View>
                  <View style={styles.transactionDetails}>
                    <View style={[styles.skeleton, { width: 100, height: 16, marginBottom: 4 }]} />
                    <View style={[styles.skeleton, { width: 80, height: 14, marginBottom: 4 }]} />
                    <View style={[styles.skeleton, { width: 120, height: 12 }]} />
                  </View>
                  <View style={[styles.skeleton, { width: 80, height: 16 }]} />
                </View>
              ))}
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
                <TouchableOpacity>
                  <Icon name="eye-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <Text style={styles.balanceAmount}>$12,765.00</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('SendMoney' as never)}>
                <Icon name="arrow-up-outline" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Send Money</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="arrow-down-outline" size={24} color="#fff" />
                <Text style={styles.actionButtonText}>Cash Out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuExpanded(!isMenuExpanded)}>
                <View style={styles.menuIconContainer}>
                  <Icon name="ellipsis-horizontal" size={24} color="#37c667" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Expandable Menu Section */}
            {isMenuExpanded && (
              <View style={styles.expandedMenu}>
                <View style={styles.menuGrid}>
                  {menuOptions.map((option) => (
                    <TouchableOpacity key={option.id} style={styles.menuOption}>
                      <Icon name={option.icon as any} size={20} color="#333" />
                      <Text style={styles.menuOptionText}>{option.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Cashback Banner */}
            <View style={styles.cashbackBanner}>
              <Text style={styles.cashbackTitle}>
                Invite a friend and both earn cashback
              </Text>
              <TouchableOpacity>
                <Text style={styles.inviteLink}>Invite friends →</Text>
              </TouchableOpacity>
            </View>

            {/* Transactions Section */}
            <View style={styles.transactionsSection}>
              <View style={styles.transactionsHeader}>
                <Text style={styles.transactionsTitle}>Transactions</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Transactions' as never)}>
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              </View>

              {transactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View style={styles.transactionIcon}>
                    <Text style={styles.transactionIconText}>{transaction.icon}</Text>
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>{transaction.name}</Text>
                    <Text style={styles.transactionCategory}>
                      {transaction.category}
                    </Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.isNegative
                        ? styles.amountNegative
                        : styles.amountPositive,
                    ]}
                  >
                    {transaction.amount}
                  </Text>
                </View>
              ))}
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
    color: '#666',
  },
  goodMorning: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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

    padding: 5,
    marginBottom: 20,

  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#37c667',
    borderRadius: 16,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 15,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,
  },
  menuButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#37c667',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  cashbackTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  inviteLink: {
    fontSize: 14,
    color: '#C4B5FD',
    fontWeight: '500',
  },
  transactionsSection: {
    marginBottom: 100,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#37c667',
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountNegative: {
    color: '#333',
  },
  amountPositive: {
    color: '#37c667',
  },
  skeleton: {
    backgroundColor: '#E0E0E0',
  },
});

export default HomeScreen;
