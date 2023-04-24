import React, {useEffect, useState} from 'react';

import Svg, {Circle} from 'react-native-svg';
import {colorList} from '../../assets/constants/colorList';
import Animated, {SharedValue, interpolate, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';

type Props = {
  data: number[];
  colors?: string[];
  size?: number;
  bg?: string;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedSlice = ({
  center,
  circunference,
  color,
  percentage,
  progress,
  radius,
  startAngle,
}: {
  center: number;
  circunference: number;
  color: string;
  percentage: number;
  progress: SharedValue<number>;
  radius: number;
  startAngle: number;
}) => {
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(progress.value, [0, 1], [circunference, circunference * (1 - percentage)]),
    transform: [
      {translateX: center},
      {translateY: center},
      {rotate: `${interpolate(progress.value, [0, 1], [0, startAngle])}deg`},
      {translateX: -center},
      {translateY: -center},
    ],
  }));
  return (
    <AnimatedCircle
      cy={center}
      cx={center}
      r={radius}
      fill={'transparent'}
      stroke={color}
      strokeWidth={radius * 2}
      strokeDasharray={circunference}
      animatedProps={animatedProps}
      originX={center}
      originY={center}
    />
  );
};

const PieChart = ({data, colors, size = 200, bg = 'transparent'}: Props) => {
  const center = size / 2;
  const radius = size / 4;
  const circunference = radius * 2 * Math.PI;

  const [chartData, setChartData] = useState<{percentage: number; color: string; startAngle: number}[]>();

  const progress = useSharedValue(0);

  const getPieChartData = (values: number[]) => {
    let angle = 0;
    const totalValue = values.reduce((acc, item) => acc + item, 0);
    const pieChartData: {percentage: number; color: string; startAngle: number}[] = [];

    values.forEach((item, index) => {
      const itemPercentage = item / totalValue;
      pieChartData.push({
        percentage: itemPercentage,
        color: colors ? colors[index % colors.length] : colorList[index % colorList.length],
        startAngle: angle,
      });
      angle += itemPercentage * 360;
    });
    return pieChartData;
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(getPieChartData(data));
    }
  }, [data]);

  useEffect(() => {
    console.log('changed');
    if (chartData && chartData.length > 0) {
      if (progress.value > 0) {
        progress.value = withTiming(0, {duration: 500}, isFinished => {
          if (isFinished) {
            progress.value = withTiming(1, {duration: 1500});
          }
        });
      } else {
        progress.value = withTiming(1);
      }
    }
  }, [chartData]);

  if (!chartData || chartData.length < 0) {
    return null;
  }

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {chartData.map((item, index) => (
        <AnimatedSlice
          center={center}
          circunference={circunference}
          color={item.color}
          key={index}
          progress={progress}
          percentage={item.percentage}
          radius={radius}
          startAngle={item.startAngle}
        />
      ))}
    </Svg>
  );
};

export default PieChart;
