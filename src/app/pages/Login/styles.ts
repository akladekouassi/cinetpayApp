import styled from 'styled-components/macro';
import { Button, darken, Grid } from '@material-ui/core';
import { BaseTheme } from '../../MuiConfig';
import { Colors } from '../../MuiConfig/colors';

export const LoginPageContainer = styled(Grid)`
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const LoginPageIllustrationSide = styled(Grid)`
  ${BaseTheme.breakpoints.up('md')} {
    background-color: ${Colors.brown[300]};
    flex-basis: 36%;
    max-width: 36%;
  }
  position: relative;
  background-position: top;
  background-size: 100% auto;
  background-repeat: no-repeat;
`;

export const LoginPageIllustrationImage = styled('img')`
  position: absolute;
  top: 1.4rem;
  left: 1.4rem;
`;

export const LoginPageContentSide = styled(Grid)`
  background-color: #ffffff;
  flex: 1;
  max-height: 100%;
  display: grid;
  row-gap: 1em;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    'top'
    'center'
    'bottom';
`;

export const LoginPageMetaRows = styled('div')`
  display: flex;
  justify-content: flex-end;

  &.top {
    grid-area: top;
    align-items: flex-start;
    padding: 0.5em;
  }

  &.bottom {
    grid-area: bottom;
    align-items: flex-end;
    padding: 0.5em;
  }
`;

export const LoginPageFormConnectButton = styled(Button)`
  &.MuiButton-containedPrimary {
    background-color: ${Colors.primary[500]};
    border-color: ${darken(Colors.primary[500], 0)};

    &:hover {
      background-color: ${darken(Colors.primary[500], 0.08)};
    }
  }

  &.MuiButton-contained.Mui-disabled {
    background-color: rgba(0, 0, 0, 0.12);
    border-color: transparent;
  }
`;
