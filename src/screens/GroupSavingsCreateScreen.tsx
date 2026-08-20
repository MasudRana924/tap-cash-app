import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiService, CreateGroupSavingsRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Member {
  phone: string;
  contribution_amount: string;
}

const GroupSavingsCreateScreen = () => {
  const navigation = useNavigation();
  const { token } = useAuth();

  const [name, setName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberContribution, setMemberContribution] = useState('');
  const [members, setMembers] = useState<Member[]>([]);

  const createMutation = useMutation({
    mutationFn: async (data: CreateGroupSavingsRequest) => {
      return apiService.createGroupSavings(token || '', data);
    },
    onSuccess: (data) => {
      navigation.navigate('Success' as any, {
        amount: data.group_savings.name,
        receiverPhone: '',
        receiverName: 'Group Savings Created',
        transactionType: 'GROUP_SAVINGS',
      });
    },
    onError: (error: any) => {
      Alert.alert('Error', error.errorMessage || error.error || 'Failed to create group savings');
    },
  });

  const addMember = () => {
    if (!memberPhone || !memberContribution) {
      Alert.alert('Error', 'Please enter phone and contribution amount');
      return;
    }

    if (memberPhone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    const newMember: Member = {
      phone: memberPhone,
      contribution_amount: memberContribution,
    };

    setMembers([...members, newMember]);
    setMemberPhone('');
    setMemberContribution('');
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!name || !goalAmount || !duration) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (members.length === 0) {
      Alert.alert('Error', 'Please add at least one member');
      return;
    }

    const requestData: CreateGroupSavingsRequest = {
      name,
      goal_amount: parseFloat(goalAmount),
      duration: parseInt(duration),
      frequency,
      members: members.map((m) => ({
        phone: '+880' + m.phone,
        contribution_amount: parseFloat(m.contribution_amount),
      })),
    };

    createMutation.mutate(requestData);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Group Savings</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Group Name */}
          <View style={styles.section}>
            <Text style={styles.label}>Group Savings Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter group name"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Goal Amount */}
          <View style={styles.section}>
            <Text style={styles.label}>Goal Amount (৳)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter goal amount"
              placeholderTextColor="#9ca3af"
              value={goalAmount}
              onChangeText={setGoalAmount}
              keyboardType="numeric"
            />
          </View>

          {/* Duration */}
          <View style={styles.section}>
            <Text style={styles.label}>Duration (days)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter duration in days"
              placeholderTextColor="#9ca3af"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
            />
          </View>

          {/* Frequency */}
          <View style={styles.section}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencyContainer}>
              {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                <TouchableOpacity
                  key={freq}
                  style={[
                    styles.frequencyOption,
                    frequency === freq && styles.frequencyOptionActive,
                  ]}
                  onPress={() => setFrequency(freq)}
                >
                  <Text
                    style={[
                      styles.frequencyText,
                      frequency === freq && styles.frequencyTextActive,
                    ]}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Add Member */}
          <View style={styles.section}>
            <Text style={styles.label}>Add Members</Text>
            <View style={styles.memberInputContainer}>
              <View style={styles.phoneInputWrapper}>
                <Text style={styles.countryCode}>+880</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="1XXX-XXXXXX"
                  placeholderTextColor="#9ca3af"
                  value={memberPhone}
                  onChangeText={setMemberPhone}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
              <TextInput
                style={styles.contributionInput}
                placeholder="Amount"
                placeholderTextColor="#9ca3af"
                value={memberContribution}
                onChangeText={setMemberContribution}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.addButton} onPress={addMember}>
                <Icon name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Members List */}
          {members.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Members ({members.length})</Text>
              {members.map((member, index) => (
                <View key={index} style={styles.memberItem}>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberPhone}>+880{member.phone}</Text>
                    <Text style={styles.memberContribution}>
                      ৳{member.contribution_amount}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => removeMember(index)}>
                    <Icon name="close-circle" size={24} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Create Button */}
          <TouchableOpacity
            style={[styles.createButton, createMutation.isPending && styles.createButtonDisabled]}
            onPress={handleCreate}
            disabled={createMutation.isPending}
          >
            <Text style={styles.createButtonText}>
              {createMutation.isPending ? 'Creating...' : 'Create Group Savings'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  frequencyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  frequencyOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  frequencyOptionActive: {
    backgroundColor: '#F8623F',
    borderColor: '#F8623F',
  },
  frequencyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  frequencyTextActive: {
    color: '#fff',
  },
  memberInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  phoneInputWrapper: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 14,
  },
  contributionInput: {
    width: 80,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F8623F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberPhone: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  memberContribution: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ab39c',
  },
  createButton: {
    backgroundColor: '#F8623F',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#c5c9d1',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default GroupSavingsCreateScreen;
