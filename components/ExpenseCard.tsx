import React, {memo} from 'react';
import {Card} from '../styles/styledComponents/card';
import Text from './common/Text';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {categories} from '../assets/constants/expenses';
import {useTheme} from 'styled-components/native';
import {getNumberWithCommas} from '../functions/getNumberWithCommas';
import dayjs from 'dayjs';

type Props = {
  id?: string;
  index: number;
  description: string;
  amount: number;
  account: string;
  category: string;
  date: number;
};

const ExpenseCard = ({id, index, description, amount, account, category, date}: Props) => {
  const {palette} = useTheme();
  return (
    <>
      {index === 0 ? (
        <Text variant="title" color={palette.gray[600]} mb={10}>
          {dayjs(date).format('DD MMMM YYYY')}
        </Text>
      ) : null}
      <Card minHeight={50} width={'100%'}>
        <RowContainer variant="full-width" justifyContent="space-between" py={10} px={20}>
          <RowContainer justifyContent="flex-start" style={{flex: 1}}>
            {categories[category]?.materialCommunityIcon ? (
              <Container w={30} mr={10}>
                <MaterialCommunityIcons name={categories[category].materialCommunityIcon} size={26} color={palette.gray[500]} />
              </Container>
            ) : null}
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
            <Text variant="subtitle2" color={palette.error.light}>
              {'zł'} {getNumberWithCommas(+amount || 0)}
            </Text>
          </Container>
        </RowContainer>
      </Card>
    </>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.amount === nextProps.amount &&
    prevProps.account === nextProps.account &&
    prevProps.description === nextProps.description &&
    prevProps.category === nextProps.category
  );
};

export default memo(ExpenseCard, areEqual);