import React from 'react';

import {Container, RowContainer} from '../styles/styledComponents/containers';

import Text from './common/Text';
import {useTheme} from 'styled-components/native';

import {MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import {MONTH_SELECTOR_HEIGHT} from '../assets/constants/appDefaults';
import Button from './common/Button';
import dayjs from 'dayjs';
import {getNumberWithCommas} from '../functions/getNumberWithCommas';

type Props = {
  month: number;
  total: number;
  chartTap?: boolean;
  expenses?: boolean;
  onNextMonthPress?: () => void;
  onPreviousMonthPress?: () => void;
  onChangeTap?: () => void;
};

const InnerTabHeader = ({month, chartTap, total, expenses, onNextMonthPress, onPreviousMonthPress, onChangeTap}: Props) => {
  const {palette} = useTheme();

  return (
    <RowContainer
      variant="full-width"
      justifyContent="space-between"
      h={MONTH_SELECTOR_HEIGHT}
      px={15}
      style={{borderBottomWidth: 1, borderColor: palette.gray[300]}}>
      <RowContainer justifyContent="flex-start">
        <Button mode="text" onPress={onPreviousMonthPress}>
          <MaterialIcons name="chevron-left" size={36} color={palette.gray[500]} />
        </Button>
        <Text variant="body1">{dayjs(month).format('MMM YYYY')}</Text>
        <Button mode="text" onPress={onNextMonthPress}>
          <MaterialIcons name="chevron-right" size={36} color={palette.gray[500]} />
        </Button>
      </RowContainer>

      {expenses ? (
        <Button mode="text" onPress={onChangeTap}>
          <FontAwesome5 name={chartTap ? 'clipboard-list' : 'chart-pie'} size={24} color={palette.gray[500]} />
        </Button>
      ) : null}

      <Container>
        <Text>Total:</Text>
        <Text color={expenses ? palette.error.light : palette.success.light}>zł {getNumberWithCommas(total || 0)}</Text>
      </Container>
    </RowContainer>
  );
};

export default InnerTabHeader;
