import { Archive, FileSearch, Wrench } from 'lucide-react';
import React from 'react';
import { TTool } from '../../types';
import { ToolCategory } from '../toolCategories';

export const optimizeTools: TTool[] = [
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce PDF file size without quality loss',
    icon: <Archive />,
    category: ToolCategory.OPTIMIZE,
    acceptedTypes: ['application/pdf'],
    taskType: 'compress',
  },
  {
    id: 'repair-pdf',
    title: 'Repair PDF',
    description: 'Fix corrupted or damaged PDF files',
    icon: <Wrench />,
    category: ToolCategory.OPTIMIZE,
    acceptedTypes: ['application/pdf'],
    taskType: 'repair',
  },
  {
    id: 'ocr-pdf',
    title: 'OCR PDF',
    description: 'Make You PDF Searchable',
    icon: <FileSearch />,
    category: ToolCategory.OPTIMIZE,
    acceptedTypes: ['application/pdf'],
    taskType: 'pdfocr',
  },
];
