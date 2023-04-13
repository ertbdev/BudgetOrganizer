import React from 'react';

import {useColorScheme} from 'react-native';

import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from 'styled-components/native';
import {darkLightTheme} from './styles/themes/darkLightTheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './navigators/RootStack';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={darkLightTheme(colorScheme === 'dark')}>
        <StatusBar style="auto" />
        <RootStack />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
