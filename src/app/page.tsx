'use client';
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ToolGrid } from './components/ToolGrid';
import { ConversionTool } from './components/ConversionTool';
import { TTool } from './types';

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<TTool | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleBack = () => {
    setSelectedTool(null);
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Convert and Edit PDF Files
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Professional PDF tools to convert, edit, and modify your documents
          </p>
        </div>

        {!selectedTool ? (
          <ToolGrid onToolSelect={setSelectedTool} />
        ) : (
          <ConversionTool
            selectedTool={selectedTool}
            file={file}
            setFile={setFile}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}

