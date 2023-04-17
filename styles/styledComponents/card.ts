import styled from 'styled-components/native';
import {Margin, Padding} from '../../types/container';

type ContainerProps = {
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  minHeight?: string | number;
  maxHeight?: string | number;
  width?: string | number;
  /**backgroundColor */
  bg?: string;
  /**borderRadius */
  br?: number;
} & Padding &
  Margin;

export const Card = styled.TouchableOpacity<ContainerProps>`
  background-color: ${({theme, bg}) => bg || theme.palette.background.default};
  border-radius: ${({br}) => br || 10}px;
  width: ${({width}) => (width ? (typeof width === 'string' ? width : width + 'px') : '96%')};
  ${({minHeight}) => minHeight && `minHeight: ${typeof minHeight === 'string' ? minHeight : minHeight + 'px'};`}
  ${({maxHeight}) => maxHeight && `maxHeight: ${typeof maxHeight === 'string' ? maxHeight : maxHeight + 'px'};`}

  padding-top: ${({pt, py, p}) => (typeof (pt || py || p) === 'string' ? pt || py || p : (pt || py || p || 0) + 'px')};
  padding-bottom: ${({pb, py, p}) => (typeof (pb || py || p) === 'string' ? pb || py || p : (pb || py || p || 0) + 'px')};
  padding-left: ${({pl, px, p}) => (typeof (pl || px || p) === 'string' ? pl || px || p : (pl || px || p || 0) + 'px')};
  padding-right: ${({pr, px, p}) => (typeof (pr || px || p) === 'string' ? pr || px || p : (pr || px || p || 0) + 'px')};

  margin-top: ${({mt, my, m}) => (typeof (mt || my || m) === 'string' ? mt || my || m : (mt || my || m || 0) + 'px')};
  margin-bottom: ${({mb, my, m}) => (typeof (mb || my || m) === 'string' ? mb || my || m : (mb || my || m || 0) + 'px')};
  margin-left: ${({ml, mx, m}) => (typeof (ml || mx || m) === 'string' ? ml || mx || m : (ml || mx || m || 0) + 'px')};
  margin-right: ${({mr, mx, m}) => (typeof (mr || mx || m) === 'string' ? mr || mx || m : (mr || mx || m || 0) + 'px')};

  shadow-color: ${({theme}) => theme.palette.gray[700]};
  shadow-offset: 1px 1px;
  shadow-opacity: 0.4;
  shadow-radius: 3px;
  elevation: 5;

  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'center'};
`;
