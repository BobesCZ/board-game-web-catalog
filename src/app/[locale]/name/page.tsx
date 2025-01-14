import { getActiveGameListRecord, getGameList } from '@/admin/actions';
import { AppLayout, Name } from '@/layouts';

export default async function NamePage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout value={{ gameList, activeGameListRecord }}>
      <Name />
    </AppLayout>
  );
}
