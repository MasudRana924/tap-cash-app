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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import { useMutation } from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/RootNavigator';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const SendMoneyScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [receiverInfo, setReceiverInfo] = useState<any>(null);

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
        const permission = await Contacts.requestPermission();
        if (permission === 'authorized') {
          setHasPermission(true);
          loadContacts();
        }
      }
    } catch (err) {
      console.warn('Permission error:', err);
    }
  };

  const loadContacts = () => {
    Contacts.getAll()
      .then((contactsData: any[]) => {
        const formattedContacts: Contact[] = contactsData
          .filter((c: any) => c.phoneNumbers && c.phoneNumbers.length > 0)
          .map((c: any) => ({
            id: c.recordID,
            name: c.displayName || `${c.givenName} ${c.familyName}`.trim() || 'Unknown',
            phone: c.phoneNumbers[0].number,
          }));
        setContacts(formattedContacts);
      })
      .catch((e: any) => {
        console.warn('Error fetching contacts:', e);
        setContacts([]);
      });
  };

  const quickSendContacts = contacts.slice(0, 5);

  const checkReceiverMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error('No token found');
      return apiService.checkReceiver(token, '+880' + phoneNumber);
    },
    onSuccess: (data) => {
      setErrorMessage('');
      setReceiverInfo(data.receiver);
      (navigation as any).navigate('Amount', {
        receiver: data.receiver,
        phone: '+880' + phoneNumber,
      });
    },
    onError: (error: any) => {
      setErrorMessage(error.error || error.errorMessage || 'Receiver not found');
      setReceiverInfo(null);
    },
  });

  const handlePhoneSubmit = () => {
    setErrorMessage('');
    if (phoneNumber.length > 0) {
      checkReceiverMutation.mutate();
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
                <Icon name="chevron-back-circle-outline" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Send Money</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Phone Input with Bangladesh Flag */}
            <View style={styles.phoneContainer}>
              <View style={styles.countryCodeContainer}>
                <Text style={styles.flag}>🇧🇩</Text>
                <Text style={styles.countryCode}>+880</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="1XXX-XXXXXX"
                placeholderTextColor="#999"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            {/* Receiver Info */}
            {/* {receiverInfo && (
              <View style={styles.receiverInfo}>
                {receiverInfo.profile_image ? (
                  <Image source={{ uri: receiverInfo.profile_image }} style={styles.receiverAvatar} />
                ) : (
                  <View style={[styles.receiverAvatar, styles.receiverAvatarPlaceholder]}>
                    <Text style={styles.receiverAvatarText}>
                      {receiverInfo.name ? receiverInfo.name[0].toUpperCase() : 'U'}
                    </Text>
                  </View>
                )}
                <View style={styles.receiverDetails}>
                  <Text style={styles.receiverName}>{receiverInfo.name || 'Unknown'}</Text>
                  <Text style={styles.receiverPhone}>{receiverInfo.phone}</Text>
                </View>
                <TouchableOpacity
                  style={styles.proceedButton}
                  onPress={() => {
                    (navigation as any).navigate('Amount', {
                      receiver: receiverInfo,
                      phone: '+880' + phoneNumber,
                    });
                  }}
                >
                  <Icon name="chevron-forward" size={24} color="#11182e" />
                </TouchableOpacity>
              </View>
            )} */}

            {/* Quick Send */}
            {quickSendContacts.length > 0 && (
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
                        <Text style={styles.quickSendAvatarText}>{contact.name[0]?.toUpperCase()}</Text>
                      </View>
                      <Text style={styles.quickSendName} numberOfLines={1}>
                        {contact.name.split(' ')[0]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

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
              style={[
                styles.nextButton,
                phoneNumber.length === 0 && styles.nextButtonDisabled
              ]}
              onPress={handlePhoneSubmit}
              disabled={phoneNumber.length === 0 || checkReceiverMutation.isPending}
            >
              <Text style={[
                styles.nextButtonText,
                phoneNumber.length === 0 && styles.nextButtonTextDisabled
              ]}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Spinner visible={checkReceiverMutation.isPending}  textStyle={styles.spinnerText} />
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#11182e',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 34,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#11182e',
  },
  bottomButtonContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  quickSendSection: {
    marginBottom: 20,
  },
  quickSendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11182e',
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
    fontSize: 14,
    color: '#11182e',
    // maxWidth: 60,
    fontWeight: '500',
    textAlign: 'center',
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
    color: '#11182e',
  },
  contactsSection: {
    marginTop: 20,
  },
  contactsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 15,
  },
  contactItem: {
    height: 58,
    backgroundColor: '#fff',
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
    fontSize: 14,
    fontWeight: '500',
    color: '#11182e',
  },
  contactPhone: {
    fontSize: 10,
    color: '#999',
  },
  nextButton: {
    backgroundColor: '#11182e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#cfd4db',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonTextDisabled: {
    color: '#9ea7b4',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  spinnerText: {
    color: '#FFF',
  },
  receiverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  receiverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  receiverAvatarPlaceholder: {
    backgroundColor: '#797c83',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiverAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  receiverDetails: {
    flex: 1,
  },
  receiverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11182e',
    marginBottom: 4,
  },
  receiverPhone: {
    fontSize: 14,
    color: '#999',
  },
  proceedButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SendMoneyScreen;
