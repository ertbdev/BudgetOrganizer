import React, {useState} from 'react';

import MainContainer from '../../components/common/MainContainer';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useTheme} from 'styled-components/native';
import Text from '../../components/common/Text';
import InnerTabHeader from '../../components/InnerTabHeader';
import {Container} from '../../styles/styledComponents/containers';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabsParamList, RootStackParamList} from '../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {changeSelectedMonth} from '../../redux/budgetSlice';
import ExpensesStatsTap from '../../components/ExpensesStatsTap';
import ExpensesListTap from '../../components/ExpensesListTap';

type Props = BottomTabScreenProps<BottomTabsParamList, 'ExpensesScreen'>;

const ExpensesScreen = ({navigation}: Props) => {
  const {palette} = useTheme();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const expenses = useAppSelector(state => state.budgetSlice.monthlyExpenses);
  const selectedMonth = useAppSelector(state => state.budgetSlice.selectedMonth);
  const monthlyExpensesByCategory = useAppSelector(state => state.budgetSlice.monthlyExpensesByCategory);
  const totalMonthlyExpenses = useAppSelector(state => state.budgetSlice.totalMonthlyExpenses);

  const [showChartTap, setShowChartTap] = useState(false);

  const dispatch = useAppDispatch();

  const handleNextMonthPress = () => {
    dispatch(changeSelectedMonth('add'));
  };

  const handlePreviousMonthPress = () => {
    dispatch(changeSelectedMonth('subtract'));
  };

  const handleExpensePress = (id: string) => {
    rootNavigation.navigate('AddExpenseScreen', {id});
  };

  const toggleTabs = () => {
    setShowChartTap(value => !value);
  };

  return (
    <MainContainer header>
      <InnerTabHeader
        month={selectedMonth.start}
        total={expenses.reduce((acc, item) => acc + item.amount, 0)}
        expenses
        onNextMonthPress={handleNextMonthPress}
        onPreviousMonthPress={handlePreviousMonthPress}
        chartTap={showChartTap}
        onChangeTap={toggleTabs}
      />
      {expenses.length < 1 ? (
        <Container pt={'30%'}>
          <MaterialCommunityIcons name="sort-variant-remove" size={60} color={palette.gray[400]} />
          <Text mt={10} color={palette.gray[400]}>
            No data available.
          </Text>
        </Container>
      ) : null}
      {showChartTap ? (
        <ExpensesStatsTap categories={monthlyExpensesByCategory} total={totalMonthlyExpenses} />
      ) : (
        <ExpensesListTap expenses={expenses} onExpensePress={handleExpensePress} />
      )}
    </MainContainer>
  );
};

export default ExpensesScreen;
