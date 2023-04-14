import styled from 'styled-components/native';
import {Padding} from '../../types/container';

type ContainerProps = {
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  height?: string | number;
} & Padding;

export const Container = styled.View<ContainerProps>`
  width: 100%;
  ${props => (props.height && typeof props.height === 'string' ? props.height : props.height + 'px')}
  padding-top: ${({pt, py, p}) => pt || py || p || 0}px;
  padding-bottom: ${({pb, py, p}) => pb || py || p || 0}px;
  padding-left: ${({pl, px, p}) => pl || px || p || 0}px;
  padding-right: ${({pr, px, p}) => pr || px || p || 0}px;
  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: ${props => props.alignItems || 'center'};
`;

export const RowContainer = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  ${props => props.height && props.height}
  padding-top: ${({pt, py, p}) => pt || py || p || 0}px;
  padding-bottom: ${({pb, py, p}) => pb || py || p || 0}px;
  padding-left: ${({pl, px, p}) => pl || px || p || 0}px;
  padding-right: ${({pr, px, p}) => pr || px || p || 0}px;
  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: ${props => props.alignItems || 'center'};
`;

export const ScreenContainer = styled.View<Pick<ContainerProps, 'alignItems' | 'justifyContent'>>`
  flex: 1;
  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: ${props => props.alignItems || 'center'};
`;
