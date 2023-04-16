import React from 'react';

import {FlatList, View} from 'react-native';
import MainContainer from '../../components/common/MainContainer';
import {useAppSelector} from '../../hooks/redux';
import Text from '../../components/common/Text';
import dayjs from 'dayjs';
import {useTheme} from 'styled-components/native';
import IncomeCard from '../../components/IncomeCard';
import {isDifferentDay} from '../../functions/isDifferentDay';

const IncomingsScreen = () => {
  const incomes = useAppSelector(state => state.budgetSlice.incomes);
  const {palette} = useTheme();

  return (
    <MainContainer header>
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
          <>
            {index === 0 || (index > 0 && isDifferentDay(incomes[index - 1].date, item.date)) ? (
              <Text variant="title" color={palette.gray[600]} mb={10} mt={5}>
                {dayjs(item.date).format('DD MMMM YYYY')}
              </Text>
            ) : null}
            <IncomeCard id={item.id} description={item.description} account={item.account} amount={item.amount} />
          </>
        )}
      />
    </MainContainer>
  );
};

export default IncomingsScreen;
