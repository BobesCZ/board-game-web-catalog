import { Urls } from '../config';

// A list of all locales that are supported
export const APP_LOCALES = ['cs', 'en'];

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
};
