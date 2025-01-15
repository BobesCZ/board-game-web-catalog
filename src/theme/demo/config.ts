import { ThemeOptions } from '@mui/material';

export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      // Button, Link
      main: '#ce4b27',
    },
    secondary: {
      // Form background
      light: '#e0e0e0',
      // Header + Footer text
      main: '#e0e0e0',
      // Header + Footer background
      dark: '#212121',
    },
    background: {
      // Body background
      default: '#fafafa',
    },
    divider: '#e1d4b7',
  },
};
