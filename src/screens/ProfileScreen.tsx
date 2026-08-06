import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary, launchCamera, ImagePickerResponse, Asset } from 'react-native-image-picker';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [userName, setUserName] = useState('Jennifer Smith');
  const [newName, setNewName] = useState('');
  const [userImage, setUserImage] = useState('https://randomuser.me/api/portraits/women/44.jpg');

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  const handleEditPress = () => {
    setEditModalVisible(true);
  };

  const handleUpdateName = () => {
    if (newName.trim()) {
      setUserName(newName);
      setNewName('');
      setNameModalVisible(false);
      setEditModalVisible(false);
      Alert.alert('Success', 'Name updated successfully');
    } else {
      Alert.alert('Error', 'Please enter a valid name');
    }
  };

  const handlePickImage = (source: 'camera' | 'gallery') => {
    const options: any = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    };

    const picker = source === 'camera' ? launchCamera : launchImageLibrary;
    
    picker(options, (response: ImagePickerResponse) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri || null;
        // Auto update the image
        if (imageUri) {
          setUserImage(imageUri);
          setEditModalVisible(false);
          Alert.alert('Success', 'Image updated successfully');
        }
      }
    });
  };

  const handleImageOptionPress = () => {
    Alert.alert(
      'Select Image Source',
      'Choose where to pick your image from',
      [
        {
          text: 'Camera',
          onPress: () => handlePickImage('camera'),
        },
        {
          text: 'Gallery',
          onPress: () => handlePickImage('gallery'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const accountItems = [
    { id: '1', icon: 'person-outline', label: 'Edit Profile' },
    { id: '2', icon: 'card-outline', label: 'My Cards' },
    { id: '3', icon: 'shield-checkmark-outline', label: 'Security' },
    { id: '4', icon: 'notifications-outline', label: 'Notifications' },
  ];

  const supportItems = [
    { id: '5', icon: 'help-circle-outline', label: 'Help & Support' },
    { id: '6', icon: 'document-text-outline', label: 'Terms & Conditions' },
    { id: '7', icon: 'information-circle-outline', label: 'About' },
  ];

  const renderMenuItem = (item: { id: string; icon: string; label: string }, isLast: boolean) => (
    <TouchableOpacity key={item.id} style={[styles.menuItem, isLast && styles.menuItemLast]}>
      <Icon name={item.icon as any} size={22} color="#11182e" />
      <Text style={styles.menuLabel}>{item.label}</Text>
      <Icon name="chevron-forward" size={18} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Profile Info */}
          <View style={styles.profileRow}>
            <Image
              source={{ uri: userImage }}
              style={styles.avatar}
            />
          </View>

          {/* User Name and Phone */}
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.phone}>+880 1712-345678</Text>
          </View>

          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Icon name="create-outline" size={20} color="#11182e" />
          </TouchableOpacity>

          {/* Account Section */}
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuGroup}>
            {accountItems.map((item, index) =>
              renderMenuItem(item, index === accountItems.length - 1)
            )}
          </View>

          {/* Support Section */}
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuGroup}>
            {supportItems.map((item, index) =>
              renderMenuItem(item, index === supportItems.length - 1)
            )}
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out-outline" size={22} color="#FF3B30" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.version}>TapCash v1.0.0</Text>
        </ScrollView>

        {/* Edit Modal */}
        <Modal
          visible={editModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setEditModalVisible(false)} />
            <View style={styles.bottomModalContent}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>Edit Profile</Text>
              
              <TouchableOpacity style={styles.modalOption} onPress={() => {
                setNameModalVisible(true);
              }}>
                <Icon name="person-outline" size={24} color="#11182e" />
                <Text style={styles.modalOptionText}>Update Name</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={handleImageOptionPress}>
                <Icon name="image-outline" size={24} color="#11182e" />
                <Text style={styles.modalOptionText}>Update Image</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Update Name Modal */}
        <Modal
          visible={nameModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setNameModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setNameModalVisible(false)} />
            <View style={styles.bottomModalContent}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>Update Name</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Enter new name"
                placeholderTextColor="#BDBDBD"
                value={newName}
                onChangeText={setNewName}
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setNameModalVisible(false)}>
                  <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={handleUpdateName}>
                  <Text style={styles.modalButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 20,
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
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#11182e',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#999',
  },
  editButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAF7EE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  menuGroup: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#11182e',
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 15,
    marginTop: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE5E5',
    backgroundColor: '#FFF5F5',
  },
  logoutText: {
    fontSize: 15,
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 10,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ccc',
    marginTop: 20,
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  bottomModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11182e',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#11182e',
    marginLeft: 16,
    fontWeight: '500',
  },
  modalButton: {
    backgroundColor: '#F8623F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#11182e',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  modalCloseButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#11182e',
    marginBottom: 16,
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#11182e',
    marginLeft: 12,
    fontWeight: '500',
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#BDBDBD',
    fontSize: 12,
    marginTop: 8,
  },
});

export default ProfileScreen;
