import React from 'react';

import MainContainer from '../../components/common/MainContainer';
import AccountCard from '../../components/AccountCard';
import {useAppSelector} from '../../hooks/redux';
import BudgetCard from '../../components/BudgetCard';
import Text from '../../components/common/Text';

const HomeScreen = () => {
  const balance = useAppSelector(state => state.budgetSlice.balance);
  const totalMonthExpenses = useAppSelector(state => state.budgetSlice.totalMonthlyExpenses);

  return (
    <MainContainer variant="scrollable" header pb={100}>
      <Text variant="title" style={{alignSelf: 'flex-start'}} my={10} ml={10}>
        Month Summary
      </Text>
      <BudgetCard budget={3000} totalMonthExpenses={totalMonthExpenses} />
      <Text variant="title" style={{alignSelf: 'flex-start'}} my={10} ml={10}>
        Accounts Summary
      </Text>
      <AccountCard account="Bank Account" balance={balance.bankAccount.totalIncomes - balance.bankAccount.totalExpenses} />
      <AccountCard account="Cash" balance={balance.cash.totalIncomes - balance.cash.totalExpenses} />
    </MainContainer>
  );
};

export default HomeScreen;
