'use client';

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import { useAppTheme } from '@/components/AppThemeProvider';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Header() {
  const { settings, updateSettings } = useAppTheme();
  const trigger = useScrollTrigger();

  const toggleTheme = () => {
    updateSettings({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light',
    });
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          background: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: 1,
          borderColor: 'divider',
        })}
      >
        <Toolbar>
          <Box sx={{ flex: 1 }} />
          <IconButton
            onClick={toggleTheme}
            size="large"
            sx={{ color: 'text.primary' }}
          >
            {settings.theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
