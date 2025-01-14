'use client';

import { Search } from '@mui/icons-material';
import { Drawer, Hidden, IconButton } from '@mui/material';
import { useState } from 'react';
import { SearchInput } from './components';

export const SearchBar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      <Hidden mdDown implementation="css">
        <SearchInput />
      </Hidden>
      <Hidden mdUp implementation="css">
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <Search />
        </IconButton>
        <Drawer
          open={open}
          onClose={handleDrawerClose}
          anchor="top"
          PaperProps={{ sx: (theme) => ({ backgroundColor: theme.palette.background.default, p: 2 }) }}
        >
          <SearchInput handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Hidden>
    </>
  );
};
