export interface Todo {
  id: number;
  text: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  selected?: boolean;
}
