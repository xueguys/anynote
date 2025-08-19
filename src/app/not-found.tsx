'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography } from '@mui/material';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          页面未找到
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          抱歉，您访问的页面不存在。
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/')}>
          返回首页
        </Button>
      </Box>
    </Container>
  );
}