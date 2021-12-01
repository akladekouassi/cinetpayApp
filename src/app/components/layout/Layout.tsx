import { Box, Button, Grid, Hidden, List, SlideProps } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import { Spacer } from '../../components/Spacer';
import { Colors } from '../../MuiConfig/colors';
import theme from '../../MuiConfig/theme';
import React, { FunctionComponent, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  LayoutAppBar,
  LayoutDrawer,
  LayoutDrawerContent,
  LayoutDrawerContentListItem,
  LayoutDrawerContentLogo,
  LayoutDrawerContentTypography,
  LayoutMain,
  LayoutMainMobile,
  LayoutPage,
} from './LayoutStyle';

import 'styled-components/macro';
import Header from '../Header';
import { LogoutUsecase } from '../../../core/auth/LogoutUsecase';
import { DBTokenRepository } from '../../../core/auth/UserTokenRepository';
import { DBUserRepository } from '../../../data/user/DBUserRepository';

const logoutUsecase = new LogoutUsecase(new DBTokenRepository(), new DBUserRepository());

interface ContainerProps {
  children?: React.ReactNode;
}
const useStyles = makeStyles(() =>
  createStyles({
    buttonMenu: {
      width: 220,
      borderRadius: 4,
      minHeight: 56,
      paddingLeft: 15,
      justifyContent: 'left',
      color: Colors.brown[500],
      [theme.breakpoints.down('lg')]: {
        width: 270,
      },
    },
    buttonMenuCollapse: {
      paddingLeft: 60,
    },
    cardlanguage: {
      borderRadius: 6,
      marginBottom: 5,
    },
    cardlanguageActive: {
      background: '#FFE6C4',
      color: Colors.primary[500],
      border: '1px solid #FFE6C4',
    },
  })
);

export type SlideProp = {
  children?: React.ReactElement<any>;
} & SlideProps;

const Layout: FunctionComponent<ContainerProps> = ({ children }: ContainerProps) => {
  const classes = useStyles();
  const [openMenuDrawer, setOpenMenuDrawer] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktopDisplay = useMediaQuery('(min-width:1280px)');

  const logout = async () => {
    setOpenMenuDrawer(false);
    await logoutUsecase.execute().then(() => navigate('/login'));
  };

  return (
    <React.Fragment>
      <LayoutPage>
        <LayoutDrawer
          anchor="left"
          open={openMenuDrawer}
          onClose={() => {
            setOpenMenuDrawer(false);
          }}
          variant={isDesktopDisplay ? 'permanent' : 'temporary'}
        >
          <LayoutDrawerContent>
            <Hidden only={['xs', 'sm', 'md']}>
              <LayoutDrawerContentLogo alt="Kotscan Logo" src={'/cinetpay.png'} />
            </Hidden>
            <Hidden only={['lg', 'xl']}>
              <Grid
                container
                style={{
                  padding: '32px 10px 10px 16px',
                  backgroundColor: '#FFFBF5',
                }}
              >
                <Grid item xs={12} sm={12} md={12} style={{ paddingLeft: 10 }}></Grid>
                <Grid style={{ paddingLeft: 10, marginTop: 16 }}>
                  <Grid item xs={12} sm={12} md={12} style={{ paddingBottom: 5 }}></Grid>
                </Grid>
              </Grid>
            </Hidden>
            <List>
              <LayoutDrawerContentListItem onClick={() => setOpenMenuDrawer(false)}>
                <Button
                  component={NavLink}
                  to="/dashboard"
                  className={classes.buttonMenu}
                  color="inherit"
                  activeStyle={{
                    backgroundColor: Colors.primary[500],
                    color: Colors.white[900],
                  }}
                >
                  <LayoutDrawerContentTypography>Dashbord</LayoutDrawerContentTypography>
                </Button>
              </LayoutDrawerContentListItem>
              <Spacer size="xSmall" />

              <LayoutDrawerContentListItem onClick={() => setOpenMenuDrawer(false)}>
                <Button
                  component={NavLink}
                  to="/compare-profile"
                  className={classes.buttonMenu}
                  color="inherit"
                  activeStyle={{
                    backgroundColor: Colors.primary[500],
                    color: Colors.white[900],
                  }}
                >
                  <LayoutDrawerContentTypography>Comparer des profils</LayoutDrawerContentTypography>
                </Button>
              </LayoutDrawerContentListItem>
              <Spacer size="xSmall" />
            </List>
          </LayoutDrawerContent>
        </LayoutDrawer>

        <Hidden only={['xs', 'sm', 'md']}>
          <LayoutAppBar elevation={0} color="inherit">
            <Header logout={logout} />
          </LayoutAppBar>
          <LayoutMain>
            <Outlet />
          </LayoutMain>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutAppBar elevation={0} color="inherit">
            <Grid container justifyContent="space-between">
              <Grid item xs="auto">
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <Button onClick={() => setOpenMenuDrawer(true)}>
                    <MenuIcon />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs="auto">
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <LayoutDrawerContentLogo alt="Kotscan Logo" src={'/cinetpay.png'} />
                </Box>
              </Grid>
              <Grid item xs="auto">
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  {/* <NotificationIcon style={{ marginRight: 0 }} /> */}
                </Box>
              </Grid>
            </Grid>
          </LayoutAppBar>
          <LayoutMainMobile>
            <Outlet />
          </LayoutMainMobile>
        </Hidden>
      </LayoutPage>
    </React.Fragment>
  );
};
export default Layout;
