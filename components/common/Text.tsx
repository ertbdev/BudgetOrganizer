import React from 'react';

import {Text as RNText, StyleProp, TextStyle} from 'react-native';
import {Margin} from '../../types/container';

type Props = {
  children?: React.ReactNode;
  variant?: 'h1' | 'h2' | 'title' | 'subtitle' | 'body1' | 'body2';
  color?: string;
  style?: StyleProp<TextStyle>;
} & Margin;

const Text = ({children, variant, style, color, m, mt, mb, mr, ml, my, mx}: Props) => {
  const margin = {
    marginTop: mt || my || m,
    marginBottom: mb || my || m,
    marginRight: mr || mx || m,
    marginLeft: ml || mx || m,
  };

  if (variant === 'body1') {
    return <RNText style={[{fontSize: 12, color: color}, margin, style]}>{children}</RNText>;
  }

  return <RNText style={[{color: color, ...margin}, style]}>{children}</RNText>;
};

export default Text;
