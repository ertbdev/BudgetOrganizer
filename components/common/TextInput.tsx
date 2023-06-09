import React, {forwardRef, ReactNode, RefObject, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
  Pressable,
  LayoutChangeEvent,
} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Palette} from '../../types/theme';
import {Margin} from '../../types/container';

type Props = {
  /** Used to locate this view in end-to-end tests */
  testID?: string;
  /** Determines the height of the textInput */
  height?: number;
  /** Determines the width of the textInput */
  width?: number | string;
  /** ReactNode to be rendered at the Right side of the inputText */
  right?: ReactNode;
  /** ReactNode to be rendered at the left side of the inputText */
  left?: ReactNode;
  /** The text to use for the label. */
  label?: string;
  /** Pass custom style directly to the label. */
  labelStyle?: StyleProp<TextStyle>;
  /** Value of the text input. */
  value?: string;
  /** it might be the text to use for showing error or a boolean. */
  error?: string | boolean;
  /** The string that will be rendered before text input has been entered. */
  placeholder?: string;
  /** If true, the text input can be multiple lines. The default value is false. */
  multiline?: boolean;
  /** If false, textinput is not editable. The default value is true. */
  editable?: boolean;
  /** Determines which keyboard to open */
  keyboardType?: KeyboardTypeOptions;
  /** If true, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is false. */
  secureTextEntry?: boolean;
  /** */
  showSoftInputOnFocus?: boolean;
  /** capitalize */
  capitalize?: boolean;
  /** Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler. */
  onChangeText?: (text: string) => void;
  /** Function to execute on press when touching Left component. */
  onLeftPress?: () => void;
  /** Function to execute on press when touching Right component. */
  onRightPress?: () => void;
  /** Callback that is called when the text input is blurred. */
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Callback that is called when the text input is focused. */
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
} & Margin;

const TextInput = forwardRef<RNTextInput | null, Props>(
  (
    {
      testID,
      height,
      width = '100%',
      label,
      labelStyle,
      value,
      error,
      multiline,
      keyboardType,
      right,
      left,
      editable = true,
      placeholder,
      secureTextEntry = false,
      m,
      mt,
      mb,
      mr,
      ml,
      my,
      mx,
      showSoftInputOnFocus,
      capitalize,
      onFocus,
      onChangeText,
      onBlur,
      onLeftPress,
      onRightPress,
    }: Props,
    ref,
  ) => {
    const {palette} = useTheme();

    const _height = height ? height : multiline ? 115 : 50;
    const styles = makeStyles(palette, _height, width, multiline, Boolean(error), capitalize);

    const margin = {
      marginTop: mt || my || m,
      marginBottom: mb || my || m || 8,
      marginRight: mr || mx || m,
      marginLeft: ml || mx || m,
    };

    const [padLeft, setPadLeft] = useState(left ? _height : Math.ceil(_height / 5));
    const [padRight, setPadRight] = useState(right ? _height : Math.ceil(_height / 5));

    const getPaddingLeft = (event: LayoutChangeEvent) => {
      setPadLeft(event.nativeEvent.layout.width);
    };

    const getPaddingRight = (event: LayoutChangeEvent) => {
      setPadRight(event.nativeEvent.layout.width);
    };

    return (
      <View style={[styles.container, margin]}>
        {label ? (
          <Text testID={`${testID}-label-text`} style={[styles.label, labelStyle]}>
            {label}
          </Text>
        ) : null}
        <View>
          <RNTextInput
            ref={ref}
            testID={`${testID}-input`}
            style={[styles.input, {paddingLeft: padLeft, paddingRight: padRight}]}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={palette.gray[500]}
            multiline={multiline}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
            keyboardType={keyboardType}
            editable={editable}
            secureTextEntry={secureTextEntry}
            showSoftInputOnFocus={showSoftInputOnFocus}
          />
          {left ? (
            <Pressable
              onPress={onLeftPress}
              onLayout={getPaddingLeft}
              pointerEvents={onLeftPress ? undefined : 'none'}
              style={styles.leftContainer}>
              {left}
            </Pressable>
          ) : null}
          {right ? (
            <Pressable
              onPress={onRightPress}
              onLayout={getPaddingRight}
              pointerEvents={onRightPress ? undefined : 'none'}
              style={styles.rightContainer}>
              {right}
            </Pressable>
          ) : null}
        </View>
        {error && typeof error === 'string' ? (
          <View style={styles.errorContainer}>
            <Text testID={`${testID}-error-text`} style={styles.errorText}>
              {error}
            </Text>
          </View>
        ) : null}
      </View>
    );
  },
);

const makeStyles = (palette: Palette, height: number, width: number | string, multiline?: boolean, error?: boolean, capitalize?: boolean) =>
  StyleSheet.create({
    container: {
      width: width,
      paddingHorizontal: 5,
    },
    input: {
      height: height,
      width: '100%',
      alignSelf: 'center',
      textAlignVertical: multiline ? 'top' : undefined,
      borderRadius: Math.ceil(height / 5),
      paddingVertical: 10,
      marginVertical: 5,
      color: error ? palette.error.main : palette.text.primary,
      fontSize: Math.ceil(height * 0.3),
      backgroundColor: palette.background.paper,
      shadowColor: error ? palette.error.main : palette.text.primary,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
      textTransform: capitalize ? 'capitalize' : 'none',
    },
    label: {
      fontSize: Math.ceil(height * 0.3),
      color: error ? palette.error.main : palette.primary.main,
      fontWeight: '600',
    },
    errorContainer: {
      paddingLeft: 5,
      marginBottom: 8,
    },
    errorText: {
      fontSize: 14,
      color: palette.error.main,
    },
    leftContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      height: '100%',
      paddingHorizontal: 8,
    },
    rightContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      right: 0,
      height: '100%',
      width: height,
    },
  });

export default TextInput;

export type TextInputRef = RefObject<RNTextInput>;
