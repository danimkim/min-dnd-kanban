import { initialCards } from '../data/initialData';
import type { CardType, ColumnType } from '../types';
import Card from './Card';

export default function Column(props: ColumnType) {
  const { id, title } = props;

  const filteredCards = initialCards.filter((card: CardType) => card.status === id);

  return (
    <section className="border-red-400 border">
      <header>
        <h2>{title}</h2>
      </header>
      {filteredCards.map((card: CardType) => (
        <Card key={card.id} {...card} />
      ))}
    </section>
  );
}
