import React from 'react';
import {FlatList, View} from 'react-native';

import MainContainer from '../../components/common/MainContainer';
import {useAppSelector} from '../../hooks/redux';
import ExpenseCard from '../../components/ExpenseCard';
import {useTheme} from 'styled-components/native';
import Text from '../../components/common/Text';
import dayjs from 'dayjs';

const ExpensesScreen = () => {
  const {palette} = useTheme();
  const expenses = useAppSelector(state => state.budgetSlice.expenses);

  const isDifferentDay = (date1: number, date2: number) => {
    return !dayjs(date1).isSame(dayjs(date2), 'day');
  };

  return (
    <MainContainer header>
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
            <ExpenseCard
              id={item.id}
              description={item.description}
              account={item.account}
              amount={item.amount}
              category={item.category}
              date={item.date}
            />
          </>
        )}
      />
    </MainContainer>
  );
};

export default ExpensesScreen;
