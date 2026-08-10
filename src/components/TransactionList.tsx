import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiService, Transaction } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface TransactionListProps {
  limit?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({ limit }) => {
  const { token } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['transactionHistory'],
    queryFn: () => apiService.getTransactionHistory(token || ''),
    enabled: !!token,
  });

  const transactions = limit ? data?.transactions?.slice(0, limit) : data?.transactions;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getTransactionIcon = (transaction: Transaction) => {
    if (transaction.type === 'received') {
      return {
        name: 'arrow-down-circle',
        color: '#0ab39c',
        bgColor: '#d4f8e8',
      };
    }
    if (transaction.transaction_type === 'ADD_MONEY') {
      return {
        name: 'add-circle',
        color: '#F8623F',
        bgColor: '#ffe8e0',
      };
    }
    return {
      name: 'arrow-up-circle',
      color: '#F8623F',
      bgColor: '#ffe8e0',
    };
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'completed':
        return '#0ab39c';
      case 'pending':
        return '#f59e0b';
      case 'failed':
        return '#ef4444';
      default:
        return '#9ca3af';
    }
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const icon = getTransactionIcon(item);
    const name = item.type === 'received' 
      ? item.sender_name || item.sender_phone || 'Unknown'
      : item.receiver_name || item.receiver_phone || 'Unknown';
    const phone = item.type === 'received' ? item.sender_phone : item.receiver_phone;

    return (
      <TouchableOpacity style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: icon.bgColor }]}>
          <Icon name={icon.name as any} size={24} color={icon.color} />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>{name}</Text>
          <Text style={styles.transactionPhone}>{phone}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[
            styles.amount,
            item.type === 'received' && styles.amountReceived
          ]}>
            {item.type === 'received' ? '+' : '-'}৳{parseFloat(item.amount).toLocaleString()}
          </Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(item.status) }
            ]} />
            <Text style={[
              styles.statusText,
              { color: getStatusColor(item.status) }
            ]}>
              {item.status}
            </Text>
          </View>
          <Text style={styles.transactionTime}>{formatDate(item.created_at)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <View key={item} style={styles.transactionItem}>
          <View style={[styles.iconContainer, styles.skeleton]} />
          <View style={styles.transactionDetails}>
            <View style={[styles.skeletonText, styles.skeletonName]} />
            <View style={[styles.skeletonText, styles.skeletonPhone]} />
          </View>
          <View style={styles.amountContainer}>
            <View style={[styles.skeletonText, styles.skeletonAmount]} />
            <View style={[styles.skeletonText, styles.skeletonStatus]} />
          </View>
        </View>
      ))}
    </>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load transactions</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {renderSkeleton()}
      </View>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.emptyContainer}>
          <Icon name="receipt-outline" size={48} color="#d1d5db" />
          <Text style={styles.emptyText}>No transactions yet</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '99%',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fff',
    padding: 1,
    marginBottom: 12,
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: '#f3f4f6',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  transactionPhone: {
    fontSize: 13,
    color: '#6b7280',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  amountReceived: {
    color: '#0ab39c',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  transactionTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  skeleton: {
    backgroundColor: '#e5e7eb',
  },
  skeletonText: {
    height: 14,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  skeletonName: {
    width: 120,
    marginBottom: 8,
  },
  skeletonPhone: {
    width: 80,
  },
  skeletonAmount: {
    width: 60,
    marginBottom: 8,
  },
  skeletonStatus: {
    width: 40,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 12,
  },
});

export default TransactionList;
