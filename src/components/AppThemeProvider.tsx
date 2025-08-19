'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppSettings, getSettings } from '@/utils/settingsStorage';

const AppThemeContext = createContext<{
  settings: AppSettings;
  updateSettings: (settings: AppSettings) => void;
}>({
  settings: getSettings(),
  updateSettings: () => {},
});

export const useAppTheme = () => useContext(AppThemeContext);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => ({ fontSize: 'medium', primaryColor: '#1976d2', secondaryColor: '#9c27b0', theme: 'light' }));

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: settings.primaryColor,
      },
      secondary: {
        main: settings.secondaryColor,
      },
      background: {
        default: '#f5f5f7',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: 'var(--font-geist)',
      fontSize: settings.fontSize === 'small' ? 14 :
               settings.fontSize === 'medium' ? 16 : 18,
    },
    shape: {
      borderRadius: 12,
    },
  });

  const themedComponents = {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: theme.transitions.create(['box-shadow', 'background-color']),
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.background.default,
          borderRight: 'none',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 64,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiBottomNavigationAction: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '8px 0',
          '&.Mui-selected': {
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.875rem',
            },
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: theme.transitions.create(['transform', 'box-shadow']),
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
          },
        },
      },
    },
  };

  theme.components = themedComponents;

  useEffect(() => {
    document.documentElement.classList.add('light');
    document.documentElement.style.colorScheme = 'light';
  }, []);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  return (
    <AppThemeContext.Provider value={{ settings, updateSettings: setSettings }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}