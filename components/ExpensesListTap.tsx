import React from 'react';

import {FlatList} from 'react-native';
import {Expense} from '../models/expense';
import ExpenseCard from './ExpenseCard';
import {FlatListSeparator} from '../styles/styledComponents/flatListSeparator';

type Props = {
  expenses?: Expense[];
  onExpensePress?: (id: string) => void;
};

const ExpensesListTap = ({expenses, onExpensePress}: Props) => {
  if (!expenses || expenses.length < 1) {
    return null;
  }

  return (
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
      ItemSeparatorComponent={() => <FlatListSeparator />}
      renderItem={({item, index}) => (
        <ExpenseCard
          id={item.id}
          account={item.account}
          amount={item.amount}
          category={item.category}
          date={item.date}
          previousDate={index > 0 ? expenses[index - 1].date : undefined}
          description={item.description}
          onPress={onExpensePress}
        />
      )}
    />
  );
};

export default ExpensesListTap;
