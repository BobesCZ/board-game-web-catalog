import { defineRouting } from 'next-intl/routing';
import { Urls } from '../config';

// A list of all locales that are supported
export const APP_LOCALES = ['cs', 'en'] as const;

export const routing = defineRouting({
  locales: APP_LOCALES,
  // `defaultLocale` is without prefix
  localePrefix: 'as-needed',
  // Used when no locale matches
  defaultLocale: 'cs',
  pathnames: {
    [Urls.ADMIN]: { cs: Urls.ADMIN, en: Urls.ADMIN },
    [Urls.ADMIN_NEW]: { cs: Urls.ADMIN_NEW, en: Urls.ADMIN_NEW },
    [Urls.ADMIN_SETTINGS]: { cs: Urls.ADMIN_SETTINGS, en: Urls.ADMIN_SETTINGS },
    [Urls.ADMIN_USERS]: { cs: Urls.ADMIN_USERS, en: Urls.ADMIN_USERS },
    [Urls.ADMIN_WEB_EVENTS]: { cs: Urls.ADMIN_WEB_EVENTS, en: Urls.ADMIN_WEB_EVENTS },
    [Urls.ADMIN + '/[gameListRecordId]']: { cs: '/admin/[gameListRecordId]', en: '/admin/[gameListRecordId]' },
    [Urls.ADDED]: { cs: '/nove-pridane-hry', en: '/newly-added-games' },
    [Urls.NAME]: { cs: '/hledat-podle-jmena', en: '/search-by-name' },
    [Urls.MY_BGG]: { cs: '/muj-bgg', en: '/my-bgg' },
    [Urls.RANK]: { cs: '/nejlepsi-hry', en: '/best-games' },
    [Urls.SEARCH]: '/',
  },
});
