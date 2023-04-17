import React from 'react';
import {FlatList, View} from 'react-native';

import MainContainer from '../../components/common/MainContainer';
import {useAppSelector} from '../../hooks/redux';
import ExpenseCard from '../../components/ExpenseCard';
import {useTheme} from 'styled-components/native';
import Text from '../../components/common/Text';
import dayjs from 'dayjs';
import {isDifferentDay} from '../../functions/isDifferentDay';
import MonthSelector from '../../components/MonthSelector';
import {Container} from '../../styles/styledComponents/containers';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const ExpensesScreen = () => {
  const {palette} = useTheme();
  const expenses = useAppSelector(state => state.budgetSlice.monthlyExpenses);

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
          <>
            {index === 0 || (index > 0 && isDifferentDay(expenses[index - 1].date, item.date)) ? (
              <Text variant="title" color={palette.gray[600]} mb={10} mt={5}>
                {dayjs(item.date).format('DD MMMM YYYY')}
              </Text>
            ) : null}
            <ExpenseCard id={item.id} description={item.description} account={item.account} amount={item.amount} category={item.category} />
          </>
        )}
      />
    </MainContainer>
  );
};

export default ExpensesScreen;
