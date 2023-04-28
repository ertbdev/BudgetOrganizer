import styled from 'styled-components/native';

type Props = {
  horizontal?: boolean;
  w?: string | number;
  h?: string | number;
};

export const FlatListSeparator = styled.View<Props>`
  ${({horizontal, h, w}) =>
    horizontal
      ? `height:${h ? h : '100%'}${typeof h === 'number' ? 'px' : ''} widht:${w ? w : 10}${typeof w === 'string' ? '' : 'px'}`
      : `height:${h ? h : 10}${typeof h === 'string' ? '' : 'px'} widht:${w ? w : '100%'}${typeof w === 'number' ? 'px' : ''}`}
`;
