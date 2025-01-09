import { ToolCategory } from '../constants/toolCategories';

export interface TTool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  acceptedTypes: string[];
  category: ToolCategory;
  fileInputType:'AI'|'BMP'|'CSV'|'DOC'|'DOCX'|'GIF'|'HTML'|'JPEG'|'JPG'|'JSON'|'PDF'|'PNG'|'PPT'|'PPTX'|'PSD'|'TIF'|'TIFF'|'TXT'|'XLS'|'XLSX'|'ZIP';
  fileExportType:'AI'|'BMP'|'CSV'|'DOC'|'DOCX'|'GIF'|'HTML'|'JPEG'|'JPG'|'JSON'|'PDF'|'PNG'|'PPT'|'PPTX'|'PSD'|'TIF'|'TIFF'|'TXT'|'XLS'|'XLSX'|'ZIP';
}


export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string[];
}

export interface ToolGridProps {
  onToolSelect: (toolId: string) => void;
}