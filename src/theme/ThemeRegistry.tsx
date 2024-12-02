'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppStore } from '@/store';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

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
