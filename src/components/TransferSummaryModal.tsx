import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TransferSummaryModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recipientName: string;
  recipientPhone: string;
  recipientInitials: string;
  amount: string;
  balance: string;
}

const TransferSummaryModal: React.FC<TransferSummaryModalProps> = ({
  visible,
  onClose,
  onConfirm,
  recipientName,
  recipientPhone,
  recipientInitials,
  amount,
  balance,
}) => {
  const numericAmount = parseFloat(amount) || 0;
  const transactionFee = 0.0;
  const totalDeduction = numericAmount + transactionFee;

  // Parse balance (remove ৳ and commas)
  const numericBalance = parseFloat(balance.replace(/[৳,]/g, '')) || 0;
  const balanceAfter = numericBalance - totalDeduction;

  const formatAmount = (val: number) => `৳${val.toLocaleString('en-BD')}`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContent}
          onPress={() => {}}
        >
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Transfer Summary</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={20} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Recipient Card */}
          <View style={styles.recipientCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{recipientInitials}</Text>
            </View>
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientName}>{recipientName}</Text>
              <Text style={styles.recipientPhone}>{recipientPhone}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Icon name="checkmark-circle" size={22} color="#22c55e" />
            </View>
          </View>

          {/* Summary Rows */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount</Text>
              <Text style={styles.summaryValue}>{formatAmount(numericAmount)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Transaction Fee</Text>
              <Text style={styles.summaryValue}>৳{transactionFee.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Deduction</Text>
              <Text style={styles.summaryValueBold}>{formatAmount(totalDeduction)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Balance After</Text>
              <Text style={styles.summaryValue}>{formatAmount(balanceAfter)}</Text>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} activeOpacity={0.85}>
            <Text style={styles.confirmButtonText}>Confirm Transfer</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingBottom: 36,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 16,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 0.2,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#797c83',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  recipientPhone: {
    fontSize: 13,
    color: '#888',
  },
  verifiedBadge: {
    marginLeft: 8,
  },
  summaryContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  summaryValueBold: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#efefef',
    marginHorizontal: -2,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  warningIcon: {
    marginRight: 8,
    marginTop: 1,
  },
  warningText: {
    flex: 1,
    fontSize: 12.5,
    color: '#92400e',
    lineHeight: 18,
  },
  confirmButton: {
    backgroundColor: '#4b5563',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#4b5563',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default TransferSummaryModal;
