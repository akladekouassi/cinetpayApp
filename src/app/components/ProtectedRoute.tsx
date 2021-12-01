import * as React from 'react';
import { RouteProps } from 'react-router';
import { useLocation, Navigate, Route } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export function ProtectedRoute({ element, isAuthenticated, ...rest }: ProtectedRouteProps) {
  const { pathname } = useLocation();

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          element
        ) : (
          <Navigate
            to={`/login`}
            state={{
              from: pathname,
            }}
          />
        )
      }
    />
  );
}
export default ProtectedRoute;
