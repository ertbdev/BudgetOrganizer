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
  onPress?: () => void;
} & Margin;

const Button = ({
  height = 50,
  minWidth,
  borderRadius = 15,
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
  onPress,
}: Props) => {
  const {palette} = useTheme();
  const _textSize = textSize ? (textSize > Math.ceil(height * 0.7) ? Math.ceil(height * 0.7) : textSize) : Math.ceil(height * 0.4);
  const styles = makeStyles(palette, mode, height, borderRadius, minWidth, buttonColor, textColor, _textSize);

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
      disabled={loading}
      style={[styles.container, margin, shadow && mode !== 'text' && shadowStyle]}
      activeOpacity={0.8}
      onPress={onPress}>
      {loading ? <ActivityIndicator size={_textSize} style={styles.activitiIndicator} color={textColor || palette.text.primary} /> : null}
      {!(mode === 'rounded' && loading) ? <Text style={[styles.text]}>{children}</Text> : null}
    </TouchableOpacity>
  );
};

const makeStyles = (
  palette: Palette,
  mode: 'text' | 'contained' | 'rounded',
  height: number,
  borderRadius: number,
  minWidth?: number | string,
  buttonColor?: string,
  textColor?: string,
  textSize?: number,
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
      backgroundColor: mode === 'text' ? 'transparent' : buttonColor || palette.primary.main,
    },
    text: {
      fontSize: textSize,
      fontWeight: '600',
      color: textColor ? textColor : mode === 'text' ? palette.primary.main : palette.common.white,
    },
    activitiIndicator: {
      marginRight: mode === 'rounded' ? 0 : 10,
    },
  });

export default Button;
