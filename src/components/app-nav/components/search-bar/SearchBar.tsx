'use client';

import { Search } from '@mui/icons-material';
import { Box, Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import { SearchInput } from './components';

export const SearchBar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <SearchInput />
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
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
      </Box>
    </>
  );
};
