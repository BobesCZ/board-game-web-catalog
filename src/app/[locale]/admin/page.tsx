import { getGameListRecords } from '@/admin/actions';
import { GameListRecords } from '@/admin/layouts';

export default async function AdminPage() {
  const gameListRecords = await getGameListRecords();

  return <GameListRecords gameListRecords={gameListRecords} />;
}
