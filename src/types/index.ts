export type TodoStatus = 'todo' | 'inProgress' | 'done';
export type Priority = 'low' | 'mid' | 'high';

export type CardType = {
  id: string;
  title: string;
  dueDate: string;
  status: TodoStatus;
  priority: Priority;
};

export type ColumnData = {
  id: TodoStatus;
  title: string;
  cards: CardType[];
};

export type ColumnType = { id: TodoStatus; title: string };
