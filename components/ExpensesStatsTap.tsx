import React, {useEffect, useState} from 'react';
import PieChart from './common/PieChart';
import {Expense} from '../models/expense';
import {getCategories} from '../functions/getCategories';
import {Container} from '../styles/styledComponents/containers';

import Text from './common/Text';
import {useTheme} from 'styled-components/native';
import {ScrollView} from 'react-native';

type Props = {
  expenses: Expense[];
};

const ExpensesStatsTap = ({expenses}: Props) => {
  const [categories, setCategories] = useState<{category: string; amount: number}[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const {palette} = useTheme();

  useEffect(() => {
    const data = getCategories(expenses);
    setCategories(data);
  }, [expenses]);

  return (
    <Container flex={1} justifyContent="flex-start" mt={30}>
      {categories.length > 0 ? <PieChart data={expenses.map(item => item.amount)} /> : null}
    </Container>
  );
};

export default ExpensesStatsTap;
