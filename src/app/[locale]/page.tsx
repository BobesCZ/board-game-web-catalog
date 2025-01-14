import { getActiveGameListRecord, getGameList } from '@/admin/actions';
import { AppLayout, Search } from '@/layouts';

export default async function SearchPage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout value={{ gameList, activeGameListRecord }}>
      <Search />
    </AppLayout>
  );
}
