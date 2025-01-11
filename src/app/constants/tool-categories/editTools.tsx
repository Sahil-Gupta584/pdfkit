import { Merge, Split, Hash } from 'lucide-react';
import { TTool } from '../../types';
import { ToolCategory } from '../toolCategories';

export const editTools: TTool[] = [
  {
    id: 'merge-pdf',
    title: 'Merge PDFs',
    description: 'Combine multiple PDF files into one',
    icon: <Merge />,
    category: ToolCategory.EDIT,
    acceptedTypes: ['application/pdf'],
    taskType: 'merge',
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Split PDF into multiple files',
    icon: <Split />,
    category: ToolCategory.EDIT,
    acceptedTypes: ['application/pdf'],
    taskType: 'split',
  },
  // {
  //   id: 'rotate-pdf',
  //   title: 'Rotate PDF',
  //   description: 'Rotate PDF pages to desired orientation',
  //   icon: <RotateCw />,
  //   category: ToolCategory.EDIT,
  //   acceptedTypes: ['application/pdf'],
  //   taskType: 'rotate',
  // },
  // {
  //   id: 'add-watermark',
  //   title: 'Add Watermark',
  //   description: 'Add custom watermarks to PDF documents',
  //   icon: <Stamp />,
  //   category: ToolCategory.EDIT,
  //   acceptedTypes: ['application/pdf'],
  //   taskType: 'watermark',
  // },
  {
    id: 'add-page-numbers',
    title: 'Add Page Numbers',
    description: 'Add page numbers to PDF documents',
    icon: <Hash />,
    category: ToolCategory.EDIT,
    acceptedTypes: ['application/pdf'],
    taskType: 'pagenumber',
  },
];
