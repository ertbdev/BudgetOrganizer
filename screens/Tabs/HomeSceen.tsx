import React from 'react';

import MainContainer from '../../components/common/MainContainer';
import AccountCard from '../../components/AccountCard';
import {useAppSelector} from '../../hooks/redux';
import BudgetCard from '../../components/BudgetCard';
import Text from '../../components/common/Text';

const HomeScreen = () => {
  const balance = useAppSelector(state => state.budgetSlice.balance);
  const accounts = useAppSelector(state => state.accountsSlice.accounts);
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
      {accounts.map((account, index) => (
        <AccountCard key={index} account={account.name.replace('_', ' ')} balance={account.availableFunds} />
      ))}
    </MainContainer>
  );
};

export default HomeScreen;
