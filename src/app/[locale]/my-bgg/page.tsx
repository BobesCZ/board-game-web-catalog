import { getActiveGameListRecord } from '@/admin/actions';
import { AppLayout, MyBgg } from '@/layouts';

export default async function MyBggPage() {
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout activeGameListRecord={activeGameListRecord}>
      <MyBgg />
    </AppLayout>
  );
}
