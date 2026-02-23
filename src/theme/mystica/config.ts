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
      light: '#e7dbc5',
      // Header + Footer text
      main: '#ede4d4',
      // Header + Footer background
      dark: '#292112',
    },
    background: {
      // Body background
      default: '#f9f6f1',
    },
    divider: '#e1d4b7',
  },
};
