import React from 'react';

import {useColorScheme} from 'react-native';

import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from 'styled-components/native';
import {darkLightTheme} from './styles/themes/darkLightTheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './navigators/RootStack';
import i18n from './assets/locale/i18n';
import {locale} from 'expo-localization';

i18n.defaultLocale = 'en';
i18n.locale = locale;
i18n.enableFallback = true;

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
