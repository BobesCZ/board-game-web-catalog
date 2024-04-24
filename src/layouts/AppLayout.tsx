'use client';

import { AppFooter, AppLoader, AppNav } from '@/components';
import { AppStoreProvider, AppStoreValue } from '@/store';
import { ThemeRegistry } from '@/theme/ThemeRegistry';
import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  value: Pick<AppStoreValue, 'gameList' | 'activeGameListRecord'>;
  isLoading?: boolean;
};

export function AppLayout({ children, value, isLoading }: Props) {
  return (
    <AppStoreProvider value={value}>
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
