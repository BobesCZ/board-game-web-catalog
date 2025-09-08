import { notFound } from 'next/navigation';
import { getGameListRecord } from '@/admin/actions';
import { GameListRecordDetail } from '@/admin/layouts';

type Props = { params: Promise<{ gameListRecordId: string }> };

export default async function GameListRecordPage({ params }: Props) {
  const { gameListRecordId } = await params;

  const parsedRecordId = parseInt(gameListRecordId);
  const gameListRecord = await getGameListRecord(parsedRecordId);

  return gameListRecord ? <GameListRecordDetail gameListRecord={gameListRecord} /> : notFound();
}
