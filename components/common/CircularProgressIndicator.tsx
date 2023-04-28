import React, {useEffect, useState} from 'react';

import Svg, {Circle} from 'react-native-svg';
import {colorList} from '../../assets/constants/colorList';
import Animated, {SharedValue, interpolate, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';

type Props = {
  value?: number;
  color?: string;
  backColor?: string;
  dangerColor?: string;
  size?: number;
  lineWidth?: number;
  bg?: string;
  offset?: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressIndicator = ({
  value = 0.5,
  offset = 0.2,
  lineWidth = 4,
  color = '#000',
  backColor = '#999999',
  dangerColor = '#f70b46',
  size = 200,
  bg = 'transparent',
}: Props) => {
  const center = size / 2;
  const radius = size / 2 - lineWidth / 2;
  const circunference = radius * 2 * Math.PI;

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circunference * (1 - progress.value * (1 - offset)),
  }));

  useEffect(() => {
    const percentage = value > 1 ? 1 : value < 0 ? 0 : value;
    progress.value = withTiming(percentage);
  }, [value]);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <AnimatedCircle
        cy={center}
        cx={center}
        r={radius}
        fill={bg}
        stroke={backColor}
        strokeWidth={lineWidth}
        strokeDasharray={circunference}
        strokeDashoffset={circunference * offset}
        rotation={90 + (offset / 2) * 360}
        originX={center}
        originY={center}
        strokeLinecap="round"
      />
      <AnimatedCircle
        cy={center}
        cx={center}
        r={radius}
        fill={'transparent'}
        stroke={value > 1 ? dangerColor : color}
        strokeWidth={lineWidth}
        strokeDasharray={circunference}
        animatedProps={animatedProps}
        rotation={90 + (offset / 2) * 360}
        originX={center}
        originY={center}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default CircularProgressIndicator;
