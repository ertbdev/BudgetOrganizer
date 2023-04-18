import React from 'react';

import {useColorScheme} from 'react-native';

import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from 'styled-components/native';
import {darkLightTheme} from './styles/themes/darkLightTheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './navigators/RootStack';
import i18n from './assets/locale/i18n';
import {locale} from 'expo-localization';
import {AuthProvider} from './providers/AuthProvider';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './redux/store';

i18n.defaultLocale = 'en';
i18n.locale = locale;
i18n.enableFallback = true;
i18n.missingBehavior = 'guess';
i18n.missingTranslationPrefix = '^';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <AuthProvider>
          <ThemeProvider theme={darkLightTheme(colorScheme === 'dark')}>
            <StatusBar style="auto" />
            <RootStack />
          </ThemeProvider>
        </AuthProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
