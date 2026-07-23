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

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  isUnread: boolean;
}

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Money Received',
      message: 'Nadia Islam sent you ৳5,000',
      time: '2 min ago',
      icon: 'arrow-down',
      iconColor: '#10b981',
      iconBg: '#ecfdf5',
      isUnread: true,
    },
    {
      id: '2',
      title: 'Bill Paid',
      message: 'DESCO ৳2,340 paid successfully',
      time: '1 hr ago',
      icon: 'flash',
      iconColor: '#f59e0b',
      iconBg: '#fffbeb',
      isUnread: true,
    },
    {
      id: '3',
      title: 'Special Offer!',
      message: 'Get 10% cashback on mobile recharge',
      time: '3 hr ago',
      icon: 'gift-outline',
      iconColor: '#8b5cf6',
      iconBg: '#ede9fe',
      isUnread: false,
    },
    {
      id: '4',
      title: 'Login Alert',
      message: 'New login from Dhaka, Bangladesh',
      time: 'Yesterday',
      icon: 'shield-outline',
      iconColor: '#6366f1',
      iconBg: '#ede9fe',
      isUnread: false,
    },
    {
      id: '5',
      title: 'Transfer Done',
      message: 'You sent ৳800 to Karim Hossain',
      time: '2 days ago',
      icon: 'arrow-up',
      iconColor: '#6b7280',
      iconBg: '#f3f4f6',
      isUnread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead} activeOpacity={0.7}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {notifications.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              index === notifications.length - 1 && { marginBottom: 0 },
            ]}
            activeOpacity={0.75}
            onPress={() =>
              setNotifications(prev =>
                prev.map(n => (n.id === item.id ? { ...n, isUnread: false } : n)),
              )
            }
          >
            {/* Icon */}
            <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
              <Icon name={item.icon as any} size={18} color={item.iconColor} />
            </View>

            {/* Content */}
            <View style={styles.cardContent}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardTime}>{item.time}</Text>
                  {item.isUnread && <View style={styles.unreadDot} />}
                </View>
              </View>
              <Text style={styles.cardMessage}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  markAllText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9ca3af',
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },

  // Notification card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTime: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '400',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#374151',
  },
  cardMessage: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '400',
    lineHeight: 18,
  },
});

export default NotificationsScreen;
