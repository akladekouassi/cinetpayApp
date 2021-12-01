import React, { Suspense, lazy, useState, FunctionComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteEnum from './constants/RouteEnum';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { BaseTheme } from './MuiConfig';
import Loadable from './components/Loadables';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import { LoginPage } from './pages/Login';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as SCThemeProvider } from 'styled-components/macro';
import { jss } from './MuiConfig/jssConfig';
import { DBTokenRepository } from '../core/auth/UserTokenRepository';
import { GetUserTokenUseCase } from '../core/auth/GetUserTokenUseCase';
import { IsUserAuthenticatedUseCase } from '../core/auth/IsUserAuthenticatedUseCase';

const dbTokenRepository = new DBTokenRepository();
const isUserAuthenticatedUseCase = new IsUserAuthenticatedUseCase(dbTokenRepository);
const getUserTokenUseCase = new GetUserTokenUseCase(dbTokenRepository, isUserAuthenticatedUseCase);

const DashboardPage = Loadable(lazy(() => import('./pages/Dashboard/DashboardPage')));
const CompareUserProfilePage = Loadable(lazy(() => import('./pages/CompareUserProfile/CompareUserProfile')));

const App: FunctionComponent = () => {
  const [isAuth, setIsAuth] = useState<boolean>();

  React.useEffect(() => {
    const runUseCase = async () => {
      await isUserAuthenticatedUseCase.execute().then((auth) => setIsAuth(auth));
    };
    runUseCase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [new IsUserAuthenticatedUseCase(dbTokenRepository)]);

  return (
    <React.Fragment>
      <MuiThemeProvider theme={BaseTheme}>
        <StylesProvider jss={jss}>
          <SCThemeProvider theme={BaseTheme}>
            <CssBaseline />
            <Suspense fallback={'Loading...'}>
              <BrowserRouter>
                <Routes>
                  <ProtectedRoute path={RouteEnum.Home} element={<Layout />} isAuthenticated={isAuth!}>
                    <Route path={RouteEnum.Dashboard} element={<DashboardPage />} />
                    {/* <Route path={RouteEnum.FindUser} element={<FindeUserPage />} /> */}
                    <Route path={RouteEnum.CompareProfile} element={<CompareUserProfilePage />} />
                  </ProtectedRoute>
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </BrowserRouter>
            </Suspense>
          </SCThemeProvider>
        </StylesProvider>
      </MuiThemeProvider>
    </React.Fragment>
  );
};
export default App;
