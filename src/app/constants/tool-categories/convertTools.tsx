import { Image, File } from "lucide-react";
import React from "react";
import { TTool } from "../../types";
import { ToolCategory } from "../toolCategories";
import { FaFileWord } from "react-icons/fa";
export const convertTools: TTool[] = [
  // {
  //   id: 'pdf-to-word',
  //   title: 'PDF to Word',
  //   description: 'Convert PDF documents to Word format while preserving layout',
  //   icon: <FileText />,
  //   category: ToolCategory.CONVERT,
  //   acceptedTypes: ['application/pdf'],
  //   handler: 'officepdf',
  // },
  // {
  //   id: 'pdf-to-excel',
  //   title: 'PDF to Excel',
  //   description: 'Extract tables from PDF into Excel spreadsheets(DOCX).',
  //   icon: <FileSpreadsheet />,
  //   category: ToolCategory.CONVERT,
  //   acceptedTypes: ['application/pdf'],
  //   handler: 'officepdf',
  // },
  // {
  //   id: "pdf-to-word",
  //   title: "PDF to PowerPoint",
  //   description: "Convert PDF to MS Word document(DOCX).",
  //   icon: <FileType />,
  //   category: ToolCategory.CONVERT,
  //   acceptedTypes: ["application/pdf"],
  //   handler: "",
  // },
  {
    id: "pdf-to-jpeg",
    title: "PDF to JPEG",
    description: "Convert PDF pages to high-quality JPEG images",
    icon: <Image />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ["application/pdf"],
    handler: "pdfimg",
    adobeMemeType: "PDF",
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG",
    description: "Convert PDF pages to high-quality PNG images",
    icon: <Image />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ["application/pdf"],
    handler: "pdfimg",
    adobeMemeType: "PDF",
  },
  // {
  //   id: 'image-to-pdf',
  //   title: 'Images to PDF',
  //   description: 'Convert JPG, PNG, TIFF to PDF files',
  //   icon: <FileUp />,
  //   category: ToolCategory.CONVERT,
  //   acceptedTypes: ['image/jpeg', 'image/png', 'image/tiff', 'image/bmp'],
  //   handler: '',
  // },
  {
    id: "html-to-pdf",
    title: "HTML to PDF",
    description: "Convert HTML files to PDF format",
    icon: <File />,
    category: ToolCategory.CONVERT,
    acceptedTypes: ["text/html"],
    handler: "htmlpdf",
    adobeMemeType: "ZIP",
  },
  // {
  //   id: "doc-to-pdf",
  //   title: "DOC to PDF",
  //   description: "Convert DOC (Word 97-2003) files to PDF format.",
  //   icon: <FaFileWord />,
  //   category: ToolCategory.CONVERT,
  //   acceptedTypes: [
  //     "application/msword", // MIME type for .doc
  //   ],
  //   handler: "docpdf",
  // },
  {
    id: "docx-to-pdf",
    title: "Word to PDF",
    description: "Convert DOCX files to PDF format.",
    icon: <FaFileWord />,
    category: ToolCategory.CONVERT,
    acceptedTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // MIME for .docx
    ],
    handler: "docxpdf",
    adobeMemeType: "DOCX",
  },

  // {
  //   id: 'pdf-to-text',
  //   title: 'PDF to Text',
  //   description: 'Convert PDF to plain text with layout preserved',
  //   icon: <FileText />,
  //   category: ToolCategory.CONVERT,
  //   acceptedTypes: ['application/pdf'],
  //   handler: 'extractpdf',
  // },
  // {
  //   id: 'pdf-to-json',
  //   title: 'PDF to JSON',
  //   description: 'Convert PDF to structured JSON format',
  //   icon: <FileCode />,
  //   category: ToolCategory.CONVERT,
  //   acceptedTypes: ['application/pdf'],
  //   handler: 'extract',
  // },
  // {
  //   id: 'pdf-to-html',
  //   title: 'PDF to HTML',
  //   description: 'Convert PDF to HTML with formatting preserved',
  //   icon: <File />,
  //   category: ToolCategory.CONVERT,
  //   acceptedTypes: ['application/pdf'],
  //   handler: 'htmlpdf',
  // },
];
