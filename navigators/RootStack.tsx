import React from 'react';

import {ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import {useAuthContext} from '../providers/AuthProvider';
import Home from '../screens/Home';
import MainContainer from '../components/common/MainContainer';

import {useTheme} from 'styled-components/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const {authenticated} = useAuthContext();

  const {palette} = useTheme();

  if (authenticated === undefined) {
    return (
      <MainContainer>
        <ActivityIndicator size={80} color={palette.primary.main} />
      </MainContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!authenticated ? (
          <Stack.Group>
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
