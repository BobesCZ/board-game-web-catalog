import createMiddleware from 'next-intl/middleware';
import { APP_LOCALES, APP_LOCALE_PREFIX } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: APP_LOCALES,
  localePrefix: APP_LOCALE_PREFIX,

  // Used when no locale matches
  defaultLocale: 'cs',
});

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
