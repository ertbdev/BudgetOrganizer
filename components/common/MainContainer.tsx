import React from 'react';

import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, StyleProp, ViewStyle, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'keyboard-avoidance';
}

const WrapperAvoidance = ({children, style, variant = 'default'}: Props) => {
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
      {variant === 'default' ? (
        <View style={[{flex: 1}, style]}>{children}</View>
      ) : (
        <KeyboardAvoidingView style={{flex: 1, width: '100%'}} behavior={Platform.OS !== 'android' ? 'padding' : undefined}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
              <View style={[{flex: 1}, style]}>{children}</View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default WrapperAvoidance;
