import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Clipboard,
  ToastAndroid,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface TransactionDetailParams {
  id: string;
  name: string;
  amount: string;
  isPositive: boolean;
  category: string;
  date: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  type?: string;
  note?: string;
  transactionId?: string;
  dateTime?: string;
}

type RouteParams = {
  TransactionDetails: TransactionDetailParams;
};

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
  if (Platform.OS === 'android') {
    ToastAndroid.show('Copied!', ToastAndroid.SHORT);
  } else {
    Alert.alert('Copied', text);
  }
};

const TransactionDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'TransactionDetails'>>();

  // Use passed params or fallback to defaults
  const tx: TransactionDetailParams = route.params ?? {
    id: '1',
    name: 'Nadia Islam',
    amount: '+৳5,000',
    isPositive: true,
    category: 'Transfer',
    date: 'Today',
    icon: 'arrow-down',
    iconColor: '#10b981',
    iconBg: '#ecfdf5',
    type: 'Money Transfer',
    note: 'For groceries',
    transactionId: 'SWP2407210042',
    dateTime: 'Jul 21, 2026 • 11:10 AM',
  };

  const txId = tx.transactionId ?? 'SWP2407210042';
  const dateTime = tx.dateTime ?? 'Jul 21, 2026 • 11:10 AM';
  const type = tx.type ?? tx.category;
  const note = tx.note ?? '—';
  const label = tx.isPositive ? 'Received from' : 'Sent to';
  const initials = getInitials(tx.name);

  const details = [
    { label: 'Transaction ID', value: txId, copyable: true },
    { label: 'Date & Time', value: dateTime, copyable: false },
    { label: 'Type', value: type, copyable: false },
    { label: 'Note', value: note, copyable: false },
    { label: 'Fee', value: '৳0.00', copyable: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Icon name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Icon name="share-social-outline" size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Summary Card */}
        <View style={styles.summaryCard}>
          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          {/* Label */}
          <Text style={styles.receivedLabel}>{label}</Text>
          <Text style={styles.senderName}>{tx.name}</Text>

          {/* Amount */}
          <Text style={[styles.amount, tx.isPositive ? styles.amountPositive : styles.amountNegative]}>
            {tx.amount}
          </Text>

          {/* Status Badge */}
          <View style={styles.statusBadge}>
            <Icon name="checkmark-circle" size={14} color="#10b981" style={{ marginRight: 4 }} />
            <Text style={styles.statusText}>Completed</Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          {details.map((row, index) => (
            <View
              key={row.label}
              style={[
                styles.detailRow,
                index === details.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.detailLabel}>{row.label}</Text>
              <View style={styles.detailValueRow}>
                <Text style={styles.detailValue}>{row.value}</Text>
                {row.copyable && (
                  <TouchableOpacity
                    onPress={() => copyToClipboard(row.value)}
                    style={styles.copyBtn}
                    activeOpacity={0.6}
                  >
                    <Icon name="copy-outline" size={15} color="#9ca3af" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
            <Icon name="download-outline" size={18} color="#374151" style={{ marginRight: 8 }} />
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.repeatBtn} activeOpacity={0.85}>
            <Icon name="refresh-outline" size={18} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.repeatText}>Repeat</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 14,
  },
  headerBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Summary card
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  receivedLabel: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '400',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  amount: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  amountPositive: {
    color: '#10b981',
  },
  amountNegative: {
    color: '#111827',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981',
  },

  // Details card
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    paddingHorizontal: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  detailLabel: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '400',
    flex: 1,
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'flex-end',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'right',
  },
  copyBtn: {
    marginLeft: 8,
    padding: 2,
  },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  downloadBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    paddingVertical: 16,
  },
  downloadText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  repeatBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
    borderRadius: 14,
    paddingVertical: 16,
  },
  repeatText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default TransactionDetailsScreen;
