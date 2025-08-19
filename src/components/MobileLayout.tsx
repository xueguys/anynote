'use client';

import { Box } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { NoteAlt, Info } from '@mui/icons-material';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box 
      sx={{ 
        pb: '64px', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      {children}
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
        elevation={0}
      >
        <BottomNavigation
          value={pathname}
          onChange={(_, newValue) => {
            router.push(newValue);
          }}
          showLabels
          sx={{
            bgcolor: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main'
              }
            }
          }}
        >
          <BottomNavigationAction 
            label="笔记" 
            icon={<NoteAlt />} 
            value="/" 
          />
          <BottomNavigationAction 
            label="关于" 
            icon={<Info />} 
            value="/about" 
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
