import { ToolCategory } from "../constants/toolCategories";

export interface TTool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  acceptedTypes: string[];
  category: ToolCategory;
  handler:
    | "pdfdocx"
    | "docxpdf"
    | "docpdf"
    | "pptxpdf"
    | "rtfpdf"
    | "xlsxpdf"
    | "pdfimg"
    | "htmlpdf"
    | "pdfocr"
    | "lockpdf"
    | "unlockpdf"
    | "splitpdf"
    | "mergepdf"
    | "compresspdf";
  adobeMemeType?: string;
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string[];
  selectedTool: TTool;
  setMergingFiles: (files: File[]) => void;
}

export interface ToolGridProps {
  onToolSelect: (tool: TTool) => void;
}
