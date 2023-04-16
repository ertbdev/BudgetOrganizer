import React, {memo} from 'react';
import {Card} from '../styles/styledComponents/card';
import Text from './common/Text';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import {useTheme} from 'styled-components/native';
import {getNumberWithCommas} from '../functions/getNumberWithCommas';

type Props = {
  id?: string;
  description: string;
  amount: number;
  account: string;
};

const IncomeCard = ({id, description, amount, account}: Props) => {
  const {palette} = useTheme();
  return (
    <Card minHeight={50} width={'100%'}>
      <RowContainer variant="full-width" justifyContent="space-between" py={10} px={20}>
        <RowContainer justifyContent="flex-start" style={{flex: 1}}>
          <Container alignItems="flex-start" style={{flex: 1}}>
            <Text variant="body1" numberOfLines={2}>
              {description}
            </Text>
            <Text variant="subtitle1" mt={5} color={palette.gray[500]}>
              {account}
            </Text>
          </Container>
        </RowContainer>
        <Container pl={20}>
          <Text variant="subtitle2" color={palette.success.light}>
            {'zł'} {getNumberWithCommas(+amount || 0)}
          </Text>
        </Container>
      </RowContainer>
    </Card>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.amount === nextProps.amount &&
    prevProps.account === nextProps.account &&
    prevProps.description === nextProps.description
  );
};

export default memo(IncomeCard, areEqual);
