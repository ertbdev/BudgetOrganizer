import {DefaultTheme} from 'styled-components/native';

export const darkLightTheme = (dark?: boolean) => {
  const theme: DefaultTheme = {
    palette: {
      common: {
        black: '#000',
        white: '#FFF',
      },
      primary: {
        main: dark ? '#719FEF' : '#0065FF',
        light: '#719FEF',
      },
      background: {
        default: dark ? '#111112' : '#FFF',
        paper: dark ? '#2A2C38' : '#FFF',
      },
      text: {
        primary: dark ? '#fff' : '#212121',
        disabled: dark ? '#fff' : '#000',
        secondary: dark ? '#fff' : '#000',
      },
      error: {main: '#FF0000', light: '#EF5350'},
      success: {main: '#2E7D32', light: '#4CAF50'},
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
    },
  };
  return theme;
};
