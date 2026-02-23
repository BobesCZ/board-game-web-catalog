'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { useAppStore } from '@/store';

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { appTheme } = useAppStore();

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={appTheme.theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
