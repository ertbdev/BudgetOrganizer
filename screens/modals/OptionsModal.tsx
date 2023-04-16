import React from 'react';

import {Pressable} from 'react-native';
import MainContainer from '../../components/common/MainContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {Container, RowContainer} from '../../styles/styledComponents/containers';
import Button from '../../components/common/Button';
import {FontAwesome5} from '@expo/vector-icons';
import {useTheme} from 'styled-components/native';

type Props = NativeStackScreenProps<RootStackParamList, 'OptionsModal'>;

const OptionsModal = ({navigation, route}: Props) => {
  const {palette} = useTheme();

  const tabBarHeight = route.params.tabBarHeight || 50;

  const handleAddExpensePress = () => {
    navigation.push('AddExpenseScreen');
  };

  const handleAddIncomePress = () => {
    navigation.push('AddIncomeScreen');
  };

  const handleCloseModal = () => {
    navigation.pop();
  };

  return (
    <MainContainer>
      <Pressable onPress={handleCloseModal} style={{width: '100%'}}>
        <Container variant="full" justifyContent="flex-end" alignItems="flex-end" bg="rgba(0,0,0,0.6)">
          <RowContainer pr={20} mb={25}>
            <Button
              mr={20}
              height={35}
              buttonColor={palette.background.paper}
              textColor={palette.primary.main}
              onPress={handleAddIncomePress}>
              Income
            </Button>
            <Button mode="rounded" height={45} buttonColor={palette.background.paper} onPress={handleAddIncomePress}>
              <FontAwesome5 name="piggy-bank" color={palette.primary.main} size={22} />
            </Button>
          </RowContainer>

          <RowContainer pr={20}>
            <Button
              mr={20}
              height={35}
              buttonColor={palette.background.paper}
              textColor={palette.primary.main}
              onPress={handleAddExpensePress}>
              Expense
            </Button>
            <Button mode="rounded" height={45} buttonColor={palette.background.paper} onPress={handleAddExpensePress}>
              <FontAwesome5 name="shopify" color={palette.primary.main} size={25} />
            </Button>
          </RowContainer>
          <Container h={tabBarHeight + 60} />
        </Container>
      </Pressable>
    </MainContainer>
  );
};

export default OptionsModal;
