import styled from 'styled-components/native';
import {Margin, Padding} from '../../types/container';

type ContainerProps = {
  variant?: 'full' | 'full-width' | 'full-height' | 'auto';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  w?: string | number;
  h?: string | number;
  bg?: string;
  flex?: number;
} & Padding &
  Margin;

export const Container = styled.View<ContainerProps>`
  ${({flex}) => flex && `flex: ${flex};`}
  ${({bg}) => bg && `background-color: ${bg};`}

  ${({variant}) =>
    variant === 'full'
      ? 'width:100%; height:100%;'
      : variant === 'full-width'
      ? 'width:100%;'
      : variant === 'full-height'
      ? 'height:100%;'
      : ''}

  ${({w}) => w && `width: ${typeof w === 'string' ? w : w + 'px'};`}
  ${({h}) => h && `height: ${typeof h === 'string' ? h : h + 'px'};`}

  padding-top: ${({pt, py, p}) => (typeof (pt || py || p) === 'string' ? pt || py || p : (pt || py || p || 0) + 'px')};
  padding-bottom: ${({pb, py, p}) => (typeof (pb || py || p) === 'string' ? pb || py || p : (pb || py || p || 0) + 'px')};
  padding-left: ${({pl, px, p}) => (typeof (pl || px || p) === 'string' ? pl || px || p : (pl || px || p || 0) + 'px')};
  padding-right: ${({pr, px, p}) => (typeof (pr || px || p) === 'string' ? pr || px || p : (pr || px || p || 0) + 'px')};

  margin-top: ${({mt, my, m}) => (typeof (mt || my || m) === 'string' ? mt || my || m : (mt || my || m || 0) + 'px')};
  margin-bottom: ${({mb, my, m}) => (typeof (mb || my || m) === 'string' ? mb || my || m : (mb || my || m || 0) + 'px')};
  margin-left: ${({ml, mx, m}) => (typeof (ml || mx || m) === 'string' ? ml || mx || m : (ml || mx || m || 0) + 'px')};
  margin-right: ${({mr, mx, m}) => (typeof (mr || mx || m) === 'string' ? mr || mx || m : (mr || mx || m || 0) + 'px')};

  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: ${props => props.alignItems || 'center'};
`;

export const RowContainer = styled.View<ContainerProps>`
  ${({flex}) => flex && `flex: ${flex};`}
  flex-direction: row;
  ${({bg}) => bg && `background-color: ${bg};`}

  ${({variant}) =>
    variant === 'full'
      ? 'width:100%; height:100%;'
      : variant === 'full-width'
      ? 'width:100%'
      : variant === 'full-height'
      ? 'height:100%;'
      : ''}

  ${({w}) => w && `width: ${typeof w === 'string' ? w : w + 'px'};`}
  ${({h}) => h && `height: ${typeof h === 'string' ? h : h + 'px'};`}

  padding-top: ${({pt, py, p}) => (typeof (pt || py || p) === 'string' ? pt || py || p : (pt || py || p || 0) + 'px')};
  padding-bottom: ${({pb, py, p}) => (typeof (pb || py || p) === 'string' ? pb || py || p : (pb || py || p || 0) + 'px')};
  padding-left: ${({pl, px, p}) => (typeof (pl || px || p) === 'string' ? pl || px || p : (pl || px || p || 0) + 'px')};
  padding-right: ${({pr, px, p}) => (typeof (pr || px || p) === 'string' ? pr || px || p : (pr || px || p || 0) + 'px')};

  margin-top: ${({mt, my, m}) => (typeof (mt || my || m) === 'string' ? mt || my || m : (mt || my || m || 0) + 'px')};
  margin-bottom: ${({mb, my, m}) => (typeof (mb || my || m) === 'string' ? mb || my || m : (mb || my || m || 0) + 'px')};
  margin-left: ${({ml, mx, m}) => (typeof (ml || mx || m) === 'string' ? ml || mx || m : (ml || mx || m || 0) + 'px')};
  margin-right: ${({mr, mx, m}) => (typeof (mr || mx || m) === 'string' ? mr || mx || m : (mr || mx || m || 0) + 'px')};

  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: ${props => props.alignItems || 'center'};
`;

export const ScreenContainer = styled.View<Pick<ContainerProps, 'alignItems' | 'justifyContent'>>`
  flex: 1;
  width: 100%;
  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: ${props => props.alignItems || 'center'};
`;
