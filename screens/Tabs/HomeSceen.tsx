import React from 'react';

import MainContainer from '../../components/common/MainContainer';
import AccountCard from '../../components/AccountCard';
import {useAppSelector} from '../../hooks/redux';

const HomeScreen = () => {
  const balance = useAppSelector(state => state.budgetSlice.balance);
  return (
    <MainContainer variant="scrollable" header>
      <AccountCard account="Bank Account" balance={balance.bankAccount.totalIncomes - balance.bankAccount.totalExpenses} />
      <AccountCard account="Cash" balance={balance.cash.totalIncomes - balance.cash.totalExpenses} />
    </MainContainer>
  );
};

export default HomeScreen;
