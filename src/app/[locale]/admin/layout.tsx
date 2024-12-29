import { ReactNode } from 'react';
import { getUserAuthRecords } from '@/actions/userAuth';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Layout } from './_components/Layout';
import { SessionProvider } from './_components/SessionProvider';

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  const userAuthRecords = await getUserAuthRecords();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Layout userAuthRecords={userAuthRecords}>{children}</Layout>
    </SessionProvider>
  );
}
