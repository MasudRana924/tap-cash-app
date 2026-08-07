import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  isUnread: boolean;
}

const SkeletonCard = () => (
  <View style={styles.card}>
    <View style={[styles.iconWrap, styles.skeleton]} />
    <View style={styles.cardContent}>
      <View style={styles.cardTopRow}>
        <View style={[styles.skeletonTitle, styles.skeleton]} />
        <View style={[styles.skeletonTime, styles.skeleton]} />
      </View>
      <View style={[styles.skeletonMessage, styles.skeleton]} />
    </View>
  </View>
);

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const notificationsMutation = useMutation({
    mutationFn: async () => {
      const token = await AsyncStorage.getItem('token');
      return apiService.getPublicNotifications(token || undefined);
    },
    onSuccess: (data) => {
      const mappedNotifications: NotificationItem[] = data.notifications.map((notif) => ({
        id: notif.id.toString(),
        title: notif.title,
        message: notif.description,
        time: new Date(notif.created_at).toLocaleString(),
        icon: 'notifications',
        iconColor: '#6366f1',
        iconBg: '#ede9fe',
        isUnread: false,
      }));
      setNotifications(mappedNotifications);
    },
  });

  useEffect(() => {
    notificationsMutation.mutate();
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="chevron-back-circle-outline" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead} activeOpacity={0.7}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {notificationsMutation.isPending ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <SkeletonCard key={item} />
          ))}
        </ScrollView>
      ) : notificationsMutation.isError ? (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={48} color="#ef4444" />
          <Text style={styles.errorText}>Failed to load notifications</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => notificationsMutation.mutate()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="notifications-off" size={64} color="#d1d5db" />
          <Text style={styles.emptyText}>No notifications</Text>
        </View>
      ) : (
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
      )}
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  markAllText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9ca3af',
  },

  // Loading, Error, Empty states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeleton: {
    backgroundColor: '#e5e7eb',
  },
  skeletonTitle: {
    height: 16,
    width: '60%',
    borderRadius: 4,
  },
  skeletonTime: {
    height: 12,
    width: 50,
    borderRadius: 4,
  },
  skeletonMessage: {
    height: 14,
    width: '80%',
    borderRadius: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 12,
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
    color: '#11182e',
    fontWeight: '400',
    lineHeight: 18,
  },
});

export default NotificationsScreen;
