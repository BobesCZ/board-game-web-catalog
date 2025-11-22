'use server';

import { parseBggXmlApi2ThingResponse } from '@code-bucket/board-game-geek';
import { Game } from '@/types';
import { BGG_FETCH_OPTIONS } from './config';
import { getGameFromBggThing } from './utils';

const fetchThingData = async (thingId: number) => {
  const res = await fetch(`https://api.geekdo.com/xmlapi2/thing?id=${thingId}&versions=1&stats=1`, BGG_FETCH_OPTIONS);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data', { cause: res.status });
  }

  const data = await res.text();
  const bggResponse = parseBggXmlApi2ThingResponse(data);
  const thing = bggResponse?.item;

  return thing;
};

export const getGameData = async (thingId: number, game: Game) => {
  const bggThing = await fetchThingData(thingId);

  const parsedGame = getGameFromBggThing(game, bggThing);

  return parsedGame;
};
