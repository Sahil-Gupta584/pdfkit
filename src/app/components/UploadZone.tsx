import React from 'react';
import { Upload } from 'lucide-react';
import { FileUploadProps } from '../types';

export function UploadZone({ onFileSelect, acceptedTypes, selectedTool,setMergingFiles }: FileUploadProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && acceptedTypes.includes(files[0].type)) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const  mergingFiles=[]

    if (files && files.length > 0) {
      
      onFileSelect(files[0]);
      
      for (const file of files) {
        console.log(file);
        mergingFiles.push(file)
      }
      console.log('mergingFiles',mergingFiles);
      
      setMergingFiles(mergingFiles)
    }
  };

  return (
    <div
      className="border-2 border-dashed border-indigo-200 rounded-lg p-12 text-center hover:border-indigo-400 transition-colors duration-300 bg-white/60 backdrop-blur-sm group"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileInput}
        className="hidden"
        id="fileInput"
        multiple={selectedTool.taskType === 'merge' ? true : false}
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer flex flex-col items-center"
      >
        <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <p className="text-lg font-medium text-gray-900">Drop your file here</p>
        <p className="text-sm text-gray-500 mt-1">or click to browse</p>
        <p className="text-xs text-gray-400 mt-2">
          Supported formats: {acceptedTypes.join(', ')}
        </p>
      </label>
    </div>
  );
}