'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Paper, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Edit as EditIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { Note } from '@/types/note';
import { getNotes, saveNote } from '@/utils/noteStorage';
import MarkdownEditor from '@/components/MarkdownEditor';

// This function is required for static export
export async function generateStaticParams() {
  // Since we're using localStorage, we can't generate static params at build time
  // We'll return an empty array to satisfy the requirement but allow dynamic routing
  return [];
}

export default function NotePage() {
  const { id } = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    const notes = getNotes();
    const currentNote = notes.find(n => n.id === id);
    if (currentNote) {
      setNote(currentNote);
    } else {
      router.push('/');
    }
  }, [id, router]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!note) return;
    const updatedNote = {
      ...note,
      title: event.target.value,
      updatedAt: new Date().toISOString()
    };
    setNote(updatedNote);
    saveNote(updatedNote);
  };

  const handleContentChange = (value?: string) => {
    if (!note) return;
    const updatedNote = {
      ...note,
      content: value || '',
      updatedAt: new Date().toISOString()
    };
    setNote(updatedNote);
    saveNote(updatedNote);
  };

  if (!note) {
    return <Box p={2}>笔记不存在</Box>;
  }

  return (
    <Box sx={{ 
      p: 2,
      height: 'calc(100vh - 80px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Paper 
        sx={{ 
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
        elevation={1}
      >
        <TextField
          fullWidth
          variant="standard"
          value={note.title}
          onChange={handleTitleChange}
          sx={{ 
            '& .MuiInput-root': { 
              fontSize: '1.25rem',
              fontWeight: 500
            }
          }}
        />
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, newMode) => newMode && setMode(newMode)}
          size="small"
        >
          <ToggleButton value="edit">
            <Tooltip title="编辑模式">
              <EditIcon />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="preview">
            <Tooltip title="预览模式">
              <VisibilityIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      <Paper 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        elevation={1}
      >
        <Box sx={{ 
          p: 2,
          flexGrow: 1,
          overflow: 'auto',
          '& .w-md-editor': {
            flex: 1,
            border: 'none',
            boxShadow: 'none',
            backgroundColor: 'transparent'
          },
          '& .w-md-editor-toolbar': {
            borderBottom: '1px solid',
            borderColor: 'divider'
          }
        }}>
          <MarkdownEditor
            value={note.content}
            onChange={handleContentChange}
            preview={mode === 'preview'}
          />
        </Box>
      </Paper>
    </Box>
  );
}