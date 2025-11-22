'use server';

import { BggThingType, parseBggXmlApi2SearchResponse } from '@code-bucket/board-game-geek';
import { BGG_FETCH_OPTIONS } from './config';
import { getBestResult } from './utils';

const fetchSearchData = async (parsedName: string) => {
  const res = await fetch(`https://api.geekdo.com/xmlapi2/search?query=${parsedName}`, BGG_FETCH_OPTIONS);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data', { cause: res.status });
  }

  const data = await res.text();
  const bggResponse = parseBggXmlApi2SearchResponse(data);
  const results = bggResponse?.items;

  return results;
};

/**
 * Use Search API to get game ID
 */
export const getBggIdData = async (sourceName: string) => {
  const parsedName = sourceName.replace('–', '');
  const searchResult = await fetchSearchData(parsedName);

  if (!searchResult.length) {
    throw new Error('No results found.');
  }

  const onlyBoardGameType = searchResult.filter(({ type }) => type === BggThingType.boardGame);

  if (!onlyBoardGameType.length) {
    throw new Error('No boardGame found, only expansions.');
  }

  const bggId = getBestResult(sourceName, onlyBoardGameType).id;

  return bggId;
};
