'use client';

import { HTMLAttributes } from 'react';
import { Game } from '@/types';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { TextWithHighlight } from '../text-with-highlight';

type Props = {
  props: HTMLAttributes<HTMLLIElement>;
  option: Game;
  inputValue: string;
};

export const AutocompleteOption = ({ props, option: { image, sourceName, primaryName }, inputValue }: Props) => (
  <ListItem {...props} disablePadding>
    <ListItemAvatar>
      <Avatar variant="square" src={image} sx={{ width: 64, height: 64, mr: 2 }} />
    </ListItemAvatar>
    <ListItemText
      disableTypography
      primary={<TextWithHighlight text={sourceName} inputValue={inputValue} variant="body1" />}
      secondary={
        <TextWithHighlight text={primaryName} inputValue={inputValue} variant="body2" color="text.secondary" />
      }
    />
  </ListItem>
);
