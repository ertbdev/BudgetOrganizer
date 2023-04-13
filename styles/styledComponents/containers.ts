import styled from 'styled-components/native';

type ContainerProps = {
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  height?: string | number;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;
  ${props => props.height && props.height}
  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: ${props => props.alignItems || 'center'};
`;

export const RowContainer = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: ${props => props.alignItems || 'center'};
`;

export const ScreenContainer = styled.View<ContainerProps>`
  flex: 1;
  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: ${props => props.alignItems || 'center'};
`;
