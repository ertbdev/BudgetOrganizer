import React from 'react';
import {FlatList, View} from 'react-native';

import MainContainer from '../../components/common/MainContainer';
import {useAppSelector} from '../../hooks/redux';
import ExpenseCard from '../../components/ExpenseCard';
import {useTheme} from 'styled-components/native';
import Text from '../../components/common/Text';
import MonthSelector from '../../components/MonthSelector';
import {Container} from '../../styles/styledComponents/containers';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabsParamList, RootStackParamList} from '../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = BottomTabScreenProps<BottomTabsParamList, 'ExpensesScreen'>;

const ExpensesScreen = ({navigation}: Props) => {
  const {palette} = useTheme();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const expenses = useAppSelector(state => state.budgetSlice.monthlyExpenses);

  const handleExpensePress = (id: string) => {
    rootNavigation.navigate('AddExpenseScreen', {id});
  };

  return (
    <MainContainer header>
      <MonthSelector total={expenses.reduce((acc, item) => acc + item.amount, 0)} expenses />
      {expenses.length < 1 ? (
        <Container pt={'30%'}>
          <MaterialCommunityIcons name="sort-variant-remove" size={60} color={palette.gray[400]} />
          <Text mt={10} color={palette.gray[400]}>
            No data available.
          </Text>
        </Container>
      ) : null}
      <FlatList
        data={expenses}
        style={{width: '98%'}}
        contentContainerStyle={{flexGrow: 1, paddingTop: 20, paddingHorizontal: 10, paddingBottom: 100}}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={300}
        windowSize={11}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 10, width: '100%'}} />}
        renderItem={({item, index}) => (
          <ExpenseCard
            id={item.id}
            account={item.account}
            amount={item.amount}
            category={item.category}
            date={item.date}
            previousDate={index > 0 ? expenses[index - 1].date : undefined}
            description={item.description}
            onPress={handleExpensePress}
          />
        )}
      />
    </MainContainer>
  );
};

export default ExpensesScreen;
