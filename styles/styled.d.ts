import 'styled-components/native';
import {Palette} from './themes/types';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    palette: Palette;
  }
}
