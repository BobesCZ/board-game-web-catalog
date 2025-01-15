import { ThemeOptions } from '@mui/material';

export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      // Button, Link
      main: '#8D2926',
    },
    secondary: {
      // Form background
      light: '#F0F0E5',
      // Header + Footer text
      main: '#FFF7F7',
      // Header + Footer background
      dark: '#8D2926',
    },
    background: {
      // Body background
      default: '#FFF7F7',
    },
    divider: '#e1d4b7',
  },
};
