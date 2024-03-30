'use client';

import { Box, Divider, Drawer, IconButton, List } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState, KeyboardEvent, MouseEvent } from 'react';
import { MenuLink } from './components';
import { Urls } from '@/config';

export const AppMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <IconButton size="large" color="secondary" edge="start" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: (theme) => ({ backgroundColor: theme.palette.background.default }) }}
      >
        <Box component="div" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <MenuLink to={Urls.SEARCH} i18nKey="search.pageTitle" />
            <MenuLink to={Urls.NAME} i18nKey="name.pageTitle" />
            <MenuLink to={Urls.RANK} i18nKey="rank.pageTitle" />

            <Divider sx={{ my: 1 }} />

            <MenuLink to={Urls.EXTERNAL_CLIENT} i18nKey="footer.goToClient" external />
          </List>
        </Box>
      </Drawer>
    </>
  );
};
