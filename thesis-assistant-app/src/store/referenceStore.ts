import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Reference {
  id: string;
  title: string;
  authors: string;
  source: string;
  notes: string;
  tags: string[];
  pdfLink?: string;
  category: string;
}

interface ReferenceState {
  references: Reference[];
  addReference: (ref: Omit<Reference, 'id'>) => void;
  editReference: (id: string, ref: Omit<Reference, 'id'>) => void;
  removeReference: (id: string) => void;
}

export const useReferenceStore = create<ReferenceState>()(
  persist(
    (set) => ({
      references: [],
      addReference: (ref) =>
        set((state) => ({
          references: [...state.references, { id: crypto.randomUUID(), ...ref }],
        })),
      editReference: (id, ref) =>
        set((state) => ({
          references: state.references.map((r) =>
            r.id === id ? { ...r, ...ref } : r
          ),
        })),
      removeReference: (id) =>
        set((state) => ({
          references: state.references.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'reference-storage',
    }
  )
);
