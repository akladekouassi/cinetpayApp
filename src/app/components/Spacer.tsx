import styled from 'styled-components/macro';

const SpacingSizes = {
  xSmall: 1,
  small: 2,
  medium: 3,
  large: 4,
  xLarge: 5,
};

export interface SpacerProps {
  direction?: 'vertical' | 'horizontal';
  size?: keyof typeof SpacingSizes;
}

export const Spacer = styled('span')<SpacerProps>((props) => ({
  display: 'block',
  marginTop: props.direction === 'vertical' && props.theme.spacing(SpacingSizes[props.size!]),
  marginLeft: props.direction === 'horizontal' && props.theme.spacing(SpacingSizes[props.size!]),
}));

Spacer.defaultProps = {
  direction: 'vertical',
  size: 'medium',
  'aria-hidden': 'true',
};
