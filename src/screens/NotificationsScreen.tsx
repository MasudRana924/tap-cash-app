import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Notification {
  id: string;
  type: 'offer' | 'notice' | 'announcement';
  title: string;
  message: string;
  date: string;
  icon: string;
  color: string;
}

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'offer',
      title: 'Special Offer!',
      message: 'Get 10% cashback on your next transaction. Limited time offer!',
      date: 'Today, 10:30 AM',
      icon: 'gift-outline',
      color: '#FF6B6B',
    },
    {
      id: '2',
      type: 'notice',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on June 30, 2026 from 2 AM to 4 AM.',
      date: 'Yesterday, 05:00 PM',
      icon: 'information-circle-outline',
      color: '#4ECDC4',
    },
    {
      id: '3',
      type: 'announcement',
      title: 'New Feature',
      message: 'We have added new security features to protect your account.',
      date: 'Jun 27, 11:00 AM',
      icon: 'megaphone-outline',
      color: '#45B7D1',
    },
    {
      id: '4',
      type: 'offer',
      title: 'Referral Bonus',
      message: 'Invite friends and earn $5 for each successful signup!',
      date: 'Jun 25, 03:00 PM',
      icon: 'people-outline',
      color: '#96CEB4',
    },
    {
      id: '5',
      type: 'notice',
      title: 'Payment Reminder',
      message: 'Your utility bill payment is due in 3 days.',
      date: 'Jun 24, 09:00 AM',
      icon: 'time-outline',
      color: '#FFEAA7',
    },
  ];

  const renderNotification = (notification: Notification) => (
    <View key={notification.id} style={styles.notificationItem}>
      <View style={[styles.notificationIcon, { backgroundColor: notification.color }]}>
        <Icon name={notification.icon as any} size={24} color="#fff" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationDate}>{notification.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList}>
        {notifications.map(renderNotification)}
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
  notificationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationsScreen;
