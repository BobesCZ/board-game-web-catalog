import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { APP_LOCALES, APP_PATHNAMES } from './config';

export const routing = defineRouting({
  locales: APP_LOCALES,
  defaultLocale: APP_LOCALES[0],
  pathnames: APP_PATHNAMES,
  localePrefix: 'as-needed',
});

export const { Link: NextLink, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
