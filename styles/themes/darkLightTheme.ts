import {DefaultTheme} from 'styled-components/native';

export const darkLightTheme = (dark?: boolean) => {
  const theme: DefaultTheme = {
    palette: {
      primary: {
        main: dark ? '#719FEF' : '#0065FF',
      },
      background: {
        default: dark ? '#111112' : '#FFF',
        paper: dark ? '#2A2C38' : '#FFF',
      },
      common: {
        black: '#000',
        white: '#FFF',
      },
      text: {
        primary: dark ? '#000' : '#FFF',
        disabled: dark ? '#000' : '#FFF',
        secondary: dark ? '#000' : '#FFF',
      },
    },
  };
  return theme;
};
