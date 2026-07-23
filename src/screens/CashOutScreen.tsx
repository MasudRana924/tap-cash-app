import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Agent {
  id: string;
  name: string;
  location: string;
  distance: string;
}

const CashOutScreen = () => {
  const navigation = useNavigation();
  const [agentCode, setAgentCode] = useState('');
  const [agents, setAgents] = useState<Agent[]>([]);

  const nearbyAgents: Agent[] = [
    { id: '1', name: 'Bkash Agent - Mirpur', location: 'Mirpur 10, Dhaka', distance: '0.5 km' },
    { id: '2', name: 'Nagad Agent - Pallabi', location: 'Pallabi, Dhaka', distance: '1.2 km' },
    { id: '3', name: 'Rocket Agent - Kazipara', location: 'Kazipara, Dhaka', distance: '0.8 km' },
    { id: '4', name: 'TapCash Agent - Agargaon', location: 'Agargaon, Dhaka', distance: '1.5 km' },
  ];

  const handleAgentSubmit = () => {
    if (agentCode.length > 0) {
      navigation.navigate('CashOutAmount' as never);
    }
  };

  const handleAgentSelect = (agent: Agent) => {
    setAgentCode(agent.id);
    handleAgentSubmit();
  };

  const getAvatarColor = (letter: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderAgent = ({ item }: { item: Agent }) => (
    <TouchableOpacity style={styles.agentItem} onPress={() => handleAgentSelect(item)}>
      <View style={styles.agentInfo}>
        <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.name[0]) }]}>
          <Icon name="storefront-outline" size={20} color="#fff" />
        </View>
        <View style={styles.agentDetails}>
          <Text style={styles.agentName}>{item.name}</Text>
          <Text style={styles.agentLocation}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.distanceContainer}>
        <Text style={styles.distance}>{item.distance}</Text>
        <Icon name="chevron-forward" size={20} color="#999" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Cash Out</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Agent Code Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Enter Agent Number</Text>
              <View style={styles.phoneContainer}>
                <View style={styles.countryCodeContainer}>
                  <Text style={styles.flag}>🇧🇩</Text>
                  <Text style={styles.countryCode}>+880</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="1XXX-XXXXXX"
                  placeholderTextColor="#999"
                  value={agentCode}
                  onChangeText={setAgentCode}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Nearby Agents */}
            <View style={styles.agentsSection}>
              <Text style={styles.sectionTitle}>Nearby Agents</Text>
              <FlatList
                data={nearbyAgents}
                renderItem={renderAgent}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          </ScrollView>

          {/* Fixed Bottom Button */}
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={[styles.continueButton, agentCode.length === 0 && styles.continueButtonDisabled]}
              onPress={handleAgentSubmit}
              disabled={agentCode.length === 0}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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
  inputSection: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRightWidth: 0,
    width: 95,
    height: 58,
    marginRight: 8,
  },
  flag: {
    fontSize: 16,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    height: 58,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    fontSize: 16,
    color: '#333',
  },
  agentsSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  agentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  agentLocation: {
    fontSize: 13,
    color: '#666',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  distance: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#37c667',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

export default CashOutScreen;
