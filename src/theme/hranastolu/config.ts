import { ThemeOptions } from '@mui/material';

export const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      // Button, Link
      main: '#A84E43',
    },
    secondary: {
      // Form background
      light: '#FECF01',
      // Header + Footer text
      main: '#e7dbc5',
      // Header + Footer background
      dark: '#81372D',
    },
    background: {
      // Body background
      default: '#FFFBE1',
    },
    divider: '#e1d4b7',
  },
};
