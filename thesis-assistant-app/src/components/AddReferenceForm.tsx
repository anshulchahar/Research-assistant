'use client';

import React, { useState } from 'react';
import { useReferenceStore } from '@/store/referenceStore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const AddReferenceForm = () => {
  const { addReference } = useReferenceStore();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [source, setSource] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authors.trim()) return;
    addReference({
      title,
      authors,
      source,
      notes,
      tags: tags.split(',').map(tag => tag.trim()),
      category,
    });
    setTitle('');
    setAuthors('');
    setSource('');
    setNotes('');
    setTags('');
    setCategory('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Reference</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new reference</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., A new method for..." />
          </div>
          <div>
            <Label htmlFor="authors">Authors</Label>
            <Input id="authors" value={authors} onChange={(e) => setAuthors(e.target.value)} placeholder="e.g., Smith, J." />
          </div>
          <div>
            <Label htmlFor="source">Source</Label>
            <Input id="source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g., Journal of Computer Science" />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Lit Review" />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., AI, NLP, Machine Learning" />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g., This paper is important because..." />
          </div>
          <Button type="submit">Add Reference</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReferenceForm;
