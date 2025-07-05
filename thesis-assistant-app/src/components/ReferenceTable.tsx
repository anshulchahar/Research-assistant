'use client';

import React from 'react';
import { useReferenceStore } from '@/store/referenceStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const ReferenceTable = () => {
  const { references, removeReference } = useReferenceStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Authors</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {references.map((ref) => (
          <TableRow key={ref.id}>
            <TableCell>{ref.title}</TableCell>
            <TableCell>{ref.authors}</TableCell>
            <TableCell>{ref.source}</TableCell>
            <TableCell>{ref.category}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => removeReference(ref.id)}>
                <X className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReferenceTable;
