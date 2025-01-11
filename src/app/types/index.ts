import { ToolCategory } from '../constants/toolCategories';

export interface TTool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  acceptedTypes: string[];
  category: ToolCategory;
  taskType:'compress'|'merge'|'editpdf'|'extract'|'htmlpdf'|'imagepdf'|'merge'|'officepdf'|'pagenumber'|'pdfa'|'pdfjpg'|'pdfocr'|'protect'|'repair'|'rotate'|'sign'|'split'|'unlock'|'validatepdfa'|'watermark'
}


export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string[];
  selectedTool:TTool
  setMergingFiles:(files:File[])=>void
}

export interface ToolGridProps {
  onToolSelect: (tool:TTool) => void;
}