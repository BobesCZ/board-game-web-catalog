'use client';

import { Typography, TypographyProps } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

type Props = TypographyProps & {
  text?: string;
  inputValue: string;
};

export const TextWithHighlight = ({ text, inputValue, ...props }: Props) => {
  if (!text) return null;

  const matches = match(text, inputValue, { insideWords: true });
  const parts = parse(text, matches);

  return (
    <Typography {...props}>
      {parts.map(({ highlight, text }, index) => (
        <Typography
          key={index}
          component="span"
          {...props}
          sx={(theme) => ({
            fontWeight: highlight ? theme.typography.fontWeightBold : undefined,
            color: highlight ? 'text.primary' : undefined,
          })}
        >
          {text}
        </Typography>
      ))}
    </Typography>
  );
};
