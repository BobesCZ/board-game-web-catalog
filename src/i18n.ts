import { Pathnames } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Urls } from './config';

// A list of all locales that are supported
export const APP_LOCALES = ['cs', 'en'];

// `defaultLocale` is without prefix
export const APP_LOCALE_PREFIX = 'as-needed';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!APP_LOCALES.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

export const APP_PATHNAMES = {
  [Urls.ADMIN]: {
    cs: Urls.ADMIN,
    en: Urls.ADMIN,
  },
  [Urls.ADMIN_NEW]: {
    cs: Urls.ADMIN_NEW,
    en: Urls.ADMIN_NEW,
  },
  [Urls.ADMIN_SETTINGS]: {
    cs: Urls.ADMIN_SETTINGS,
    en: Urls.ADMIN_SETTINGS,
  },
  [Urls.ADMIN_USERS]: {
    cs: Urls.ADMIN_USERS,
    en: Urls.ADMIN_USERS,
  },
  [Urls.ADMIN_WEB_EVENTS]: {
    cs: Urls.ADMIN_WEB_EVENTS,
    en: Urls.ADMIN_WEB_EVENTS,
  },
  [Urls.ADMIN + '/[gameListRecordId]']: {
    cs: '/admin/[gameListRecordId]',
    en: '/admin/[gameListRecordId]',
  },
  [Urls.ADDED]: {
    cs: '/nove-pridane-hry',
    en: '/newly-added-games',
  },
  [Urls.NAME]: {
    cs: '/hledat-podle-jmena',
    en: '/search-by-name',
  },
  [Urls.RANK]: {
    cs: '/nejlepsi-hry',
    en: '/best-games',
  },
  [Urls.SEARCH]: '/',
} satisfies Pathnames<typeof APP_LOCALES>;
