import { FileText, FileSpreadsheet, FileType, Image, FileUp, File, FileCode, } from 'lucide-react';
import React from 'react';
import { TTool  } from '../../types';
import { ToolCategory } from '../toolCategories';

export const convertTools: TTool[] = [
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF documents to Word format while preserving layout',
    icon: <FileText />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'DOC',
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    description: 'Extract tables from PDF into Excel spreadsheets',
    icon: <FileSpreadsheet />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'XLS',
  },
  {
    id: 'pdf-to-powerpoint',
    title: 'PDF to PowerPoint',
    description: 'Convert PDF to editable PowerPoint slides',
    icon: <FileType />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'PPT',
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert PDF pages to high-quality JPG images',
    icon: <Image />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'JPG'
  },
  {
    id: 'image-to-pdf',
    title: 'Images to PDF',
    description: 'Convert JPG, PNG, TIFF to PDF files',
    icon: <FileUp />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/tiff', 'image/bmp'],
    fileInputType:'JPG',
    fileExportType:'PDF'
  },
  {
    id: 'html-to-pdf',
    title: 'HTML to PDF',
    description: 'Convert HTML files to PDF format',
    icon: <File />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['text/html'],
    fileInputType:'HTML',
    fileExportType:'PDF'
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel to PDF',
    description: 'Convert Excel files to PDF format',
    icon: <FileSpreadsheet />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    fileInputType:'DOC',
    fileExportType:'PDF'
  },
  {
    id: 'pdf-to-text',
    title: 'PDF to Text',
    description: 'Convert PDF to plain text with layout preserved',
    icon: <FileText />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'TXT'
  },
  {
    id: 'pdf-to-json',
    title: 'PDF to JSON',
    description: 'Convert PDF to structured JSON format',
    icon: <FileCode />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'JSON'
  },
  // {
  //   id: 'pdf-to-xml',
  //   title: 'PDF to XML',
  //   description: 'Convert PDF to XML with document structure',
  //   icon: <FileCode />,
  //   category: ToolCategory.CONVERT,
  //   acceptedTypes: ['application/pdf'],
  //   fileInputType:'PDF',
  //   fileExportType:''
  // },
  
  {
    id: 'pdf-to-html',
    title: 'PDF to HTML',
    description: 'Convert PDF to HTML with formatting preserved',
    icon: <File />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ['application/pdf'],
    fileInputType:'PDF',
    fileExportType:'HTML'
  },
];