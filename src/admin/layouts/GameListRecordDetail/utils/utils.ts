import { Dispatch, SetStateAction } from 'react';
import { getBggIdData, getGameData } from '@/bgg/actions';
import { Game, LogRecord, LogRecordState, Status } from '@/types';
import { PROCESS_GAME_TIMEOUT, TOO_MANY_REQUESTS_TEXT } from '../config';

export const processGameList = async (
  gameList: Game[],
  setGameList: Dispatch<SetStateAction<Game[]>>,
  setLog: Dispatch<SetStateAction<LogRecord[]>>,
) => {
  const newGameList: Game[] = [];

  for (const [index, game] of gameList.entries()) {
    const { sourceName, status, id } = game;

    try {
      if (status === Status.FINISHED) {
        setLog((prev) => [...prev, { sourceName, status: LogRecordState.SKIPPED }]);
      } else {
        const bggId = id ?? (await getBggIdData(sourceName));
        const parsedGame = await getGameData(bggId, game);

        newGameList.push({ ...parsedGame, status: Status.FINISHED });
        setLog((prev) => [...prev, { sourceName, status: LogRecordState.SUCCESS }]);

        if (index !== gameList.length - 1) {
          // Slow iteration because of API request limit
          await new Promise((resolve) => setTimeout(resolve, PROCESS_GAME_TIMEOUT));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error, sourceName);
        newGameList.push({ ...game, status: Status.UNFINISHED, statusMessage: `${error}` });
        setLog((prev) => [...prev, { sourceName, status: LogRecordState.ERROR, statusMessage: `${error}` }]);

        if (error.message.includes(TOO_MANY_REQUESTS_TEXT)) break;
      }
    }
  }

  setGameList((prev) => [...prev, ...newGameList]);
};

export const getEstimatedSeconds = (gameList: Game[]) => Math.floor((gameList.length * PROCESS_GAME_TIMEOUT) / 1000);

export const getEstimatedMinutes = (estimatedSeconds: number) => Math.max(Math.floor(estimatedSeconds / 60), 1);
