import { getActiveGameListRecord, getGameList } from '@/actions';
import { AppLayout } from '@/layouts/AppLayout';
import Search from '@/layouts/Search/Search';

export default async function SearchPage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout value={{ gameList, activeGameListRecord }}>
      <Search />
    </AppLayout>
  );
}
