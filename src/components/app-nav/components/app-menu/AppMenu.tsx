'use client';

import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, List } from '@mui/material';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import { Urls } from '@/config';
import { MenuLink } from './components';

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
      <IconButton color="secondary" onClick={toggleDrawer(true)}>
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
            <MenuLink to={Urls.ADDED} i18nKey="added.pageTitle" />
            <MenuLink to={Urls.MY_BGG} i18nKey="myBgg.pageTitle" />

            <Divider sx={{ my: 1 }} />

            <MenuLink to={Urls.EXTERNAL_CLIENT} i18nKey="footer.goToClient" external />
          </List>
        </Box>
      </Drawer>
    </>
  );
};
