import React, {ReactNode} from 'react';

import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Palette} from '../../types/theme';
import {Margin} from '../../types/container';

type Props = {
  /** Determines the borderRadius of the button */
  borderRadius?: number;
  /** Determines the color of the button  */
  buttonColor?: string;
  /** Text of the button */
  children: ReactNode;
  /** disables the button
   * @default false
   */
  disabled?: boolean;
  /** Determines the height of the button and the fontSize */
  height?: number;
  /** Determines the minimun width of the button */
  minWidth?: number | string;
  /** Determines the style of the button
   * values: 'text': flat button without background | 'contained':  button with a background color
   */
  mode?: 'text' | 'contained' | 'rounded';
  /** Whether to show a loading indicator. */
  loading?: boolean;
  /** Whether to show shadow.
   * @default true
   */
  shadow?: boolean;
  /** Shadow color, only if shadow is true. */
  shadowColor?: string;
  /** Determines the text color of the button string */
  textColor?: string;
  /** Determines the text size of the button */
  textSize?: number;
  /**capitalize */
  capitalize?: boolean;
  onPress?: () => void;
} & Margin;

const Button = ({
  disabled = false,
  height = 50,
  minWidth,
  borderRadius,
  buttonColor,
  textColor,
  textSize,
  loading,
  children,
  mode = 'contained',
  shadow = true,
  shadowColor,
  m,
  mt,
  mb,
  mr,
  ml,
  my,
  mx,
  capitalize,
  onPress,
}: Props) => {
  const {palette} = useTheme();
  const _textSize = textSize ? (textSize > Math.ceil(height * 0.7) ? Math.ceil(height * 0.7) : textSize) : Math.ceil(height * 0.4);

  const _textColor =
    disabled && mode === 'text' ? palette.gray[600] : textColor ? textColor : mode === 'text' ? palette.primary.main : palette.common.white;
  const _buttonColor = mode === 'text' ? 'transparent' : disabled ? palette.gray[600] : buttonColor || palette.primary.main;
  const _borderRadius = borderRadius || height * 0.3;

  const styles = makeStyles(mode, height, _borderRadius, minWidth, _buttonColor, _textColor, _textSize, capitalize);

  const shadowStyle = {
    shadowColor: shadowColor ? shadowColor : palette.text.primary,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  };

  const margin = {
    marginTop: mt || my || m,
    marginBottom: mb || my || m,
    marginRight: mr || mx || m,
    marginLeft: ml || mx || m,
  };

  return (
    <TouchableOpacity
      disabled={loading || disabled}
      style={[styles.container, margin, shadow && mode !== 'text' && shadowStyle]}
      activeOpacity={0.8}
      onPress={onPress}>
      {loading ? <ActivityIndicator size={_textSize} style={styles.activitiIndicator} color={_textColor} /> : null}
      {!(mode === 'rounded' && loading) ? <Text style={[styles.text]}>{children}</Text> : null}
    </TouchableOpacity>
  );
};

const makeStyles = (
  mode: 'text' | 'contained' | 'rounded',
  height: number,
  borderRadius: number,
  minWidth?: number | string,
  buttonColor?: string,
  textColor?: string,
  textSize?: number,
  capitalize?: boolean,
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: mode === 'text' ? undefined : height,
      width: mode === 'rounded' ? height : undefined,
      paddingHorizontal: mode === 'text' ? 0 : 10,
      minWidth: mode === 'rounded' ? undefined : minWidth,
      borderRadius: mode === 'rounded' ? height / 2 : borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonColor,
    },
    text: {
      fontSize: textSize,
      fontWeight: '600',
      color: textColor,
      textTransform: capitalize ? 'capitalize' : 'none',
    },
    activitiIndicator: {
      marginRight: mode === 'rounded' ? 0 : 10,
    },
  });

export default Button;
