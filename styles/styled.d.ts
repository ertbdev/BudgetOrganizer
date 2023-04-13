import 'styled-components/native';
import {Palette} from '../types/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    palette: Palette;
  }
}
