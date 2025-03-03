import { getActiveGameListRecord } from '@/admin/actions';
import { Added, AppLayout } from '@/layouts';

export default async function NamePage() {
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout activeGameListRecord={activeGameListRecord}>
      <Added />
    </AppLayout>
  );
}
