'use client';

import { createTheme } from '@mui/material/styles';
import { GoogleFont } from './fonts';
import { LIGHT_THEME } from './config';

const theme = createTheme({
  typography: {
    fontFamily: GoogleFont.style.fontFamily,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontSize: 16,
  },
  ...LIGHT_THEME,
});

theme.typography.h1 = {
  fontSize: 26,
  fontWeight: 700,
  [theme.breakpoints.up('lg')]: {
    fontSize: 40,
  },
};

theme.typography.h2 = {
  fontSize: 24,
  fontWeight: 700,
  [theme.breakpoints.up('lg')]: {
    fontSize: 36,
  },
};

theme.typography.h3 = {
  fontSize: 22,
  fontWeight: 700,
  [theme.breakpoints.up('lg')]: {
    fontSize: 24,
  },
};

theme.typography.h4 = {
  fontSize: 18,
  fontWeight: 700,
  [theme.breakpoints.up('lg')]: {
    fontSize: 20,
  },
};

theme.typography.body1 = {
  ...theme.typography.body1,
  fontSize: 16,
  [theme.breakpoints.up('lg')]: {
    fontSize: 18,
  },
};

theme.typography.body2 = {
  ...theme.typography.body2,
  fontSize: 14,
  [theme.breakpoints.up('lg')]: {
    fontSize: 16,
  },
};

export { theme };
