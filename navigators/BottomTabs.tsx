import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Tabs/HomeSceen';
import ExpensesScreen from '../screens/Tabs/ExpensesScreen';
import {BottomTabsParamList} from '../types/navigation';
import AppHeader from '../components/AppHeader';
import {Ionicons, Feather} from '@expo/vector-icons';
import {useTheme} from 'styled-components/native';
import IncomingsScreen from '../screens/Tabs/IncomingsScreen';
import ProfileScreen from '../screens/Tabs/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabs = () => {
  const {palette} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: palette.primary.main,
        header: props => <AppHeader {...props} />,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={size} />,
          tabBarStyle: {backgroundColor: palette.background.paper},
        }}
      />
      <Tab.Screen
        name="ExpensesScreen"
        component={ExpensesScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Feather name="log-out" color={color} size={size} style={{transform: [{rotate: '-90deg'}]}} />
          ),
          tabBarStyle: {backgroundColor: palette.background.paper},
        }}
      />
      <Tab.Screen
        name="IncomingsScreen"
        component={IncomingsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Feather name="log-in" color={color} size={size} style={{transform: [{rotate: '90deg'}]}} />
          ),
          tabBarStyle: {backgroundColor: palette.background.paper},
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={size} />,
          tabBarStyle: {backgroundColor: palette.background.paper},
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
