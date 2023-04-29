import React, {useCallback, useEffect} from 'react';

import {ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import {useAuthContext} from '../providers/AuthProvider';
import MainContainer from '../components/common/MainContainer';

import {useTheme} from 'styled-components/native';
import BottomTabs from './BottomTabs';
import AddExpenseScreen from '../screens/AddExpenseScreen';

import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Expense} from '../models/expense';
import {useAppDispatch} from '../hooks/redux';
import {setExpenses, setIncomes} from '../redux/budgetSlice';
import {expensesSubscriber} from '../firebase/firestoreFunctions/expenses';
import OptionsModal from '../screens/modals/OptionsModal';
import AddIncomeScreen from '../screens/AddIncomeScreen';
import {incomesSubscriber} from '../firebase/firestoreFunctions/incomes';
import {Income} from '../models/income';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const {palette} = useTheme();
  const {authenticated, user} = useAuthContext();
  const dispatch = useAppDispatch();

  const getExpensesData = useCallback((snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>) => {
    const expenses: Expense[] = [];
    snapshot.forEach(doc => expenses.push({...doc.data(), id: doc.id} as Expense));
    dispatch(setExpenses(expenses));
  }, []);

  const getIncomesData = useCallback((snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>) => {
    const incomes: Income[] = [];
    snapshot.forEach(doc => incomes.push({...doc.data(), id: doc.id} as Income));
    dispatch(setIncomes(incomes));
  }, []);

  useEffect(() => {
    let exSubscriber: (() => void) | undefined = undefined;
    let inSubscriber: (() => void) | undefined = undefined;

    if (authenticated && user?.id) {
      exSubscriber = expensesSubscriber(user.id, getExpensesData);
      inSubscriber = incomesSubscriber(user.id, getIncomesData);
    }

    return () => {
      exSubscriber && exSubscriber();
      inSubscriber && inSubscriber();
    };
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
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="AddIncomeScreen" component={AddIncomeScreen} />
            <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
            <Stack.Screen
              options={{presentation: 'transparentModal', animation: 'fade_from_bottom', animationDuration: 50}}
              name="OptionsModal"
              component={OptionsModal}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
