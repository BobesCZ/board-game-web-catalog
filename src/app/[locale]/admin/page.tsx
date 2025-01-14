import { getActiveGameListRecord, getGameListRecords } from '@/admin/actions';
import { GameListRecords } from '@/admin/layouts';

export default async function AdminPage() {
  const gameListRecords = await getGameListRecords();
  const activeGameListRecord = await getActiveGameListRecord();

  return <GameListRecords gameListRecords={gameListRecords} activeGameListRecord={activeGameListRecord} />;
}
