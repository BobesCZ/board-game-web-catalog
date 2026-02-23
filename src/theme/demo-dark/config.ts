import { ThemeOptions } from '@mui/material';

export const DARK_THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      // Button, Link
      main: '#ce4b27',
    },
    secondary: {
      // Form background
      light: '#333333',
      // Header + Footer text
      main: '#e0e0e0',
      // Header + Footer background
      dark: '#0A0A0A',
    },
    background: {
      // Body background
      default: '#212121',
      paper: '#212121',
    },
    divider: '#e0e0e0',
  },
};
