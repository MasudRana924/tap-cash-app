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
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const SendMoneyScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestContactPermission();
  }, []);

  const requestContactPermission = async () => {
    try {
      console.log('Requesting contact permission...');
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS!,
          {
            title: 'Contact Permission',
            message: 'This app needs access to your contacts to send money.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('Permission result:', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
          loadContacts();
        } else {
          Alert.alert('Permission denied', 'Cannot access contacts without permission');
        }
      } else {
        console.log('Not Android platform');
      }
    } catch (err) {
      console.warn('Permission error:', err);
    }
  };

  const loadContacts = () => {
    // Mock contacts for now - in production, use react-native-contacts
    const mockContacts: Contact[] = [
      { id: '1', name: 'John Doe', phone: '+8801712345678' },
      { id: '2', name: 'Jane Smith', phone: '+8801812345678' },
      { id: '3', name: 'Mike Johnson', phone: '+8801912345678' },
      { id: '4', name: 'Sarah Williams', phone: '+8801612345678' },
      { id: '5', name: 'David Brown', phone: '+8801512345678' },
    ];
    setContacts(mockContacts);
  };

  const quickSendContacts: Contact[] = [
    { id: '1', name: 'John Doe', phone: '+8801712345678' },
    { id: '2', name: 'Jane Smith', phone: '+8801812345678' },
    { id: '3', name: 'Mike Johnson', phone: '+8801912345678' },
    { id: '4', name: 'Sarah Williams', phone: '+8801612345678' },
  ];

  const handlePhoneSubmit = () => {
    if (phoneNumber.length > 0) {
      navigation.navigate('Amount' as never);
    }
  };

  const getAvatarColor = (letter: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.name[0]) }]}>
          <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
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
            <Text style={styles.headerTitle}>Send Money</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Phone Input */}
          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter phone number"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          {/* Quick Send */}
          <View style={styles.quickSendSection}>
            <Text style={styles.quickSendTitle}>Quick Send</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickSendContainer}
            >
              {quickSendContacts.map((contact) => (
                <TouchableOpacity
                  key={contact.id}
                  style={styles.quickSendItem}
                  onPress={() => {
                    setPhoneNumber(contact.phone);
                    handlePhoneSubmit();
                  }}
                >
                  <View style={[styles.quickSendAvatar, { backgroundColor: getAvatarColor(contact.name[0]) }]}>
                    <Text style={styles.quickSendAvatarText}>{contact.name[0].toUpperCase()}</Text>
                  </View>
                  <Text style={styles.quickSendName} numberOfLines={1}>
                    {contact.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Contacts List */}
          {hasPermission && contacts.length > 0 && (
            <View style={styles.contactsSection}>
              <Text style={styles.contactsTitle}>Contacts</Text>
              <FlatList
                data={contacts}
                renderItem={renderContact}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          )}
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.continueButton, phoneNumber.length === 0 && styles.continueButtonDisabled]}
            onPress={handlePhoneSubmit}
            disabled={phoneNumber.length === 0}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: 100,
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
  phoneContainer: {
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#37c667',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  quickSendSection: {
    marginBottom: 20,
  },
  quickSendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  quickSendContainer: {
    paddingRight: 10,
  },
  quickSendItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  quickSendAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickSendAvatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  quickSendName: {
    fontSize: 12,
    color: '#666',
    maxWidth: 60,
    textAlign: 'center',
  },
  phoneInput: {
    height: 58,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    fontSize: 16,
    color: '#333',
  },
  contactsSection: {
    marginTop: 20,
  },
  contactsTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginBottom: 15,
  },
  contactItem: {
    height: 58,
    backgroundColor: '#fff',
    // paddingHorizontal: 15,
    justifyContent: 'center',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  avatarText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default SendMoneyScreen;
