import { getActiveGameListRecord } from '@/admin/actions';
import { AppLayout, Rank } from '@/layouts';

export default async function RankPage() {
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout activeGameListRecord={activeGameListRecord}>
      <Rank />
    </AppLayout>
  );
}
