import { getActiveGameListRecord, getGameList } from '@/actions';
import Added from '@/layouts/Added/Added';
import { AppLayout } from '@/layouts/AppLayout';

export default async function NamePage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();

  return (
    <AppLayout value={{ gameList, activeGameListRecord }}>
      <Added />
    </AppLayout>
  );
}
