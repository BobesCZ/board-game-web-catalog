import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { IS_DEVELOPMENT } from '@/admin/config';

export const metadata = { title: 'Webový katalog deskových her', icons: { icon: '/Logo.png' } };

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

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
