'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { createNewNote, saveNote } from '@/utils/noteStorage';
import MenuIcon from '@mui/icons-material/Menu';
import NoteIcon from '@mui/icons-material/Note';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 240;

export default function Sidebar() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <>
      <List>
        <ListItem>
          <ListItemButton onClick={() => handleNavigation('/')}>
            <ListItemIcon>
              <NoteIcon />
            </ListItemIcon>
            <Typography sx={{ color: 'text.primary' }}>笔记列表</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => {
            const newNote = createNewNote();
            saveNote(newNote);
            handleNavigation(`/note/${newNote.id}`);
          }}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <Typography sx={{ color: 'text.primary' }}>新建笔记</Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => handleNavigation('/settings')}
            selected={pathname === '/settings'}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Typography sx={{ color: 'text.primary' }}>设置</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => handleNavigation('/about')}
            selected={pathname === '/about'}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <Typography sx={{ color: 'text.primary' }}>关于</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="打开菜单"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          mr: 2,
          display: { sm: 'none' },
          position: 'fixed',
          left: 16,
          top: 16,
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
