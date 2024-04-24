import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { APP_LOCALES, APP_LOCALE_PREFIX, APP_PATHNAMES } from './i18n';

export const {
  Link: NextLink,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createLocalizedPathnamesNavigation({
  locales: APP_LOCALES,
  localePrefix: APP_LOCALE_PREFIX,
  pathnames: APP_PATHNAMES,
});
