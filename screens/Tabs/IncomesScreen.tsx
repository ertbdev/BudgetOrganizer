import React from 'react';

import {FlatList, View} from 'react-native';
import MainContainer from '../../components/common/MainContainer';
import {useAppSelector} from '../../hooks/redux';
import Text from '../../components/common/Text';
import {useTheme} from 'styled-components/native';
import IncomeCard from '../../components/IncomeCard';
import MonthSelector from '../../components/InnerTabHeader';
import {Container} from '../../styles/styledComponents/containers';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabsParamList, RootStackParamList} from '../../types/navigation';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<BottomTabsParamList, 'IncomesScreen'>;

const IncomingsScreen = ({navigation}: Props) => {
  const incomes = useAppSelector(state => state.budgetSlice.monthlyIncomes);
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {palette} = useTheme();

  const handleIncomePress = (id: string) => {
    rootNavigation.navigate('AddIncomeScreen', {id});
  };

  return (
    <MainContainer header>
      <MonthSelector total={incomes.reduce((acc, item) => acc + item.amount, 0)} />
      {incomes.length < 1 ? (
        <Container pt={'30%'}>
          <MaterialCommunityIcons name="sort-variant-remove" size={60} color={palette.gray[400]} />
          <Text mt={10} color={palette.gray[400]}>
            No data available.
          </Text>
        </Container>
      ) : null}
      <FlatList
        data={incomes}
        style={{width: '98%'}}
        contentContainerStyle={{flexGrow: 1, paddingTop: 20, paddingHorizontal: 10, paddingBottom: 100}}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={300}
        windowSize={11}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 10, width: '100%'}} />}
        renderItem={({item, index}) => (
          <IncomeCard
            id={item.id}
            description={item.description}
            account={item.account}
            amount={item.amount}
            date={item.date}
            previousDate={index > 0 ? incomes[index - 1].date : undefined}
            onPress={handleIncomePress}
          />
        )}
      />
    </MainContainer>
  );
};

export default IncomingsScreen;
