
import { TTool  } from '../types';
import { convertTools } from './tool-categories/convertTools';
import { editTools } from './tool-categories/editTools';
import { securityTools } from './tool-categories/securityTools';
import { optimizeTools } from './tool-categories/optimizeTools';

export const tools: TTool[] = [
  ...convertTools,
  ...editTools,
  ...securityTools,
  ...optimizeTools,
];