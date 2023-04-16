import React from 'react';

import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, StyleProp, ViewStyle, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenContainer} from '../../styles/styledComponents/containers';
import {Padding} from '../../types/container';
import KeyboardAvoidanceContainer from './KeyboardAvoidanceContainer';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'keyboard-avoidance';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
} & Padding;

const MainContainer = ({children, style, justifyContent, alignItems, variant = 'default', p, pb, pl, pr, pt, px, py}: Props) => {
  const padding = {
    paddingBottom: pb || py || p,
    paddingTop: pt || py || p,
    paddingLeft: pl || px || p,
    paddingRight: pr || px || p,
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
      {variant === 'default' ? (
        <ScreenContainer justifyContent={justifyContent} alignItems={alignItems} style={[padding, style]}>
          {children}
        </ScreenContainer>
      ) : (
        <KeyboardAvoidanceContainer alignItems={alignItems} justifyContent={justifyContent} style={[padding, style]}>
          {children}
        </KeyboardAvoidanceContainer>
      )}
    </SafeAreaView>
  );
};

export default MainContainer;
