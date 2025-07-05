'use client';

'use client';

import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNoteStore } from '@/store/noteStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const NoteEditor = () => {
  const { notes, addNote, editNote, removeNote } = useNoteStore();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    const note = notes.find(note => note.id === id);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  };

  const handleSaveNote = () => {
    if (selectedNoteId) {
      editNote(selectedNoteId, title, content);
    } else {
      addNote(title, content);
    }
  };

  const handleNewNote = () => {
    setSelectedNoteId(null);
    setTitle('');
    setContent('');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setContent(prevContent => prevContent + '\n' + data.text);
      } else {
        console.error('Failed to extract text from image.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1">
        <Button onClick={handleNewNote} className="mb-4 w-full">New Note</Button>
        <div className="space-y-2">
          {notes.map(note => (
            <Card key={note.id} onClick={() => handleSelectNote(note.id)} className="cursor-pointer">
              <CardContent className="p-4">
                <h3 className="font-semibold">{note.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note in Markdown..."
            rows={15}
          />
          <div className="flex justify-between">
            <div>
              <Button onClick={handleSaveNote}>Save Note</Button>
              {selectedNoteId && (
                <Button variant="destructive" onClick={() => removeNote(selectedNoteId)} className="ml-2">Delete Note</Button>
              )}
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,application/pdf"
              />
              <Button onClick={() => fileInputRef.current?.click()}>Upload Note</Button>
            </div>
          </div>
        </div>
        <div className="mt-4 border p-4 rounded-md">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
