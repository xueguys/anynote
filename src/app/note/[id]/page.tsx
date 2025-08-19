import NoteClient from './NoteClient';

// This function is required for static export
export async function generateStaticParams() {
  // Since we're using localStorage, we can't generate static params at build time
  // We need to return at least one dummy param to satisfy Next.js export requirements
  // The actual note data will be loaded client-side
  return [{ id: 'dummy' }];
}

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NoteClient id={id} />;
}