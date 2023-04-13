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

export type Palette = {
  primary: PaletteColor;
  background: BackgroundColor;
  text: TextColor;
  common: CommonColors;
};
