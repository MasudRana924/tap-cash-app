import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../navigation/RootNavigator';

const SuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Success'>>();
  const { amount, receiverPhone, receiverName, transactionType } = route.params;

  const isAddMoney = transactionType === 'ADD_MONEY';

  const handleDone = () => {
    navigation.navigate('MainHome' as never);
  };

  const handleShare = () => {
    // Placeholder for share functionality
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.successIconContainer}>
            <View style={[styles.successIconBg, isAddMoney ? styles.successIconBgGreen : styles.successIconBgRed]}>
              <Icon 
                name={isAddMoney ? 'add-circle' : 'arrow-up-circle'} 
                size={48} 
                color={isAddMoney ? '#0ab39c' : '#F8623F'} 
              />
            </View>
          </View>

          {/* Success Message */}
          <Text style={[styles.successTitle, isAddMoney && styles.successTitleGreen]}>
            {isAddMoney ? 'Add Money Successful!' : 'Transaction Successful!'}
          </Text>
          <Text style={styles.successMessage}>
            Your transaction has been processed securely
          </Text>

          {/* Transaction Details */}
          {receiverPhone ? (
            <View style={styles.transactionDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount Sent</Text>
                <Text style={styles.detailValue}>৳{amount}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sent To</Text>
                <Text style={styles.detailValue}>{receiverName || 'Unknown'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone Number</Text>
                <Text style={styles.detailValue}>{receiverPhone}</Text>
              </View>
              <View style={[styles.detailRow, { marginBottom: 0 }]}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>{new Date().toLocaleDateString()} • Now</Text>
              </View>
            </View>
          ) : (
            <View style={styles.transactionDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={[styles.detailValue, isAddMoney && styles.detailValueGreen]}>৳{amount}</Text>
              </View>
              <View style={[styles.detailRow, { marginBottom: 0 }]}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>{new Date().toLocaleDateString()} • Now</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Icon name="share-social-outline" size={20} color="#4a5568" style={styles.shareIcon} />
            <Text style={styles.shareButtonText}>Share Receipt</Text>
          </TouchableOpacity>

          {/* Home Button */}
          <TouchableOpacity style={styles.homeButton} onPress={handleDone}>
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    marginTop: 60,
  },
  successIconContainer: {
    marginBottom: 30,
  },
  successIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d4f8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconBgGreen: {
    backgroundColor: '#d4f8e8',
  },
  successIconBgRed: {
    backgroundColor: '#ffe8e0',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  successTitleGreen: {
    color: '#0ab39c',
  },
  successMessage: {
    fontSize: 15,
    color: '#11182e',
    textAlign: 'center',
    marginBottom: 40,
  },
  transactionDetails: {
    width: '100%',
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
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  detailValueGreen: {
    color: '#0ab39c',
  },
  detailValueMono: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#f4f5f7',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  shareIcon: {
    marginRight: 8,
  },
  shareButtonText: {
    color: '#4a5568',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: '#11182e',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SuccessScreen;
