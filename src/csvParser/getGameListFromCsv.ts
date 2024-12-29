import { takeWhile } from 'lodash-es';
import { getGameFromCsv } from './getGameFromCsv';
import { CsvColumnsOptions, CsvGame } from './types';

/**
 * Every row with empty TYPE is merged to nearest upper row with TYPE = typeGame into its `notes`
 */
const mergeNotesToCsvGameList = (csvGames: CsvGame[], options: CsvColumnsOptions): CsvGame[] =>
  csvGames.reduce((acc: CsvGame[], csvGame: CsvGame, index) => {
    const { colName, typeGame } = options.type;
    if (csvGame[colName] === typeGame) {
      const noteRelatedToGame = takeWhile(csvGames.slice(index + 1), (i) => i[colName] !== typeGame);
      const notes = noteRelatedToGame?.map((csvGame) => csvGame[options.name.colName]).filter((item) => !!item?.length);

      const csvGameWithNotes = {
        ...csvGame,
        notes,
      };

      return [...acc, csvGameWithNotes];
    }

    return acc;
  }, []);

const createCsvGameList = (csvGames: CsvGame[], options: CsvColumnsOptions): CsvGame[] =>
  csvGames?.filter((csvGame) => !!csvGame[options.name.colName]?.length);

export const getGameListFromCsv = (csv: CsvGame[], options: CsvColumnsOptions) => {
  const gamelist = options.type.enabled ? mergeNotesToCsvGameList(csv, options) : createCsvGameList(csv, options);

  return gamelist.map((item) => getGameFromCsv(item, options));
};
