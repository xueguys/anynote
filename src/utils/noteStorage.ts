import { Note } from '@/types/note';

const STORAGE_KEY = 'anynote_notes';

export const getNotes = (): Note[] => {
  if (typeof window === 'undefined') return [];
  const notes = localStorage.getItem(STORAGE_KEY);
  return notes ? JSON.parse(notes) : [];
};

export const saveNote = (note: Note): void => {
  const notes = getNotes();
  const existingNoteIndex = notes.findIndex(n => n.id === note.id);
  
  if (existingNoteIndex >= 0) {
    notes[existingNoteIndex] = note;
  } else {
    notes.push(note);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const deleteNote = (id: string): void => {
  const notes = getNotes().filter(note => note.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const createNewNote = (): Note => {
  return {
    id: Date.now().toString(),
    title: '新笔记',
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
