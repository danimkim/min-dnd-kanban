import { useDraggable } from '@dnd-kit/react';
import { useKanbanContext } from '../contexts/KanbanContext';
import type { CardType, Priority } from '../types';

const priorityDot: Record<Priority, string> = {
  high: 'bg-red-400',
  mid: 'bg-amber-400',
  low: 'bg-emerald-400',
};

interface Props extends CardType {
  todoStatus: string;
}

export default function Card(props: Props) {
  const { deleteCard } = useKanbanContext();
  const { title, dueDate, priority, todoStatus } = props;
  const { ref, isDragging } = useDraggable({ id: props.id });

  const today = new Date();
  const hasDuePassed = new Date(dueDate) < today;

  const dueDateColor = hasDuePassed
    ? todoStatus === 'Done'
      ? 'text-gray-400'
      : 'text-red-400'
    : 'text-gray-400';

  return (
    <article
      ref={ref}
      className={`group bg-white rounded-lg shadow-sm border border-gray-100 p-3 cursor-grab transition-all duration-150 ${
        isDragging ? 'shadow-lg rotate-1 opacity-90' : ''
      }`}
    >
      <header className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-gray-800 leading-snug">{title}</h3>
        <button
          onClick={() => deleteCard(props.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-opacity duration-150 text-xs shrink-0"
          aria-label="Delete card"
        >
          ✕
        </button>
      </header>
      <footer className="flex items-center gap-2 mt-2">
        <span className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[priority]}`} />
        {dueDate && <time className={`text-xs ${dueDateColor}`}>📅 {dueDate}</time>}
      </footer>
    </article>
  );
}
