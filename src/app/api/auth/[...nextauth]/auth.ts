import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getUserAuthRecords } from '@/admin/actions';
import { getUserAuthRecordByPassword } from '@/admin/components';
import { DISABLE_CREDENTIALS_ON_PRODUCTION, IS_DEVELOPMENT } from '@/admin/config';

const providers = [];

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const secret = process.env.NEXTAUTH_SECRET;

if (clientId && clientSecret) {
  providers.push(
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  );
}

const vercelEnv = process.env.VERCEL_ENV;

if (IS_DEVELOPMENT || vercelEnv === 'preview' || (vercelEnv === 'production' && !DISABLE_CREDENTIALS_ON_PRODUCTION)) {
  providers.push(
    CredentialsProvider({
      credentials: {
        username: { label: 'Jméno', type: 'text' },
        userPassword: { label: 'Heslo', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const userAuthRecords = await getUserAuthRecords();
        const userAuthRecord = getUserAuthRecordByPassword(credentials, userAuthRecords);

        if (!userAuthRecord) return null;

        return {
          id: userAuthRecord.recordId.toString(),
          name: userAuthRecord.user.name,
          email: userAuthRecord.user.email,
        };
      },
    }),
  );
}

export const authOptions = {
  providers,
  secret,
  theme: {
    colorScheme: 'light',
  },
} satisfies NextAuthOptions;

export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
