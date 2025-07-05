import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface NoteState {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  editNote: (id: string, title: string, content: string) => void;
  removeNote: (id: string) => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (title, content) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: crypto.randomUUID(),
              title,
              content,
              createdAt: new Date(),
            },
          ],
        })),
      editNote: (id, title, content) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, title, content } : note
          ),
        })),
      removeNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    {
      name: 'note-storage',
    }
  )
);
