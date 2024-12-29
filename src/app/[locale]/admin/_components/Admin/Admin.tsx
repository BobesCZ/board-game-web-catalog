'use client';

import { GameListRecord } from '@/admin/actions';
import { UserAuthRecord } from '../userAuth';
import { GameListRecords } from './components';

type Props = {
  gameListRecords: GameListRecord[];
  activeGameListRecord?: number;
  userAuthRecords: UserAuthRecord[];
};

export default function Admin({ gameListRecords, activeGameListRecord }: Props) {
  return <GameListRecords gameListRecords={gameListRecords} activeGameListRecord={activeGameListRecord} />;
}
