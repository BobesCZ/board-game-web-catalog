import { notFound } from 'next/navigation';
import { getActiveGameListRecord, getGameListRecords } from '@/admin/actions';
import { GameListRecordDetail } from '@/admin/layouts';

type Props = {
  params: {
    gameListRecordId: string;
  };
};

export default async function GameListRecordPage({ params: { gameListRecordId } }: Props) {
  const gameListRecords = await getGameListRecords();
  const activeGameListRecord = await getActiveGameListRecord();

  const parsedRecordId = parseInt(gameListRecordId);
  const gameListRecord = gameListRecords.find(({ recordId }) => recordId === parsedRecordId);

  return gameListRecord ? (
    <GameListRecordDetail activeGameListRecord={activeGameListRecord} gameListRecord={gameListRecord} />
  ) : (
    notFound()
  );
}
