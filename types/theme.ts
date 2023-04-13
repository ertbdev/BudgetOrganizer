type PaletteColor = {
  main: string;
};

type BackgroundColor = {
  default: string;
  paper: string;
};

type CommonColors = {
  black: string;
  white: string;
};

type TextColor = {
  primary: string;
  secondary: string;
  disabled: string;
};

export type Color = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type Palette = {
  common: CommonColors;
  primary: PaletteColor;
  background: BackgroundColor;
  text: TextColor;
  error: PaletteColor;
  gray: Color;
};
