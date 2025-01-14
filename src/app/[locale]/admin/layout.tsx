import { ReactNode } from 'react';
import { getUserAuthRecords } from '@/admin/actions';
import { SessionProvider } from '@/admin/components';
import { AppAdminLayout } from '@/admin/layouts';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  const userAuthRecords = await getUserAuthRecords();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <AppAdminLayout userAuthRecords={userAuthRecords}>{children}</AppAdminLayout>
    </SessionProvider>
  );
}
