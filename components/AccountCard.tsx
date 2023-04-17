import React, {useState} from 'react';
import {Card} from '../styles/styledComponents/card';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import Text from './common/Text';
import Button from './common/Button';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useTheme} from 'styled-components/native';

type Props = {
  account?: string;
  balance?: number;
};

const AccountCard = ({account, balance}: Props) => {
  const {palette} = useTheme();
  const [showBalance, setShowBalance] = useState(false);

  const handleToogleShowBalance = () => {
    setShowBalance(value => !value);
  };

  if (!account) {
    return null;
  }

  return (
    <Card minHeight={150} px={20} py={15} my={10} activeOpacity={1}>
      <RowContainer variant="full-width" justifyContent="space-between">
        <Text variant="title">{account}</Text>
        <Button mode="text" onPress={handleToogleShowBalance}>
          <MaterialCommunityIcons name={showBalance ? 'eye-off' : 'eye'} size={25} color={palette.gray[500]} />
        </Button>
      </RowContainer>

      <Container variant="full-width" alignItems="flex-start" justifyContent="space-between" h={60} mt={20}>
        <Text color={palette.gray[600]}>Available funds</Text>
        {showBalance ? <Text variant="h1" >zł {balance || 0}</Text> : <Text color={palette.gray[400]}>Available funds hidden</Text>}
      </Container>
    </Card>
  );
};

export default AccountCard;
