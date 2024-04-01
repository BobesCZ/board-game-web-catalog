import {
  Sansita,
  Signika,
  Ubuntu
} from 'next/font/google';

export const GoogleFont = Signika
({ subsets: ['latin-ext'], weight: ['400', '700'], fallback: ['cursive'] });

export const GoogleFont2 = Sansita
({ subsets: ['latin-ext'], weight: ['400', '700'], fallback: ['cursive'] });

export const GoogleFont3 = Ubuntu
({ subsets: ['latin-ext'], weight: ['400', '700'], fallback: ['cursive'] });
