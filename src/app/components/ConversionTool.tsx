import React, { useState } from 'react';
import { UploadZone } from './UploadZone';
import { tools } from '../constants/tools';
import { ArrowLeft } from 'lucide-react';

interface ConversionToolProps {
  selectedTool: string;
  file: File | null;
  onFileSelect: (file: File) => void;
  onBack: () => void;
}

export function ConversionTool({ selectedTool, file, onFileSelect, onBack }: ConversionToolProps) {
  const tool = tools.find(t => t.id === selectedTool);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);

  if (!tool) return null;

  async function handleSubmit() {
    if (!file || !tool) return;
    
    setIsLoading(true);
    setError(null);
    setConvertedFile(null);

    try {
      const formdata= new FormData() 
      formdata.append('tool',JSON.stringify(tool))
      formdata.append('file',file)
      const buffer = await fetch('/api',{
        method:"POST",
        body:formdata,
      }) 

      console.log('buffer',buffer);
      
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  function downloadConvertedFile() {
    if (convertedFile && tool) {
      const url = URL.createObjectURL(convertedFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted-file.${tool.fileExportType}`;
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
        {tool.title}
      </h3>
      <UploadZone 
        onFileSelect={onFileSelect} 
        acceptedTypes={tool.acceptedTypes}
      />
      {file && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
          <button
            className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Converting...' : 'Convert Now'}
          </button>
        </div>
      )}
      {convertedFile && (
        <div className="mt-4">
          <p className="text-sm text-green-600">Conversion successful! Download your file below.</p>
          <button
            className="mt-4 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            onClick={downloadConvertedFile}
          >
            Download Converted File
          </button>
        </div>
      )}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <button
        className="mt-8 flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to all tools
      </button>
    </div>
  );
}
