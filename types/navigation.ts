import {NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabsParamList = {
  ExpensesScreen: undefined;
  IncomingsScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

export type RootStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  ExpensesScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
  LandingScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
};
