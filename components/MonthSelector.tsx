import React from 'react';

import {Container, RowContainer} from '../styles/styledComponents/containers';

import Text from './common/Text';
import {useTheme} from 'styled-components/native';

import {MaterialIcons} from '@expo/vector-icons';
import {MONTH_SELECTOR_HEIGHT} from '../assets/constants/appDefaults';
import Button from './common/Button';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import dayjs from 'dayjs';
import {changeSelectedMonth} from '../redux/budgetSlice';
import {getNumberWithCommas} from '../functions/getNumberWithCommas';

type Props = {
  total?: number;
  expenses?: boolean;
  onBackPress?: () => void;
};

const MonthSelector = ({total, expenses, onBackPress}: Props) => {
  const {palette} = useTheme();
  const selectedMonth = useAppSelector(state => state.budgetSlice.selectedMonth);

  const dispatch = useAppDispatch();

  const handleNextMonthPress = () => {
    dispatch(changeSelectedMonth('add'));
  };

  const handlePreviousMonthPress = () => {
    dispatch(changeSelectedMonth('subtract'));
  };

  return (
    <RowContainer variant="full-width" h={MONTH_SELECTOR_HEIGHT} px={20} style={{borderBottomWidth: 1, borderColor: palette.gray[300]}}>
      <RowContainer justifyContent="flex-start" flex={1}>
        <Button mode="text" onPress={handlePreviousMonthPress}>
          <MaterialIcons name="chevron-left" size={28} color={palette.gray[500]} />
        </Button>
        <Text variant="body1">{dayjs(selectedMonth.start).format('MMMM YYYY')}</Text>
        <Button mode="text" onPress={handleNextMonthPress}>
          <MaterialIcons name="chevron-right" size={28} color={palette.gray[500]} />
        </Button>
      </RowContainer>

      <Container>
        <Text>Total:</Text>
        <Text color={expenses ? palette.error.light : palette.success.light}>zł {getNumberWithCommas(total || 0)}</Text>
      </Container>
    </RowContainer>
  );
};

export default MonthSelector;
