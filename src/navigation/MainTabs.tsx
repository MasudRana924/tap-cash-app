import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
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
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#1A1A2E',
          borderRadius: 35,
          marginHorizontal: 10,
          marginBottom: 10,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,

        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarActiveTintColor: '#6b7280',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? '#6b7280' : 'rgba(255,255,255,0.5)'}
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
              <Icon name="qr-code" size={24} color="#fff" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={focused ? '#6b7280' : 'rgba(255,255,255,0.5)'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  qrIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    borderWidth: 4,
    borderColor: '#1A1A2E',
    shadowColor: '#6b7280',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default MainTabs;
