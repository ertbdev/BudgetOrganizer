import React from 'react';

import {RowContainer} from '../styles/styledComponents/containers';
import {View} from 'react-native';

import type {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from './common/Text';
import {useTheme} from 'styled-components/native';
import Button from './common/Button';

import {MaterialIcons} from '@expo/vector-icons';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {APP_HEADER_HEIGHT} from '../assets/constants/appDefaults';

const AppHeader = ({navigation, layout}: BottomTabHeaderProps) => {
  const {palette} = useTheme();

  const tabBarHeight = useBottomTabBarHeight();

  const showAddButton = navigation.getState().index !== 3;

  const shadowStyle = {
    shadowColor: palette.text.primary,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  };

  const handleAddExpensePress = () => {
    navigation.navigate('AddExpenseScreen');
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
      <RowContainer h={APP_HEADER_HEIGHT} bg={palette.gray[100]} px={20} justifyContent="space-between" style={shadowStyle}>
        <Text variant="h3">
          <Text color={palette.primary.main}>Budget</Text>Organizer
        </Text>
      </RowContainer>

      {showAddButton ? (
        <View style={{position: 'absolute', top: layout.height - (tabBarHeight + 80), right: 20}}>
          <Button mode="rounded" height={60} onPress={handleAddExpensePress}>
            <MaterialIcons name="add" color={palette.background.default} size={35} />
          </Button>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default AppHeader;
