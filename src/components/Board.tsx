import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { COLUMNS } from '../constants';
import { useKanbanContext } from '../contexts/KanbanContext';
import Column from './Column';
import type { TodoStatus } from '../types';

export default function Board() {
  const { cards, moveCard } = useKanbanContext();

  const onDragEnd = (e: DragEndEvent) => {
    // if drag event is cancelled
    if (e.canceled) return;
    const sourceCardId = e.operation.source?.id as string;
    const targetColumnId = e.operation.target?.id as TodoStatus;

    if (sourceCardId && targetColumnId) {
      moveCard({ id: sourceCardId, status: targetColumnId });
    }

    const sourceCard = cards.find((card) => card.id === sourceCardId);

    // if source card is already in target column
    if (sourceCard?.status === targetColumnId) return;
  };

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <div className="border-slate-600 border-4">
        {COLUMNS.map((column) => (
          <Column key={column.id} column={column} cards={cards} />
        ))}
      </div>
    </DragDropProvider>
  );
}
