import React from 'react';

import {Text as RNText, StyleProp, TextStyle} from 'react-native';
import {Margin} from '../../types/container';
import {useTheme} from 'styled-components/native';

type Props = {
  children?: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'title' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  color?: string;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
} & Margin;

const Text = ({children, variant, style, color, numberOfLines, m, mt, mb, mr, ml, my, mx}: Props) => {
  const {palette} = useTheme();
  const margin = {
    marginTop: mt || my || m,
    marginBottom: mb || my || m,
    marginRight: mr || mx || m,
    marginLeft: ml || mx || m,
  };

  const _color = color || palette.text.primary;

  if (variant === 'h3') {
    return (
      <RNText numberOfLines={numberOfLines} style={[{fontSize: 18, fontWeight: '700', color: _color}, margin, style]}>
        {children}
      </RNText>
    );
  }

  if (variant === 'title') {
    return (
      <RNText numberOfLines={numberOfLines} style={[{fontSize: 16, fontWeight: '700', color: _color}, margin, style]}>
        {children}
      </RNText>
    );
  }

  if (variant === 'subtitle1') {
    return (
      <RNText numberOfLines={numberOfLines} style={[{fontSize: 14, fontWeight: '700', color: _color}, margin, style]}>
        {children}
      </RNText>
    );
  }

  if (variant === 'subtitle2') {
    return (
      <RNText numberOfLines={numberOfLines} style={[{fontSize: 14, fontWeight: '500', color: _color}, margin, style]}>
        {children}
      </RNText>
    );
  }

  if (variant === 'body1') {
    return (
      <RNText numberOfLines={numberOfLines} style={[{fontSize: 14, color: _color}, margin, style]}>
        {children}
      </RNText>
    );
  }

  return (
    <RNText numberOfLines={numberOfLines} style={[{color: _color, ...margin, flexWrap: 'wrap', flexShrink: 1}, style]}>
      {children}
    </RNText>
  );
};

export default Text;
