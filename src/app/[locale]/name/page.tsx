import { getActiveGameListRecord, getGameList } from '@/actions';
import { AppLayout } from '@/layouts/AppLayout';
import Name from '@/layouts/Name/Name';

export default async function NamePage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout value={{ gameList, activeGameListRecord }}>
      <Name />
    </AppLayout>
  );
}
