import React from 'react';
import Loadable from '../../components/Loadables';

export const LoginPage = Loadable(
  React.lazy(() =>
    import(
      /* webpackChunkName: "login-page" */
      './LoginPage'
    )
  )
);
