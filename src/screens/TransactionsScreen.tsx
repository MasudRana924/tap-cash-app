import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: string;
  icon: string;
  color: string;
  bg: string;
  isNegative: boolean;
}

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All', icon: 'list-outline' },
    { id: 'cashIn', label: 'Cash In', icon: 'arrow-down-circle-outline' },
    { id: 'cashOut', label: 'Cash Out', icon: 'arrow-up-circle-outline' },
    { id: 'mobileRecharge', label: 'Recharge', icon: 'phone-portrait-outline' },
    { id: 'payment', label: 'Payment', icon: 'card-outline' },
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      name: 'Figma',
      category: 'Subscriptions',
      date: 'Today, 12:30 PM',
      amount: '-$250.00',
      icon: 'logo-figma',
      color: '#A259FF',
      bg: '#FAF5FF',
      isNegative: true,
    },
    {
      id: '2',
      name: 'Receive from Alex',
      category: 'Money In',
      date: 'Yesterday, 08:00 AM',
      amount: '+$580.00',
      icon: 'arrow-down-outline',
      color: '#37c667',
      bg: '#EAF7EE',
      isNegative: false,
    },
    {
      id: '3',
      name: 'Medium',
      category: 'Subscriptions',
      date: 'Yesterday, 10:30 AM',
      amount: '-$99.00',
      icon: 'book-outline',
      color: '#1A1A1A',
      bg: '#F5F5F5',
      isNegative: true,
    },
    {
      id: '4',
      name: 'Mobile Recharge',
      category: 'Mobile Recharge',
      date: 'Jun 25, 03:15 PM',
      amount: '-$100.00',
      icon: 'phone-portrait-outline',
      color: '#3B82F6',
      bg: '#EDF5FF',
      isNegative: true,
    },
    {
      id: '5',
      name: 'Payment to Merchant',
      category: 'Payment',
      date: 'Jun 24, 11:20 AM',
      amount: '-$450.00',
      icon: 'card-outline',
      color: '#F59E0B',
      bg: '#FFFBEB',
      isNegative: true,
    },
    {
      id: '6',
      name: 'Cash Out',
      category: 'Cash Out',
      date: 'Jun 23, 04:45 PM',
      amount: '-$500.00',
      icon: 'arrow-up-outline',
      color: '#EF4444',
      bg: '#FFF0EE',
      isNegative: true,
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'cashIn') return !transaction.isNegative;
    if (selectedFilter === 'cashOut') return transaction.isNegative && transaction.category === 'Cash Out';
    if (selectedFilter === 'mobileRecharge') return transaction.category === 'Mobile Recharge';
    if (selectedFilter === 'payment') return transaction.category === 'Payment';
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Options */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScrollView}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Icon
              name={filter.icon as any}
              size={16}
              color={selectedFilter === filter.id ? '#fff' : '#666'}
              style={styles.filterIcon}
            />
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
        {filteredTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={[styles.transactionIcon, { backgroundColor: transaction.bg }]}>
              <Icon name={transaction.icon} size={22} color={transaction.color} />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text style={styles.transactionCategory}>{transaction.category}</Text>
            </View>
            <View style={styles.transactionRight}>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.isNegative ? styles.amountNegative : styles.amountPositive,
                ]}
              >
                {transaction.amount}
              </Text>
              <Text style={styles.transactionDate}>{transaction.date.split(',')[0]}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
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
  filterScrollView: {
    maxHeight: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterContainer: {
    paddingRight: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#37c667',
  },
  filterIcon: {
    marginRight: 5,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  transactionIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#999',
  },
  transactionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  amountNegative: {
    color: '#333',
  },
  amountPositive: {
    color: '#37c667',
  },
});

export default TransactionsScreen;
