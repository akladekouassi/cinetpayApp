import { AppBar, Drawer, ListItem, Typography } from '@material-ui/core';
import styled from 'styled-components/macro';

const drawerWidth = 240;
const drawerWidthMobile = 320;
export const LayoutPage = styled('main')`
  display: flex;
`;
export const LayoutDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: ${drawerWidth}px;
  }

  ${(props: any) => props.theme.breakpoints.down('lg')} {
    flex-shrink: 0;
    width: ${drawerWidthMobile}px;
    .MuiDrawer-paper {
      width: ${drawerWidthMobile}px;
    }
  }
`;

export const LayoutDrawerContent = styled('div')`
  overflow: 'auto';
`;

export const LayoutDrawerContentLogo = styled('img')`
  height: 46px;
  margin-top: 20px;
  margin-left: 50px;
  text-align: center;
`;

export const LayoutDrawerContentListItem = styled(ListItem)<any>`
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
  display: block;
  &:hover {
    background-color: 'red';
  }
`;

export const LayoutDrawerContentTypography = styled(Typography)`
  font-weight: 500;
  font-size: 1.05rem;
`;

export const LayoutAppBar = styled(AppBar)`
  display: flex;
  min-height: 64px;
  height: 64px;
  background-color: #faf7f5;
  justify-content: flex-end;
  flex-direction: row;
`;

export const LayoutMain = styled('div')`
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;

  ${(props: any) => props.theme.breakpoints.up('md')} {
    width: calc(100% - 240px);
    max-width: calc(100% - 240px);
  }
`;

export const LayoutMainMobile = styled('div')`
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 40px;
`;
