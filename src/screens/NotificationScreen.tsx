import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@tanstack/react-query';
import { apiService, Notification } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SkeletonCard = () => (
  <View style={styles.notificationCard}>
    <View style={[styles.notificationImage, styles.skeleton]} />
    <View style={styles.notificationContent}>
      <View style={[styles.skeletonTitle, styles.skeleton]} />
      <View style={[styles.skeletonDescription, styles.skeleton]} />
      <View style={[styles.skeletonDate, styles.skeleton]} />
    </View>
  </View>
);

const NotificationScreen = () => {
  const navigation = useNavigation();

  const notificationsMutation = useMutation({
    mutationFn: async () => {
      const token = await AsyncStorage.getItem('token');
      return apiService.getPublicNotifications(token || undefined);
    },
    onError: (error: any) => {
      console.error('Notifications API error:', JSON.stringify(error, null, 2));
    },
  });

  useEffect(() => {
    notificationsMutation.mutate();
  }, []);

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={styles.notificationCard}
      activeOpacity={0.8}
      onPress={() => console.log('Notification pressed:', item.id)}
    >
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.notificationImage} />
      ) : (
        <View style={styles.notificationImagePlaceholder}>
          <Icon name="notifications" size={24} color="#666" />
        </View>
      )}
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.notificationDate}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {notificationsMutation.isPending ? (
          <>
            {[1, 2, 3, 4, 5].map((item) => (
              <SkeletonCard key={item} />
            ))}
          </>
        ) : notificationsMutation.isError ? (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle" size={48} color="#FF3B30" />
            <Text style={styles.errorText}>Failed to load notifications</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => notificationsMutation.mutate()}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : notificationsMutation.data?.notifications &&
          notificationsMutation.data.notifications.length > 0 ? (
          <FlatList
            data={notificationsMutation.data.notifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="notifications-off" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        )}
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  notificationImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
  skeleton: {
    backgroundColor: '#e5e7eb',
  },
  skeletonTitle: {
    height: 20,
    width: '60%',
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonDescription: {
    height: 16,
    width: '80%',
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonDate: {
    height: 14,
    width: 40,
    borderRadius: 4,
  },
});

export default NotificationScreen;
