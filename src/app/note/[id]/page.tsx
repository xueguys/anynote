import NoteClient from './NoteClient';

// This function is required for static export
export async function generateStaticParams() {
  // Since we're using localStorage, we can't generate static params at build time
  // For static export, we return an empty array which will allow any id to be used
  // The actual note data will be loaded client-side
  return [];
}

export default function NotePage({ params }: { params: { id: string } }) {
  return <NoteClient id={params.id} />;
}