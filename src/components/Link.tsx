import { NextLink } from '@/navigation';
import { LinkProps as MuiLinkProps, Link as MuiLink } from '@mui/material';

export const Link = ({ locale, ...props }: MuiLinkProps<typeof NextLink>) => (
  <MuiLink component={NextLink} locale={locale as any} {...props} />
);

export type LinkProps = MuiLinkProps<typeof NextLink>;
