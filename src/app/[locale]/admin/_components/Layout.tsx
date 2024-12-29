'use client';

import { Container, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { AppNav } from './AppNav';
import LeftMenu from './LeftMenu';
import { SnackbarCustomProvider } from './snackbar';
import { ThemeRegistry } from './theme/ThemeRegistry';
import { UserAuthRecord, useUserAuth } from './userAuth';
import { UserAuth } from './userAuth/UserAuth';

type Props = {
  userAuthRecords: UserAuthRecord[];
  children: ReactNode;
};

export function Layout({ userAuthRecords, children }: Props) {
  const { userAuthRecord, handleCreateUserAuth, isPending } = useUserAuth(userAuthRecords);

  return (
    <ThemeRegistry>
      <SnackbarCustomProvider>
        <Stack sx={{ minHeight: '100vh' }}>
          <AppNav userAuthRecord={userAuthRecord} />
          <Stack direction="row" flexGrow={1}>
            <UserAuth userAuthRecord={userAuthRecord} handleCreateUserAuth={handleCreateUserAuth} isPending={isPending}>
              <LeftMenu />
              <Container maxWidth="lg" sx={{ ml: 4 }}>
                {children}
              </Container>
            </UserAuth>
          </Stack>
        </Stack>
      </SnackbarCustomProvider>
    </ThemeRegistry>
  );
}
