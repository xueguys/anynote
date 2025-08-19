'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  useTheme,
} from '@mui/material';
import { AppSettings, getSettings, saveSettings } from '@/utils/settingsStorage';
import FontSizeSelector from './components/FontSizeSelector';
import ColorPicker from './components/ColorPicker';

export default function Settings() {
  const theme = useTheme();
  const [settings, setSettings] = useState<AppSettings>({
    fontSize: 'medium',
    primaryColor: '#1976d2',
    secondaryColor: '#9c27b0',
    theme: 'light'
  });

  useEffect(() => {
    const storedSettings = getSettings();
    setSettings(storedSettings);
  }, []);

  const handleSettingChange = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    const newSettings = {
      ...settings,
      [key]: value,
    };
    setSettings(newSettings);
    saveSettings(newSettings);
    window.location.reload();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: 600,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          mb: 4
        }}
      >
        设置
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Card
          sx={{
            backgroundColor: theme.palette.background.paper,
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <FormLabel component="legend" sx={{ mt: 3, mb: 1, color: 'text.primary', fontSize: '1.1rem' }}>
                主题模式
              </FormLabel>
              <Box sx={{ mb: 3 }}>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value as 'light' | 'dark')}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    background: 'transparent',
                    color: 'inherit'
                  }}
                >
                  <option value="light">浅色</option>
                  <option value="dark">深色</option>
                </select>
              </Box>

              <FormLabel component="legend" sx={{ mt: 3, mb: 1, color: 'text.primary', fontSize: '1.1rem' }}>
                字体大小
              </FormLabel>
              <FontSizeSelector
                value={settings.fontSize}
                onChange={(value) => handleSettingChange('fontSize', value)}
              />

              <FormLabel component="legend" sx={{ mt: 3, mb: 2, color: 'text.primary', fontSize: '1.1rem' }}>
                主题色彩
              </FormLabel>
              <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    主色调
                  </Typography>
                  <ColorPicker
                    value={settings.primaryColor}
                    onChange={(value) => handleSettingChange('primaryColor', value)}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    次要色调
                  </Typography>
                  <ColorPicker
                    value={settings.secondaryColor}
                    onChange={(value) => handleSettingChange('secondaryColor', value)}
                  />
                </Box>
              </Box>
            </FormControl>
          </CardContent>
        </Card>
      </Box>

      {/* Assuming this is the bottom container div that controls the background */}
      <div className="bg-white dark:bg-slate-900">
        {/* Existing content */}
      </div>
    </Container>
  );
}
