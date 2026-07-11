import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import InsightsScreen from '../screens/InsightsScreen';
import QRScreen from '../screens/QRScreen';
import MyCardsScreen from '../screens/MyCardsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 15,
          paddingTop: 10,
          backgroundColor: '#fff',
   
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarActiveTintColor: '#37c667',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? '#37c667' : '#999'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="QR"
        component={QRScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.qrIconContainer}>
              <Icon name="qr-code" size={28} color="#fff" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={focused ? '#37c667' : '#999'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  qrIconContainer: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#37c667',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,

  },
});

export default MainTabs;
