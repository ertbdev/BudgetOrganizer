import React, {useEffect} from 'react';

import {FlatList, Text, View} from 'react-native';
import MainContainer from '../../components/common/MainContainer';
import Button from '../../components/common/Button';
import {useAuthContext} from '../../providers/AuthProvider';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {fetchExpenses} from '../../redux/budgetSlice';
import ExpenseCard from '../../components/ExpenseCard';

const ExpensesScreen = () => {
  const {signOutUser, user} = useAuthContext();
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(state => state.budgetSlice.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  return (
    <MainContainer header>
      <FlatList
        data={[...expenses]}
        style={{width: '94%'}}
        contentContainerStyle={{flexGrow: 1, paddingTop: 20, paddingHorizontal:10}}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={300}
        windowSize={11}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 20, width: '100%'}} />}
        renderItem={({item}) => (
          <ExpenseCard id={item.id} description={item.description} account={item.account} amount={item.amount} category={item.category} />
        )}
      />
    </MainContainer>
  );
};

export default ExpensesScreen;
