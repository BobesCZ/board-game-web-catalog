'use client';

import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { GameListRecord } from '@/admin/actions';
import { AppFooter, AppLoader, AppNav } from '@/components';
import { AppStoreProvider } from '@/store';
import { ThemeRegistry } from '@/theme';

type Props = {
  children?: ReactNode;
  activeGameListRecord: GameListRecord | undefined;
  isLoading?: boolean;
};

export function AppLayout({ children, activeGameListRecord, isLoading }: Props) {
  return (
    <AppStoreProvider activeGameListRecord={activeGameListRecord}>
      <ThemeRegistry>
        <Stack sx={{ minHeight: '100vh' }}>
          <AppNav />
          {isLoading ? <AppLoader /> : <Box flexGrow={1}>{children}</Box>}
          <AppFooter />
        </Stack>
      </ThemeRegistry>
    </AppStoreProvider>
  );
}
