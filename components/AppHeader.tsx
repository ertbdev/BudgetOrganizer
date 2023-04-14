import React from 'react';

import {RowContainer} from '../styles/styledComponents/containers';

import type {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from './common/Text';
import {useTheme} from 'styled-components/native';

const AppHeader = ({navigation}: BottomTabHeaderProps) => {
  const {palette} = useTheme();

  const shadowStyle = {
    shadowColor: palette.text.primary,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
      <RowContainer height={60} bg={palette.gray[100]} justifyContent="space-between" px={20} style={shadowStyle}>
        <Text variant="h3">
          <Text color={palette.primary.main}>Budget</Text>Organizer
        </Text>
      </RowContainer>
    </SafeAreaView>
  );
};

export default AppHeader;
