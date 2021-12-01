/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, createContext, FunctionComponent, useState, useContext } from 'react';
import { IsUserAuthenticatedUseCase } from '../../core/auth/IsUserAuthenticatedUseCase';
import { KeepUserTokenUseCase } from '../../core/auth/SaveUserTokenUseCase';
import { DBUserRepository } from '../../data/user/DBUserRepository';
import { DBTokenRepository } from '../../core/auth/UserTokenRepository';
import { SaveCurrentUserUseCase } from '../../core/user/SaveCurrentUserUseCase';
import { GetUserTokenUseCase } from '../../core/auth/GetUserTokenUseCase';

export interface Session {
  isAuthenticated?: boolean;
  redirectPathOnAuthentication?: string;
  token?: string;
  firstname?: boolean;
  lastname?: string;
}

const localUserRepository = new DBUserRepository();
const dbTokenRepository = new DBTokenRepository();
const saveCurrentUserUseCase = new SaveCurrentUserUseCase(localUserRepository);
const keepUserTokenUseCase = new KeepUserTokenUseCase(dbTokenRepository);
const isUserAuthenticatedUseCase = new IsUserAuthenticatedUseCase(dbTokenRepository);
const getUserTokenUseCase = new GetUserTokenUseCase(dbTokenRepository, isUserAuthenticatedUseCase);

const initialSession: Session = {};

// eslint-disable-next-line func-call-spacing
export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => null]);

export const useSessionContext = () => useContext(SessionContext);
export const SessionContextProvider: FunctionComponent = (props) => {
  const [sessionState, setSessionState] = useState(initialSession);
  const defaultSessionContext: [Session, typeof setSessionState] = [sessionState, setSessionState];

  useEffect(() => {
    async function runUsecase() {
      const isAuthenticated = await isUserAuthenticatedUseCase.execute();
      if (isAuthenticated) {
        setSessionState({
          ...sessionState,
          isAuthenticated: true,
        });
      } else {
        setSessionState({
          ...sessionState,
          token: undefined,
          isAuthenticated: false,
        });
      }
    }
    runUsecase();
    // eslint-disable-next-line
  }, [sessionState.isAuthenticated]);

  return <SessionContext.Provider value={defaultSessionContext}>{props.children}</SessionContext.Provider>;
};
