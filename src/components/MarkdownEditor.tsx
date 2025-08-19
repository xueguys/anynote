'use client';

import dynamic from 'next/dynamic';
import { Box, CircularProgress, useTheme } from '@mui/material';

// 动态导入 MD Editor 避免 SSR 问题
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { 
    loading: () => (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        minHeight: 200 
      }}>
        <CircularProgress />
      </Box>
    ),
    ssr: false
  }
);

// 动态导入 MD Editor 预览组件
const MDPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { 
    loading: () => (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        minHeight: 200 
      }}>
        <CircularProgress />
      </Box>
    ),
    ssr: false
  }
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value?: string) => void;
  preview?: boolean;
}

export default function MarkdownEditor({ value, onChange, preview = false }: MarkdownEditorProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  if (preview) {
    return (
      <Box
        sx={{
          '.wmde-markdown': {
            backgroundColor: 'transparent',
            fontFamily: theme.typography.fontFamily
          },
          '.wmde-markdown-var': {
            fontFamily: 'monospace'
          }
        }}
        data-color-mode={isDarkMode ? 'dark' : 'light'}
      >
        <MDPreview source={value} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        '.w-md-editor': {
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none'
        },
        '.w-md-editor-toolbar': {
          border: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'transparent'
        },
        '.w-md-editor-text': {
          backgroundColor: 'transparent'
        },
        '.w-md-editor-preview': {
          boxShadow: 'none',
          backgroundColor: 'transparent'
        }
      }}
      data-color-mode={isDarkMode ? 'dark' : 'light'}
    >
      <MDEditor
        value={value}
        onChange={onChange}
        preview="edit"
        height={400}
        hideToolbar={false}
        enableScroll={true}
      />
    </Box>
  );
}
