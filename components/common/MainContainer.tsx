import React from 'react';

import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, StyleProp, ViewStyle, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenContainer} from '../../styles/styledComponents/containers';

interface Props {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'keyboard-avoidance';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
}

const WrapperAvoidance = ({children, style, justifyContent, alignItems, variant = 'default'}: Props) => {
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
      {variant === 'default' ? (
        <ScreenContainer justifyContent={justifyContent} alignItems={alignItems} style={style}>
          {children}
        </ScreenContainer>
      ) : (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
              <ScreenContainer justifyContent={justifyContent} alignItems={alignItems} style={style}>
                {children}
              </ScreenContainer>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default WrapperAvoidance;
