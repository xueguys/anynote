'use client';

import { useEffect, useState } from 'react';
import { 
  Box,
  List,
  ListItem,
  IconButton,
  Fab,
  Typography,
  Paper,
  Container,
  ListItemSecondaryAction,
  Tooltip,
  useTheme
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import { getNotes, deleteNote, createNewNote, saveNote } from '@/utils/noteStorage';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const loadNotes = () => {
      const allNotes = getNotes();
      setNotes(allNotes.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ));
    };

    loadNotes();
    // 每5秒刷新一次笔记列表
    const interval = setInterval(loadNotes, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateNote = () => {
    const newNote = createNewNote();
    saveNote(newNote);
    router.push(`/note/${newNote.id}`);
  };

  const handleDeleteNote = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    if (window.confirm('确定要删除这条笔记吗？')) {
      deleteNote(id);
      setNotes(getNotes());
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{
            fontWeight: 600,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          我的笔记
        </Typography>
      </Box>
      
      {notes.length === 0 ? (
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            还没有笔记
          </Typography>
          <Typography variant="body2" color="text.secondary">
            点击右下角的按钮创建你的第一条笔记
          </Typography>
        </Paper>
      ) : (
        <List sx={{ 
          display: 'grid', 
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
          }
        }}>
          {notes.map((note) => (
            <ListItem
              key={note.id}
              component={Paper}
              sx={{ 
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              }}
              onClick={() => router.push(`/note/${note.id}`)}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {note.title}
                </Typography>
                <Typography 
                  component="span" 
                  variant="body2" 
                  color="text.secondary" 
                  display="block"
                  sx={{ mb: 1 }}
                >
                  {new Date(note.updatedAt).toLocaleString()}
                </Typography>
                <Typography 
                  component="span"
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {note.content || '空笔记'}
                </Typography>
              </Box>
              <ListItemSecondaryAction>
                <Tooltip title="编辑笔记">
                  <IconButton 
                    edge="end" 
                    onClick={() => router.push(`/note/${note.id}`)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="删除笔记">
                  <IconButton 
                    edge="end" 
                    onClick={(e) => handleDeleteNote(e, note.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Tooltip title="新建笔记">
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            right: { xs: 16, sm: 24 },
            bottom: { xs: 80, sm: 24 },
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          onClick={handleCreateNote}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  );
}
