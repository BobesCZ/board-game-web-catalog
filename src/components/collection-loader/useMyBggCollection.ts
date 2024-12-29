import { BggCollectionGame } from '@code-bucket/board-game-geek';
import { useLocalStorage } from 'usehooks-ts';

const MY_BGG_COLLECTION_KEY = 'myBggCollection';

export type MyBggCollection = {
  created: number;
  username: string;
  collectionGameList: BggCollectionGame[];
};

export const useMyBggCollection = () => {
  const [myBggCollection, setMyBggCollection, removeBggCollection] = useLocalStorage<MyBggCollection | undefined>(
    MY_BGG_COLLECTION_KEY,
    undefined,
  );

  const onMyBggCollectionChange = (data: MyBggCollection) => {
    const collectionGameList = data?.collectionGameList?.map((item) => ({ ...item, userRating: item.userRating }));
    const myBggCollection = { ...data, collectionGameList };

    setMyBggCollection(myBggCollection);
  };

  const onMyBggCollectionClear = () => {
    removeBggCollection();
  };

  return {
    myBggCollection,
    onMyBggCollectionChange,
    onMyBggCollectionClear,
  };
};
