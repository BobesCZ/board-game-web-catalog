'use client';

import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { AppFooter, AppLoader, AppNav } from '@/components';
import { AppStoreProvider, AppStoreValue } from '@/store';
import { ThemeRegistry } from '@/theme';

type Props = {
  children?: ReactNode;
  value: AppStoreValue;
  isLoading?: boolean;
};

export function AppLayout({ children, value, isLoading }: Props) {
  return (
    <ThemeRegistry>
      <AppStoreProvider value={value}>
        <Stack sx={{ minHeight: '100vh' }}>
          <AppNav />
          {isLoading ? <AppLoader /> : <Box flexGrow={1}>{children}</Box>}
          <AppFooter />
        </Stack>
      </AppStoreProvider>
    </ThemeRegistry>
  );
}
