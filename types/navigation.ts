import {NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabsParamList = {
  ExpensesScreen: undefined;
  IncomingsScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

export type RootStackParamList = {
  AddExpenseScreen: undefined;
  AddIncomeScreen: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  ExpensesScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
  OptionsModal: {tabBarHeight?: number};
  SignInScreen: undefined;
  SignUpScreen: undefined;
};
