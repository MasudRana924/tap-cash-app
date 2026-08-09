import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useMessaging } from '../hooks/useMessaging';
import { RootStackParamList } from '../navigation/RootNavigator';
import {WebView} from 'react-native-webview';
const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { token, saveFcmToken, isLoading: authLoading } = useAuth();
  const { fcmToken, getTokens } = useMessaging();
  const [isLoading, setIsLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  useEffect(() => {
    const handleSaveFcmToken = async () => {
      if (!token) return;

      let activeToken = fcmToken;
      if (!activeToken) {
        activeToken = await getTokens();
      }

      if (activeToken) {
        console.log('HomeScreen: Syncing FCM token to backend =>', activeToken);
        saveFcmToken(activeToken);
      }
    };

    handleSaveFcmToken();
  }, [token, fcmToken, getTokens, saveFcmToken]);

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
  
    { id: '3', name: 'Cash Out', icon: 'wallet-outline', route: 'CashOut' },
    { id: '4', name: 'Payment', icon: 'qr-code-outline', route: 'Payment' },
    { id: '5', name: 'Bill', icon: 'flash-outline', route: 'PayBill' },
    { id: '6', name: 'Recharge', icon: 'phone-portrait-outline', route: 'MobileRecharge' },
    { id: '7', name: 'Savings', icon: 'save-outline', route: 'Savings' },
    { id: '8', name: 'Loan', icon: 'cash-outline', route: 'Loan' },
  ];
  const PAYMENT_URL =
  'https://sandbox.sslcommerz.com/EasyCheckOut/testcde648c8b9af9062e4b3a192e148f7c2c96';
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          /* Skeleton Loader */
          <LinearGradient
            colors={['#0F172A', '#F8623F']}
            start={{ x: 0.47, y: 0.00 }}
            end={{ x: 0.53, y: 1.00 }}
            style={styles.gradientSection}
          >
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
          </LinearGradient>
        ) : (
          <View>
            {/* Gradient Section with Header and Balance Card */}
            <LinearGradient
              colors={['#0F172A', '#F8623F']}
              start={{ x: 0.47, y: 0.00 }}
              end={{ x: 0.53, y: 1.00 }}
              style={styles.gradientSection}
            >
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

                {/* Action Buttons: Send Money & Add Money */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => navigation.navigate('SendMoney')}
                    activeOpacity={0.85}
                  >
                    <Icon name="arrow-up-outline" size={18} color="#FFFFFF" style={styles.btnIconTilted} />
                    <Text style={styles.actionBtnText}>Send Money</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => navigation.navigate('AddMoney')}
                    activeOpacity={0.85}
                  >
                    <Icon name="add-circle-outline" size={18} color="#0F172A" style={{ marginRight: 8 }} />
                    <Text style={styles.actionBtnText}>Add Money</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>

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

            <WebView
  source={{uri: 'https://www.google.com'}}
  style={{flex: 1}}
/>
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
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 100,
  },

  // Gradient Section
  gradientSection: {
  width: '100%',
  paddingHorizontal: 20,
  paddingTop: 16,
  paddingBottom: 24,

  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
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
    fontSize: 12,
    color: '#fff',
    fontWeight: '400',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
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
    // backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 0,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 12,
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
    backgroundColor: '#94A3B8',
    borderRadius: 6,
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F8623F',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  btnIconTilted: {
    marginRight: 8,
    transform: [{ rotate: '45deg' }],
  },
  skeleton: {
    backgroundColor: '#f6f6f6',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 14,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop:20
  },
  gridItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 10,
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
   webview: {
    flex: 1,
    height: 500,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F8623F',
  },
    loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
});

export default HomeScreen;


