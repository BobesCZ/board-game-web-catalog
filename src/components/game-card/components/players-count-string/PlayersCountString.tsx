import { useTranslations } from 'next-intl';
import { Game } from '@/types';

type Props = Pick<Game, 'minplayers' | 'maxplayers'>;

export const PlayersCountString = ({ minplayers, maxplayers }: Props) => {
  const t = useTranslations();

  if (minplayers === undefined || maxplayers === undefined) return <></>;

  if (minplayers === maxplayers && minplayers === 1) {
    return <>{t('gameCard.playersCount', { count: 1, minplayers })}</>;
  }

  if (minplayers === maxplayers && minplayers === 2) {
    return <>{t('gameCard.playersCount', { count: 2, minplayers })}</>;
  }

  return <>{t('gameCard.playersCountInterval', { count: maxplayers, minplayers, maxplayers })}</>;
};
