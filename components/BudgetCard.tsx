import React from 'react';
import {Card} from '../styles/styledComponents/card';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import Text from './common/Text';
import {useTheme} from 'styled-components/native';
import {getNumberWithCommas} from '../functions/getNumberWithCommas';
import CircularProgressIndicator from './common/CircularProgressIndicator';

type Props = {
  totalMonthExpenses?: number;
  budget?: number;
};

const INDICATOR_SIZE = 150;

const BudgetCard = ({totalMonthExpenses = 0, budget = 0}: Props) => {
  const {palette} = useTheme();

  return (
    <Card minHeight={180} px={10} py={15} mb={10} activeOpacity={1} disabled>
      <RowContainer variant="full-width" flex={1} justifyContent="space-around">
        <Container>
          <Text variant="subtitle1">
            {'zł'} {getNumberWithCommas(totalMonthExpenses)}
          </Text>
          <Text color={palette.gray[600]}>Expenses</Text>
        </Container>

        <Container h={INDICATOR_SIZE} w={INDICATOR_SIZE} justifyContent="center">
          <Container style={{position: 'absolute', top: 0, left: 0}}>
            <CircularProgressIndicator
              size={INDICATOR_SIZE}
              value={totalMonthExpenses / budget}
              offset={0.2}
              lineWidth={8}
              color={palette.primary.main}
              backColor={palette.gray[300]}
              dangerColor={palette.error.light}
            />
          </Container>
          <Text variant="subtitle1">
            {'zł'} {getNumberWithCommas(budget >= totalMonthExpenses ? budget - totalMonthExpenses : totalMonthExpenses - budget)}
          </Text>
          <Text color={palette.gray[600]}>{budget >= totalMonthExpenses ? 'Remaining' : 'Over'}</Text>
        </Container>

        <Container>
          <Text variant="subtitle1">
            {'zł'} {getNumberWithCommas(budget)}
          </Text>
          <Text color={palette.gray[600]}>Budget</Text>
        </Container>
      </RowContainer>
    </Card>
  );
};
export default BudgetCard;
