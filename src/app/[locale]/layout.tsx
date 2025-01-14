import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';
import { IS_DEVELOPMENT } from '@/admin/config';

export const metadata = {
  title: 'Webový katalog deskových her',
  icons: {
    icon: '/Logo.png',
  },
};

type Props = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default function RootLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          {!IS_DEVELOPMENT && <Analytics />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
