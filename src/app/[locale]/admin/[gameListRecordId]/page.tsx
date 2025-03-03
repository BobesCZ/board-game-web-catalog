import { notFound } from 'next/navigation';
import { getGameListRecord } from '@/admin/actions';
import { GameListRecordDetail } from '@/admin/layouts';

type Props = {
  params: {
    gameListRecordId: string;
  };
};

export default async function GameListRecordPage({ params: { gameListRecordId } }: Props) {
  const parsedRecordId = parseInt(gameListRecordId);
  const gameListRecord = await getGameListRecord(parsedRecordId);

  return gameListRecord ? <GameListRecordDetail gameListRecord={gameListRecord} /> : notFound();
}
