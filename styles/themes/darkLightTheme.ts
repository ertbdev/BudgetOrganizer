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
      },
      background: {
        default: dark ? '#111112' : '#FFF',
        paper: dark ? '#2A2C38' : '#FFF',
      },
      text: {
        primary: dark ? '#fff' : '#000',
        disabled: dark ? '#fff' : '#000',
        secondary: dark ? '#fff' : '#000',
      },
      error: {main: '#FF0000'},
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
