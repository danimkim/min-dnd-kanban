import { useDraggable } from '@dnd-kit/react';
import { useKanbanContext } from '../contexts/KanbanContext';
import type { CardType } from '../types';

export default function Card(props: CardType) {
  const { deleteCard } = useKanbanContext();
  const { title, dueDate, priority } = props;
  const { ref } = useDraggable({
    id: props.id,
  });

  return (
    <article ref={ref}>
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
