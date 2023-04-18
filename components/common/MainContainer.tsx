import React from 'react';

import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenContainer} from '../../styles/styledComponents/containers';
import {Padding} from '../../types/container';
import KeyboardAvoidanceContainer from './KeyboardAvoidanceContainer';
import {APP_HEADER_HEIGHT} from '../../assets/constants/appDefaults';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'scrollable' | 'keyboard-avoidance';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  header?: boolean;
} & Padding;

const MainContainer = ({children, style, justifyContent, header, alignItems, variant = 'default', p, pb, pl, pr, pt, px, py}: Props) => {
  const padding = {
    paddingBottom: pb || py || p,
    paddingTop: pt || py || p,
    paddingLeft: pl || px || p,
    paddingRight: pr || px || p,
  };

  return (
    <SafeAreaView
      style={[{flex: 1}, header && {paddingTop: APP_HEADER_HEIGHT}]}
      edges={header ? ['left', 'right'] : ['left', 'right', 'top']}>
      {variant === 'default' ? (
        <ScreenContainer justifyContent={justifyContent} alignItems={alignItems} style={[padding, style]}>
          {children}
        </ScreenContainer>
      ) : variant === 'scrollable' ? (
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          <ScreenContainer justifyContent={justifyContent || 'flex-start'} alignItems={alignItems} style={[padding, style]}>
            {children}
          </ScreenContainer>
        </ScrollView>
      ) : (
        <KeyboardAvoidanceContainer alignItems={alignItems} justifyContent={justifyContent} style={[padding, style]}>
          {children}
        </KeyboardAvoidanceContainer>
      )}
    </SafeAreaView>
  );
};

export default MainContainer;
