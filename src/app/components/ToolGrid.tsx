'use client';
import { ConversionCard } from './ConversionCard';
import { tools } from '../constants/tools';
import { ToolCategory } from '../constants/toolCategories';
import { ToolGridProps } from '../types';

export function ToolGrid({ onToolSelect }: ToolGridProps) {
  const categories = Object.values(ToolCategory);

  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const categoryTools = tools.filter(tool => tool.category === category)
        
        return (
          <div key={category} className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTools.map((tool) => (
                <ConversionCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  onClick={() => onToolSelect(tool.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}