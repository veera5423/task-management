export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  priority: string | 'General';
  category: string;
  estimatedTime?: string;
  dueDate?: string;
  aiSuggestions?: {
    category: string;
    priority: 'high' | 'medium' | 'low';
    estimatedTime: string;
    dueDate: string;
  };
}

export type TodoFilter = 'all' | 'active' | 'completed';

export type View = 'tasks' | 'analytics' | 'settings' | 'how-to-use'; 