import { countBy, pickBy } from 'lodash-es';
import { Game } from '@/types';

export const getDuplicitGames = (gameList: Game[]) => {
  const duplicatedUids = Object.keys(pickBy(countBy(gameList, 'uid'), (i) => i > 1));

  return duplicatedUids.map((uid) => gameList.find((game) => game.uid === uid) as Game);
};
