import { useState } from 'react';
import type { CardType, ColumnType } from '../types';
import Card from './Card';
import AddCardForm from './AddCardForm';

interface Props {
  column: ColumnType;
  cards: CardType[];
}

export default function Column({ column, cards }: Props) {
  const [open, setOpen] = useState(false);
  const { id, title } = column;

  const filteredCards = cards.filter((card: CardType) => card.status === id);

  const handleNewCardForm = {
    toggleForm: () => setOpen((prev) => !prev),
  };

  return (
    <section className="border-red-400 border">
      <header>
        <h2>{title}</h2>
      </header>
      {filteredCards.map((card: CardType) => (
        <Card key={card.id} {...card} />
      ))}
      {!open ? (
        <button onClick={() => setOpen((prev) => !prev)}>Add new card</button>
      ) : (
        <AddCardForm formHandler={handleNewCardForm} status={column.id} />
      )}
    </section>
  );
}
