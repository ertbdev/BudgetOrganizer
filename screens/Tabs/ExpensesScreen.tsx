import React from 'react';
import {FlatList, View} from 'react-native';

import MainContainer from '../../components/common/MainContainer';
import {useAppSelector} from '../../hooks/redux';
import ExpenseCard from '../../components/ExpenseCard';

const ExpensesScreen = () => {
  const expenses = useAppSelector(state => state.budgetSlice.expenses);

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
          <ExpenseCard
            id={item.id}
            index={index}
            description={item.description}
            account={item.account}
            amount={item.amount}
            category={item.category}
            date={item.date}
          />
        )}
      />
    </MainContainer>
  );
};

export default ExpensesScreen;
