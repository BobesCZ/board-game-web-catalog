import { getActiveGameListRecord, getGameList } from '@/actions';
import { AppLayout } from '@/layouts/AppLayout';
import MyBgg from '@/layouts/MyBgg/MyBgg';

export default async function MyBggPage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout value={{ gameList, activeGameListRecord }}>
      <MyBgg />
    </AppLayout>
  );
}
