'use server';

import { parseBggXmlApi2CollectionResponse } from '@code-bucket/board-game-geek';
import { BGG_FETCH_OPTIONS } from './config';

const fetchCollectionData = async (username: string) => {
  const res = await fetch(
    `https://api.geekdo.com/xmlapi2/collection?username=${username}&stats=1&brief=1`,
    BGG_FETCH_OPTIONS,
  );

  if (res.status === 202) {
    return null;
  }

  const data = await res.text();
  const bggResponse = parseBggXmlApi2CollectionResponse(data);
  const collection = bggResponse.items;

  return collection;
};

export const getCollectionData = async (username: string) => {
  const collection = await fetchCollectionData(username);

  const fixedGameList = collection?.map((item) => ({
    ...item,
    userRating: item.userRating,
  }));

  return JSON.parse(JSON.stringify(fixedGameList));
};
