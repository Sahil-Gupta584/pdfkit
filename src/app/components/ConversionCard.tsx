import React, { Attributes } from 'react';
import { ArrowRight } from 'lucide-react';

interface ConversionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function ConversionCard({ title, description, icon, onClick }: ConversionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left w-full border border-transparent hover:border-indigo-100 hover:bg-white/80"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
          {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 text-white' } as Attributes )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 mt-2 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </button>
  );
}