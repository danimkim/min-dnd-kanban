import { useKanbanContext } from '../contexts/KanbanContext';
import type { CardType } from '../types';

export default function Card(props: CardType) {
  const { deleteCard } = useKanbanContext();
  const { title, dueDate, priority } = props;
  return (
    <article>
      <header>
        <h3>{title}</h3>
      </header>
      <footer>
        <time>{dueDate}</time>
        <span>{priority}</span>
      </footer>
      <button onClick={() => deleteCard(props.id)}>🆇</button>
    </article>
  );
}
