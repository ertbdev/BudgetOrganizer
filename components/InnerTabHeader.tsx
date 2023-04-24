import React from 'react';

import {Container, RowContainer} from '../styles/styledComponents/containers';

import Text from './common/Text';
import {useTheme} from 'styled-components/native';

import {MaterialIcons} from '@expo/vector-icons';
import {MONTH_SELECTOR_HEIGHT} from '../assets/constants/appDefaults';
import Button from './common/Button';
import dayjs from 'dayjs';
import {getNumberWithCommas} from '../functions/getNumberWithCommas';

type Props = {
  month: number;
  total: number;
  expenses?: boolean;
  onNextMonthPress?: () => void;
  onPreviousMonthPress?: () => void;
  onTogglePress?: () => void;
};

const InnerTabHeader = ({month, total, expenses, onNextMonthPress, onPreviousMonthPress}: Props) => {
  const {palette} = useTheme();

  return (
    <RowContainer variant="full-width" h={MONTH_SELECTOR_HEIGHT} px={20} style={{borderBottomWidth: 1, borderColor: palette.gray[300]}}>
      <RowContainer justifyContent="flex-start" flex={1}>
        <Button mode="text" onPress={onPreviousMonthPress}>
          <MaterialIcons name="chevron-left" size={28} color={palette.gray[500]} />
        </Button>
        <Text variant="body1">{dayjs(month).format('MMMM YYYY')}</Text>
        <Button mode="text" onPress={onNextMonthPress}>
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

export default InnerTabHeader;
