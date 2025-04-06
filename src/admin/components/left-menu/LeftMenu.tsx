'use client';

import { Add, OpenInNewOutlined, People, Settings, TrendingUp, ViewList } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { LEFT_MENU_WIDTH } from '@/admin/config';
import { Link } from '@/components';
import { Urls } from '@/config';
import { usePathname } from '@/navigation';

export function LeftMenu() {
  const pathname = usePathname();

  return (
    <Drawer
      sx={{
        width: LEFT_MENU_WIDTH,
        flexShrink: 0,
        zIndex: 0,
        '& .MuiDrawer-paper': {
          width: LEFT_MENU_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href={Urls.ADMIN} selected={pathname === Urls.ADMIN}>
            <ListItemIcon sx={{ minWidth: 44 }}>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary="Seznamy her" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href={Urls.ADMIN_NEW} selected={pathname === Urls.ADMIN_NEW}>
            <ListItemIcon sx={{ minWidth: 44 }}>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Nový seznam" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            LinkComponent={Link}
            href={Urls.ADMIN_WEB_EVENTS}
            selected={pathname === Urls.ADMIN_WEB_EVENTS}
          >
            <ListItemIcon sx={{ minWidth: 44 }}>
              <TrendingUp />
            </ListItemIcon>
            <ListItemText primary="Analytika" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href={Urls.ADMIN_USERS} selected={pathname === Urls.ADMIN_USERS}>
            <ListItemIcon sx={{ minWidth: 44 }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Uživatelé" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href={Urls.ADMIN_SETTINGS} selected={pathname === Urls.ADMIN_SETTINGS}>
            <ListItemIcon sx={{ minWidth: 44 }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Nastavení" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href={Urls.SEARCH} target="_blank">
            <ListItemIcon sx={{ minWidth: 44 }}>
              <OpenInNewOutlined />
            </ListItemIcon>
            <ListItemText primary="Katalog" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
