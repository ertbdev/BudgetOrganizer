import React from 'react';

import {RowContainer} from '../styles/styledComponents/containers';
import {TouchableOpacity} from 'react-native';

import Text from './common/Text';
import {useTheme} from 'styled-components/native';

import {MaterialIcons} from '@expo/vector-icons';
import {APP_HEADER_HEIGHT} from '../assets/constants/appDefaults';

type Props = {
  title?: string;
  onBackPress?: () => void;
};

const ScreenHeader = ({title, onBackPress}: Props) => {
  const {palette} = useTheme();

  const shadowStyle = {
    shadowColor: palette.text.primary,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  };

  return (
    <RowContainer variant="full-width" h={APP_HEADER_HEIGHT} bg={palette.gray[100]} px={20} style={shadowStyle}>
      <TouchableOpacity style={{position: 'absolute', left: 20}} activeOpacity={0.8} onPress={onBackPress}>
        <MaterialIcons name="arrow-back" size={28} />
      </TouchableOpacity>
      <Text variant="h3">{title}</Text>
    </RowContainer>
  );
};

export default ScreenHeader;
