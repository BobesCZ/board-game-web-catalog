import { Game } from '@/types';
import { countBy, pickBy } from 'lodash-es';

export const getDuplicitGames = (gameList: Game[]) => {
  const duplicatedUids = Object.keys(pickBy(countBy(gameList, 'uid'), (i) => i > 1));

  return duplicatedUids.map((uid) => gameList.find((game) => game.uid === uid) as Game);
};
