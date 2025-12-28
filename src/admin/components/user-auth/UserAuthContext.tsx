'use client';

import { createContext, useContext } from 'react';
import { UseUserAuthReturn } from './types';

export const UserAuthContext = createContext<UseUserAuthReturn['userAuthRecord']>(null);

export const useUserAuthContext = () => {
  const context = useContext(UserAuthContext);

  if (context === undefined) {
    throw new Error('useUserAuthContext must be used within a UserAuthContextProvider');
  }

  return context;
};
