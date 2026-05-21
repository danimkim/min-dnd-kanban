import { useState } from 'react';
import type { CardType, ColumnType } from '../types';
import Card from './Card';
import AddCardForm from './AddCardForm';
import { useDroppable } from '@dnd-kit/react';

interface Props {
  column: ColumnType;
  cards: CardType[];
}

export default function Column({ column, cards }: Props) {
  const [open, setOpen] = useState(false);
  const { isDropTarget, ref } = useDroppable({ id: column.id });
  const { id, title } = column;

  const filteredCards = cards.filter((card: CardType) => card.status === id);

  const handleNewCardForm = {
    toggleForm: () => setOpen((prev) => !prev),
  };

  return (
    <section
      ref={ref}
      className={`w-80 min-h-[500px] rounded-xl p-4 flex flex-col transition-colors duration-150 ${
        isDropTarget ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
      }`}
    >
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
        <span className="bg-gray-200 text-gray-600 text-xs rounded-full px-2 py-0.5">
          {filteredCards.length}
        </span>
      </header>
      <div className="flex flex-col gap-2 flex-1">
        {filteredCards.map((card: CardType) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      {!open ? (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="mt-3 w-full py-2 text-sm text-gray-400 hover:text-gray-600 border border-dashed border-gray-200 rounded-lg transition-colors duration-150"
        >
          + Add card
        </button>
      ) : (
        <AddCardForm formHandler={handleNewCardForm} status={column.id} />
      )}
    </section>
  );
}
