import React from 'react';

import {Text} from 'react-native';
import MainContainer from '../../components/common/MainContainer';

import {Card} from '../../styles/styledComponents/card';
import AddExpenseCard from '../../components/AddExpenseCard';

const HomeScreen = () => {
  return (
    <MainContainer>
      <AddExpenseCard />
    </MainContainer>
  );
};

export default HomeScreen;
