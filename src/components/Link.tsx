import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { NextLink } from '@/i18n';

export const Link = ({ locale, ...props }: MuiLinkProps<typeof NextLink>) => (
  <MuiLink component={NextLink} locale={locale as any} {...props} />
);

export type LinkProps = MuiLinkProps<typeof NextLink>;
