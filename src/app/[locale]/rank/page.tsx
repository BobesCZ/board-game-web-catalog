import { getActiveGameListRecord, getGameList } from '@/admin/actions';
import { AppLayout, Rank } from '@/layouts';

export default async function RankPage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout value={{ gameList, activeGameListRecord }}>
      <Rank />
    </AppLayout>
  );
}
