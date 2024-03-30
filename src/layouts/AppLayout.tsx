'use client';

import { AppFooter, AppNav } from '@/components';
import { AppStoreProvider, AppStoreValue } from '@/store';
import { ThemeRegistry } from '@/theme/ThemeRegistry';
import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  value: AppStoreValue;
};

export function AppLayout({ children, value }: Props) {
  return (
    <ThemeRegistry>
      <AppStoreProvider value={value}>
        <Stack sx={{ minHeight: '100vh' }}>
          <AppNav />
          <Box flexGrow={1}>{children}</Box>
          <AppFooter />
        </Stack>
      </AppStoreProvider>
    </ThemeRegistry>
  );
}
