import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { APP_LOCALES, APP_LOCALE_PREFIX } from './i18n';

export const {
  Link: NextLink,
  redirect,
  usePathname,
  useRouter,
} = createSharedPathnamesNavigation({
  locales: APP_LOCALES,
  localePrefix: APP_LOCALE_PREFIX,
});
