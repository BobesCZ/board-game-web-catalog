import { getActiveGameListRecord } from '@/admin/actions';
import { AppLayout, Name } from '@/layouts';

export default async function NamePage() {
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout activeGameListRecord={activeGameListRecord}>
      <Name />
    </AppLayout>
  );
}
