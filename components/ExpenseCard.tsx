import React, {memo} from 'react';
import {Card} from '../styles/styledComponents/card';
import Text from './common/Text';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {categories} from '../assets/constants/expenses';
import {useTheme} from 'styled-components/native';
import {getNumberWithCommas} from '../functions/getNumberWithCommas';
import {isDifferentDay} from '../functions/isDifferentDay';
import dayjs from 'dayjs';

type Props = {
  id?: string;
  account: string;
  amount: number;
  category: string;
  date: number;
  description: string;
  previousDate?: number;
  onPress?: (id: string) => void;
};

const ExpenseCard = ({id, account, amount, category, date, description, previousDate, onPress}: Props) => {
  const {palette} = useTheme();

  const handleCardPress = () => {
    onPress && id && onPress(id);
  };

  return (
    <>
      {!previousDate || (previousDate && isDifferentDay(previousDate, date)) ? (
        <Text variant="title" color={palette.gray[600]} mb={10} mt={5}>
          {dayjs(date).format('DD MMMM YYYY')}
        </Text>
      ) : null}
      <Card minHeight={50} width={'100%'} activeOpacity={onPress ? 0.8 : 1} onPress={handleCardPress}>
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
    prevProps.account === nextProps.account &&
    prevProps.amount === nextProps.amount &&
    prevProps.category === nextProps.category &&
    prevProps.description === nextProps.description &&
    prevProps.date === nextProps.date &&
    prevProps.previousDate === nextProps.previousDate
  );
};

export default memo(ExpenseCard, areEqual);
