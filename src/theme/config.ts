import { Theme } from '@mui/material';
import { mysticaTheme } from './mystica';
import { zazrcadlemTheme } from './zazrcadlem';
import { hranaStoluTheme } from './hranastolu';
import { demoTheme } from './demo';
import { demoDarkTheme } from './demo-dark';

export type AppThemeType = {
  id: string;
  name: string;
  theme: Theme;
};

export const APP_THEME_OPTIONS: AppThemeType[] = [
  { id: 'demo', name: 'Demo', theme: demoTheme },
  { id: 'demo-dark', name: 'Demo (tmavý režim)', theme: demoDarkTheme },
  { id: 'hranastolu', name: 'Hrana Stolu', theme: hranaStoluTheme },
  { id: 'mystica', name: 'Mystica', theme: mysticaTheme },
  { id: 'zazrcadlem', name: 'Za zrcadlem', theme: zazrcadlemTheme },
];

export const APP_THEME_DEFAULT: AppThemeType = APP_THEME_OPTIONS[0];
