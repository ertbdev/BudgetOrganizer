import React, {memo} from 'react';
import {Card} from '../styles/styledComponents/card';
import Text from './common/Text';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {categories} from '../assets/constants/expenses';
import {useTheme} from 'styled-components/native';
import {getNumberWithCommas} from '../functions/getNumberWithCommas';
import {getPercentageNumber} from '../functions/getPercentageNumber';

type Props = {
  amount: number;
  category: string;
  color: string;
  total: number;
  onPress?: (id: string) => void;
};

const CategoryCard = ({amount, category, color, total, onPress}: Props) => {
  const {palette} = useTheme();

  return (
    <Card minHeight={50} width={'96%'} mt={5} activeOpacity={onPress ? 0.8 : 1}>
      <RowContainer variant="full-width" justifyContent="space-between" py={10} px={20}>
        <RowContainer>
          <Container w={70} h={25} mr={5} bg={color} style={{borderRadius:5}}>
            <Text>{getPercentageNumber(amount / total)}%</Text>
          </Container>

          {categories[category]?.materialCommunityIcon ? (
            <Container w={30} mr={5}>
              <MaterialCommunityIcons name={categories[category].materialCommunityIcon} size={26} color={palette.gray[500]} />
            </Container>
          ) : null}

          <Text variant="body1" numberOfLines={2}>
            {category}
          </Text>
        </RowContainer>

        <Text variant="subtitle2" color={palette.error.light}>
          {'zł'} {getNumberWithCommas(+amount || 0)}
        </Text>
      </RowContainer>
    </Card>
  );
};

export default memo(CategoryCard);
