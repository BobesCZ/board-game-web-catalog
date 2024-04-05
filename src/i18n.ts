import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

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
