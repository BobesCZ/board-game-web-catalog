import { getActiveGameListRecord, getGameList } from '@/admin/actions';
import { Added, AppLayout } from '@/layouts';

export default async function NamePage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout value={{ gameList, activeGameListRecord }}>
      <Added />
    </AppLayout>
  );
}
