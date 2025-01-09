
import { TTool  } from '../types';
import { ToolCategory } from '../constants/toolCategories';

export const getToolsByCategory = async(tools: TTool[], category: ToolCategory): Promise<TTool[]> => {
  
  return tools.filter(tool => tool.category === category);
};

export const getAcceptedFileTypes = async(tool: TTool ): Promise<string> => {
  return tool.acceptedTypes.join(', ');
};