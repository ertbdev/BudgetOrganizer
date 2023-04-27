import React, {useEffect, useState} from 'react';
import PieChart from './common/PieChart';
import {Expense} from '../models/expense';
import {getCategories} from '../functions/getCategories';
import {Container} from '../styles/styledComponents/containers';

import {useTheme} from 'styled-components/native';
import {ScrollView} from 'react-native';
import CategoryCard from './CategoryCard';
import {colorList} from '../assets/constants/colorList';

type Props = {
  categories?: {
    category: string;
    amount: number;
  }[];
  total: number;
};

const ExpensesStatsTap = ({categories, total}: Props) => {
  return (
    <Container flex={1} w={'100%'} justifyContent="flex-start" mt={30}>
      {categories && categories.length > 0 ? (
        <>
          <PieChart data={categories.map(item => item.amount)} colors={colorList.slice(0, categories.length)} />
          <ScrollView style={{width: '100%', marginTop: 20}} contentContainerStyle={{width: '100%', flexGrow: 1, alignItems: 'center'}}>
            {categories.map((item, index) => (
              <CategoryCard
                key={`${item.category}-${index}`}
                category={item.category}
                amount={item.amount}
                color={colorList[index]}
                total={total}
              />
            ))}
          </ScrollView>
        </>
      ) : null}
    </Container>
  );
};

export default ExpensesStatsTap;
