import { Note } from '@/types/note';
import { getNotes } from '@/utils/noteStorage';
import NoteClient from './NoteClient';

// This function is required for static export
export async function generateStaticParams() {
  // Since we're using localStorage, we can't generate static params at build time
  // We'll return an empty array to satisfy the requirement but allow dynamic routing
  // For a real static export, you would fetch actual data here
  const notes: Note[] = getNotes();
  return notes.map(note => ({
    id: note.id
  }));
}

export default function NotePage({ params }: { params: { id: string } }) {
  return <NoteClient id={params.id} />;
}