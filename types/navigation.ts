import {NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabsParamList = {
  ExpensesScreen: undefined;
  IncomesScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

export type RootStackParamList = {
  AddExpenseScreen: {id?: string};
  AddIncomeScreen: {id?: string};
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  ExpensesScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
  OptionsModal: {tabBarHeight?: number};
  SignInScreen: undefined;
  SignUpScreen: undefined;
};
