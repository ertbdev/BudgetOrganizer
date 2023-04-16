import React, {useCallback, useEffect} from 'react';

import {ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import {useAuthContext} from '../providers/AuthProvider';
import HomeScreen from '../screens/Tabs/HomeSceen';
import MainContainer from '../components/common/MainContainer';

import {useTheme} from 'styled-components/native';
import BottomTabs from './BottomTabs';
import AddExpenseScreen from '../screens/AddExpenseScreen';

import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Expense} from '../models/expense';
import {useAppDispatch} from '../hooks/redux';
import {setExpenses} from '../redux/budgetSlice';
import {expensesSubscriber} from '../firebase/functions/expenses';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const {palette} = useTheme();
  const {authenticated, user} = useAuthContext();
  const dispatch = useAppDispatch();

  const getExpensesData = useCallback((snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>) => {
    const expenses: Expense[] = [];
    snapshot.forEach(doc => expenses.push(doc.data() as Expense));
    dispatch(setExpenses(expenses));
  }, []);

  useEffect(() => {
    let subscriber: (() => void) | undefined = undefined;

    if (authenticated && user?.id) {
      subscriber = expensesSubscriber(user.id, getExpensesData);
    }

    return () => subscriber && subscriber();
  }, [authenticated, user]);

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
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;