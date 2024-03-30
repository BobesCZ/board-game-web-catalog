import { getActiveGameListRecord, getGameList } from '@/actions';
import { AppLayout } from '@/layouts/AppLayout';
import Rank from '@/layouts/Rank/Rank';

export default async function RankPage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout value={{ gameList, activeGameListRecord }}>
      <Rank />
    </AppLayout>
  );
}
