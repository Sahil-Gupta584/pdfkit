import { Lock, Unlock, FileSignature } from 'lucide-react';
import React from 'react';
import { TTool  } from '../../types';
import { ToolCategory } from '../toolCategories';

export const securityTools: TTool[] = [
  {
    id: 'lock-pdf',
    title: 'Lock PDF',
    description: 'Add password protection to PDF files',
    icon: <Lock />,
    category: ToolCategory.SECURITY,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'PDF'
  },
  {
    id: 'unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove password protection from PDF files',
    icon: <Unlock />,
    category: ToolCategory.SECURITY,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'PDF'
  },
  {
    id: 'sign-pdf',
    title: 'Sign PDF',
    description: 'Digitally sign PDF documents',
    icon: <FileSignature />,
    category: ToolCategory.SECURITY,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'PDF'
  }
];