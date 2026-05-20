import { COLUMNS } from '../constants';
import Column from './Column';

export default function Board() {
  return (
    <div className="border-slate-600 border-4">
      {COLUMNS.map((column) => (
        <Column key={column.id} {...column} />
      ))}
    </div>
  );
}
