import styled, { css } from 'styled-components/macro';

export interface HstackProps {
  height?: string;
  vCentered?: boolean;
  hCentered?: boolean;
  $padding?: number;
}

export const HStack = styled('div')<HstackProps>`
  /* border: 1px solid #0f0; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${(p) => p.height};

  ${(p) => (p) =>
    p.vCentered &&
    css`
      align-items: center;
    `}

  ${(p) => (p) =>
    p.hCentered &&
    css`
      justify-content: center;
    `}

  ${(p) =>
    p.$padding &&
    css`
      padding: ${p.$padding}px;
    `}
`;

HStack.defaultProps = {
  height: 'auto',
  vCentered: false,
  hCentered: false,
};
