import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateSavingsPlanScreen = () => {
  const navigation = useNavigation();
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [isAutoSave, setIsAutoSave] = useState(false);

  const targetAmounts = ['5,000', '10,000', '25,000', '50,000'];
  const monthlyAmounts = ['500', '1,000', '2,000', '5,000'];
  const durations = ['3 months', '6 months', '12 months', '24 months', '36 months'];

  const handleConfirm = () => {
    navigation.navigate('Success' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Savings Plan</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Goal Name */}
          <View style={styles.section}>
            <Text style={styles.label}>Goal Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Emergency Fund, Vacation 2027"
              placeholderTextColor="#b0b8c1"
              value={goalName}
              onChangeText={setGoalName}
            />
          </View>

          {/* Target Amount */}
          <View style={styles.section}>
            <Text style={styles.label}>Target Amount (BDT)</Text>
            <View style={styles.amountBox}>
              <Text style={styles.takaSign}>৳</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                placeholderTextColor="#b0b8c1"
                value={targetAmount}
                onChangeText={setTargetAmount}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.chipRow}>
              {targetAmounts.map((amt) => (
                <TouchableOpacity
                  key={amt}
                  style={[
                    styles.chip,
                    targetAmount === amt.replace(/,/g, '') && styles.chipActive,
                  ]}
                  onPress={() => setTargetAmount(amt.replace(/,/g, ''))}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.chipText,
                      targetAmount === amt.replace(/,/g, '') && styles.chipTextActive,
                    ]}
                  >
                    ৳{amt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Monthly Contribution */}
          <View style={styles.section}>
            <Text style={styles.label}>Monthly Contribution (BDT)</Text>
            <View style={styles.amountBox}>
              <Text style={styles.takaSign}>৳</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                placeholderTextColor="#b0b8c1"
                value={monthlyContribution}
                onChangeText={setMonthlyContribution}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.chipRow}>
              {monthlyAmounts.map((amt) => (
                <TouchableOpacity
                  key={amt}
                  style={[
                    styles.chip,
                    monthlyContribution === amt.replace(/,/g, '') && styles.chipActive,
                  ]}
                  onPress={() => setMonthlyContribution(amt.replace(/,/g, ''))}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.chipText,
                      monthlyContribution === amt.replace(/,/g, '') && styles.chipTextActive,
                    ]}
                  >
                    ৳{amt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Duration */}
          <View style={styles.section}>
            <Text style={styles.label}>Duration</Text>
            <View style={styles.durationGrid}>
              {durations.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[
                    styles.durationChip,
                    selectedDuration === d && styles.durationChipActive,
                  ]}
                  onPress={() => setSelectedDuration(d)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.durationText,
                      selectedDuration === d && styles.durationTextActive,
                    ]}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Interest Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconWrap}>
              <Icon name="trending-up" size={18} color="#6b7280" />
            </View>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoTitle}>Earn 5.5% interest p.a.</Text>
              <Text style={styles.infoDesc}>
                Interest is credited monthly to your savings balance. No lock-in — withdraw anytime.
              </Text>
            </View>
          </View>

          {/* Auto-Save Toggle */}
          <View style={styles.autoSaveCard}>
            <View style={styles.autoSaveLeft}>
              <Text style={styles.autoSaveTitle}>Auto-Save</Text>
              <Text style={styles.autoSaveDesc}>Deduct monthly amount automatically</Text>
            </View>
            <Switch
              value={isAutoSave}
              onValueChange={setIsAutoSave}
              trackColor={{ false: '#e5e7eb', true: '#9ca3af' }}
              thumbColor="#ffffff"
              ios_backgroundColor="#e5e7eb"
            />
          </View>
        </ScrollView>

        {/* Confirm Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
            <Text style={styles.confirmBtnText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },

  // Text Input (Goal Name)
  textInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 14,
    color: '#111827',
  },

  // Amount Box
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  takaSign: {
    fontSize: 18,
    color: '#6b7280',
    marginRight: 6,
    paddingVertical: 14,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 14,
  },

  // Chips (horizontal row)
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#f3f4f6',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  chipActive: {
    backgroundColor: '#374151',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  chipTextActive: {
    color: '#ffffff',
  },

  // Duration grid
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  durationChip: {
    backgroundColor: '#f3f4f6',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  durationChipActive: {
    backgroundColor: '#374151',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  durationTextActive: {
    color: '#ffffff',
  },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  infoIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 12,
    color: '#9ca3af',
    lineHeight: 18,
  },

  // Auto-Save Card
  autoSaveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  autoSaveLeft: {
    flex: 1,
    marginRight: 12,
  },
  autoSaveTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 3,
  },
  autoSaveDesc: {
    fontSize: 12,
    color: '#9ca3af',
  },

  // Footer + Confirm Button
  footer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 16 : 20,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  confirmBtn: {
    backgroundColor: '#374151',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

export default CreateSavingsPlanScreen;
