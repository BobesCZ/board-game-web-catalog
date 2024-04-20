import { camelCase, pickBy } from 'lodash-es';
import { Game, Lang, Status } from '@/types';
import { CsvColumnsOptions, CsvGame } from './types';
import { VALID_LANGS } from './config';

const getGameUid = (sourceName: string, id: number | undefined, langs: Lang[], csvGame: CsvGame): string =>
  camelCase(`${sourceName} ${id ?? ''} ${langs.join(' ')} ${csvGame?.notes?.[0]?.substring(0, 15) ?? ''}`);

export const getGameFromCsv = (csvGame: CsvGame, options: CsvColumnsOptions): Game => {
  const sourceName = csvGame[options.name.colName].toString();
  const id = options.id.enabled ? parseInt(csvGame[options.id.colName]) || undefined : undefined;
  const location = options.location.enabled ? csvGame[options.location.colName]?.toString() || undefined : undefined;
  const added = options.added.enabled ? csvGame[options.added.colName]?.toString() || undefined : undefined;

  const langs = options.langs.enabled
    ? ((csvGame[options.langs.colName] as string) ?? '')
        .split(',')
        .map((lang) => lang.trim())
        .map((lang) => (lang === options.langs.langIrrelevant ? Lang.Irrelevant : lang))
        .filter((lang): lang is Lang => VALID_LANGS.includes(lang as Lang))
    : [];

  const parsedCustomData: Partial<Game> = {
    yearpublished: options.yearpublished.enabled
      ? parseInt(csvGame[options.yearpublished.colName]) || undefined
      : undefined,
    image: options.image.enabled ? csvGame[options.image.colName]?.toString() : undefined,
    playingtime: options.playingtime.enabled ? parseInt(csvGame[options.playingtime.colName]) || undefined : undefined,
    minplayers: options.minplayers.enabled ? parseInt(csvGame[options.minplayers.colName]) || undefined : undefined,
    maxplayers: options.maxplayers.enabled ? parseInt(csvGame[options.maxplayers.colName]) || undefined : undefined,
  };

  const customData = pickBy(parsedCustomData, (i) => !!i);
  const status = Object.keys(customData).length ? Status.FINISHED : Status.NEW;

  return {
    uid: getGameUid(sourceName, id, langs, csvGame),
    sourceName,
    id,
    langs,
    notes: csvGame.notes,
    location,
    added,
    ...customData,
    status: status,
  };
};
