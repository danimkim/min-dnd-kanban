import type { Card } from '../types';

export const initialCards: Card[] = [
  {
    id: '1',
    title: 'Create React+Vite project',
    status: 'todo',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
  },
  {
    id: '2',
    title: 'Review project structure',
    status: 'todo',
    priority: 'mid',
    dueDate: new Date().toISOString().split('T')[0],
  },
  {
    id: '3',
    title: 'Define types',
    status: 'inProgress',
    priority: 'low',
    dueDate: new Date().toISOString().split('T')[0],
  },
];
