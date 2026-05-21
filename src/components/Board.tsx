import { COLUMNS } from '../constants';
import type { CardType } from '../types';
import Column from './Column';

interface Props {
  cards: CardType[];
}

export default function Board({ cards }: Props) {
  return (
    <div className="border-slate-600 border-4">
      {COLUMNS.map((column) => (
        <Column key={column.id} column={column} cards={cards} />
      ))}
    </div>
  );
}
