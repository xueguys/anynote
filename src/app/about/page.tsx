'use client';

import { Box, Typography, Container, Card, CardContent, useTheme } from '@mui/material';
import {
  SaveAs as SaveIcon,
  Security as SecurityIcon,
  Description as DescriptionIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';

const features = [
  {
    icon: <SaveIcon fontSize="large" />,
    title: '自动保存',
    description: '所有修改都会自动保存到本地'
  },
  {
    icon: <SecurityIcon fontSize="large" />,
    title: '隐私安全',
    description: '所有数据都存储在本地'
  },
  {
    icon: <DescriptionIcon fontSize="large" />,
    title: '主标题',
    description: '内容'
  },
  {
    icon: <PaletteIcon fontSize="large" />,
    title: '主标题',
    description: '内容'
  }
];

export default function About() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 600,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}
        >
          About AnyNote
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          AnyNote 是一个网页笔记项目
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)'
          },
          gap: 3
        }}
      >
        {features.map((feature, index) => (
          <Card 
            key={index}
            sx={{ 
              height: '100%',
              backgroundColor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }
            }}
          >
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              p: 3
            }}>
              <Box 
                sx={{ 
                  color: theme.palette.primary.main,
                  mb: 2,
                  '& > svg': {
                    fontSize: 40
                  }
                }}
              >
                {feature.icon}
              </Box>
              <Typography 
                variant="h6" 
                component="h2" 
                gutterBottom 
                sx={{ fontWeight: 600 }}
              >
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          版本：1.1.0
        </Typography>
      </Box>
    </Container>
  );
}
