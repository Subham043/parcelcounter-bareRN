import AccountScreen from '@/screens/Account';
import HomeScreen from '@/screens/Home';
import LoginScreen from '@/screens/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return focused
              ? <Ionicons name="home-sharp" size={size} color={color} /> :
              <Ionicons name="home-outline" size={size} color={color} />;
          } else if (route.name === 'Account') {
            return focused
              ? <MaterialCommunityIcons name="account-circle" size={size} color={color} /> :
              <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />;
          }else{
            return focused
              ? <MaterialCommunityIcons name="account-circle" size={size} color={color} /> :
              <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#222222',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}