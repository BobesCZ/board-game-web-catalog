import { parseBggXmlApi2CollectionResponse } from '@code-bucket/board-game-geek';

export const fetchCollectionData = async (username: string) => {
  const res = await fetch(`https://api.geekdo.com/xmlapi2/collection?username=${username}&stats=1&brief=1`);

  if (res.status === 202) {
    return null;
  }

  const data = await res.text();
  const bggResponse = parseBggXmlApi2CollectionResponse(data);
  const collection = bggResponse.items;

  return collection;
};
