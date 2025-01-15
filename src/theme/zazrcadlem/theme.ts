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
  fontSize: 24,
  fontWeight: 600,
  [theme.breakpoints.up('lg')]: {
    fontSize: 32,
  },
};

theme.typography.h2 = {
  fontSize: 24,
  fontWeight: 600,
  [theme.breakpoints.up('lg')]: {
    fontSize: 28,
  },
};

theme.typography.h3 = {
  fontSize: 22,
  fontWeight: 600,
};

theme.typography.h4 = {
  fontSize: 18,
  fontWeight: 600,
};

theme.typography.body1 = {
  ...theme.typography.body1,
  fontSize: 16,
};

theme.typography.body2 = {
  ...theme.typography.body2,
  fontSize: 14,
};

export { theme as zazrcadlemTheme };
