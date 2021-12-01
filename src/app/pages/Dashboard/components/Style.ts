import styled from 'styled-components/macro';
import { Grid, Typography } from '@material-ui/core';
import { Colors } from '../../../MuiConfig/colors';

export const GridStyled = styled(Grid)`
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const LeftLabelContainer = styled(Typography)`
  margin: 0 69px 0 0;
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.brown[700]};
`;

export const RigthLabelTitleContainer = styled(Typography)`
  font-size: 15px;
  color: inherit;
  line-height: 1.47;
  letter-spacing: 0.27px;
  display: block;
  color: ${Colors.brown[700]};
`;

export const Bloc = styled('div')`
  padding: 16px;
  color: ${Colors.brown[500]};
`;
