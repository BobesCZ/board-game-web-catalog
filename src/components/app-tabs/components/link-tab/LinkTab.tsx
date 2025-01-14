'use client';

import { Tab } from '@mui/material';
import { Link, LinkProps } from '@/components';

type LinkTabProps = {
  label: string;
  href: LinkProps['href'];
  selected?: boolean;
};

export const LinkTab = (props: LinkTabProps) => (
  <Tab
    component={Link}
    {...props}
    sx={(theme) => ({
      color: 'text.primary',
      fontWeight: 700,
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
      },
    })}
  />
);
