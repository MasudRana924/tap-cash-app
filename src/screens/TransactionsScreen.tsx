import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TransactionDetailParams } from './TransactionDetailsScreen';

type FilterId = 'all' | 'sent' | 'received' | 'bill' | 'recharge';

interface Transaction extends TransactionDetailParams {
  filter: FilterId[];
}

const transactions: Transaction[] = [
  {
    id: '1',
    name: 'Arif Rahman',
    category: 'Transfer',
    date: 'Today',
    amount: '-৳1,500',
    icon: 'arrow-up',
    iconColor: '#6b7280',
    iconBg: '#f3f4f6',
    isPositive: false,
    filter: ['all', 'sent'],
    transactionId: 'SWP2407210001',
    dateTime: 'Jul 21, 2026 • 2:34 PM',
    type: 'Money Transfer',
    note: '—',
  },
  {
    id: '2',
    name: 'Nadia Islam',
    category: 'Transfer',
    date: 'Today',
    amount: '+৳5,000',
    icon: 'arrow-down',
    iconColor: '#10b981',
    iconBg: '#ecfdf5',
    isPositive: true,
    filter: ['all', 'received'],
    transactionId: 'SWP2407210042',
    dateTime: 'Jul 21, 2026 • 11:10 AM',
    type: 'Money Transfer',
    note: 'For groceries',
  },
  {
    id: '3',
    name: 'DESCO Bill',
    category: 'Bill Payment',
    date: 'Yesterday',
    amount: '-৳2,340',
    icon: 'flash',
    iconColor: '#f59e0b',
    iconBg: '#fffbeb',
    isPositive: false,
    filter: ['all', 'bill'],
    transactionId: 'SWP2407200018',
    dateTime: 'Jul 20, 2026 • 5:00 PM',
    type: 'Bill Payment',
    note: 'Electricity bill',
  },
  {
    id: '4',
    name: 'Grameenphone',
    category: 'Mobile Recharge',
    date: 'Yesterday',
    amount: '-৳99',
    icon: 'phone-portrait-outline',
    iconColor: '#6366f1',
    iconBg: '#ede9fe',
    isPositive: false,
    filter: ['all', 'recharge'],
    transactionId: 'SWP2407200031',
    dateTime: 'Jul 20, 2026 • 9:22 AM',
    type: 'Mobile Recharge',
    note: '—',
  },
  {
    id: '5',
    name: 'Salary',
    category: 'Add Money',
    date: 'Jul 1',
    amount: '+৳35,000',
    icon: 'arrow-down',
    iconColor: '#10b981',
    iconBg: '#ecfdf5',
    isPositive: true,
    filter: ['all', 'received'],
    transactionId: 'SWP2407010055',
    dateTime: 'Jul 1, 2026 • 9:00 AM',
    type: 'Add Money',
    note: 'Monthly salary',
  },
  {
    id: '6',
    name: 'Karim Hossain',
    category: 'Transfer',
    date: 'Jun 30',
    amount: '-৳800',
    icon: 'arrow-up',
    iconColor: '#6b7280',
    iconBg: '#f3f4f6',
    isPositive: false,
    filter: ['all', 'sent'],
    transactionId: 'SWP2406300088',
    dateTime: 'Jun 30, 2026 • 4:15 PM',
    type: 'Money Transfer',
    note: '—',
  },
];

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'sent', label: 'Sent' },
  { id: 'received', label: 'Received' },
  { id: 'bill', label: 'Bill' },
  { id: 'recharge', label: 'Recharge' },
];

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const filtered = transactions.filter(t => t.filter.includes(activeFilter));

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.filterIconBtn} activeOpacity={0.7}>
          <Icon name="options-outline" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map(f => (
          <TouchableOpacity
            key={f.id}
            onPress={() => setActiveFilter(f.id)}
            style={[styles.filterChip, activeFilter === f.id && styles.filterChipActive]}
            activeOpacity={0.75}
          >
            <Text style={[styles.filterLabel, activeFilter === f.id && styles.filterLabelActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardLabel}>Total In</Text>
            <Text style={[styles.summaryAmount, styles.amountIn]}>+৳40,000</Text>
            <Text style={styles.summaryPeriod}>This month</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardLabel}>Total Out</Text>
            <Text style={[styles.summaryAmount, styles.amountOut]}>-৳8,519</Text>
            <Text style={styles.summaryPeriod}>This month</Text>
          </View>
        </View>

        {/* Transaction List */}
        <View style={styles.listContainer}>
          {filtered.map((tx, index) => (
            <TouchableOpacity
              key={tx.id}
              style={[styles.txRow, index === filtered.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => navigation.navigate('TransactionDetails' as never, tx as never)}
              activeOpacity={0.7}
            >
              {/* Icon */}
              <View style={[styles.txIconWrap, { backgroundColor: tx.iconBg }]}>
                <Icon name={tx.icon as any} size={18} color={tx.iconColor} />
              </View>

              {/* Name + Category */}
              <View style={styles.txMid}>
                <Text style={styles.txName}>{tx.name}</Text>
                <Text style={styles.txCategory}>{tx.category}</Text>
              </View>

              {/* Amount + Date */}
              <View style={styles.txRight}>
                <Text style={[styles.txAmount, tx.isPositive ? styles.txPositive : styles.txNegative]}>
                  {tx.amount}
                </Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
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
    backgroundColor: '#ffffff',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.3,
  },
  filterIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Filter chips
  filterScroll: {
    maxHeight: 50,
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingBottom: 4,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 50,
    backgroundColor: '#f3f4f6',
  },
  filterChipActive: {
    backgroundColor: '#374151',
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterLabelActive: {
    color: '#ffffff',
  },

  // Scroll body
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
  },

  // Summary cards
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
  },
  summaryCardLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
    marginBottom: 6,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  amountIn: {
    color: '#10b981',
  },
  amountOut: {
    color: '#111827',
  },
  summaryPeriod: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '500',
  },

  // Transaction list
  listContainer: {
    backgroundColor: '#ffffff',
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  txIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  txMid: {
    flex: 1,
  },
  txName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 3,
  },
  txCategory: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '400',
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  txPositive: {
    color: '#10b981',
  },
  txNegative: {
    color: '#111827',
  },
  txDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '400',
  },
});

export default TransactionsScreen;
