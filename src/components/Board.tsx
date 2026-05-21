import { COLUMNS } from '../constants';
import { useKanbanContext } from '../contexts/KanbanContext';
import Column from './Column';

export default function Board() {
  const { cards } = useKanbanContext();
  return (
    <div className="border-slate-600 border-4">
      {COLUMNS.map((column) => (
        <Column key={column.id} column={column} cards={cards} />
      ))}
    </div>
  );
}
