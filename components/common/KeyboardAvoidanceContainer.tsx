import React from 'react';

import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, StyleProp, ViewStyle, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenContainer} from '../../styles/styledComponents/containers';
import {Padding} from '../../types/container';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
} & Padding;

const KeyboardAvoidanceContainer = ({children, style, justifyContent, alignItems, p, pb, pl, pr, pt, px, py}: Props) => {
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const padding = {
    paddingBottom: pb || py || p,
    paddingTop: pt || py || p,
    paddingLeft: pl || px || p,
    paddingRight: pr || px || p,
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, width: '100%'}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
          <ScreenContainer justifyContent={justifyContent} alignItems={alignItems} style={[padding, style]}>
            {children}
          </ScreenContainer>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidanceContainer;
