import { getUserAuthRecords } from '@/admin/actions';
import { Users } from '@/admin/layouts';

export default async function UsersPage() {
  const userAuthRecords = await getUserAuthRecords();

  return <Users userAuthRecords={userAuthRecords} />;
}
