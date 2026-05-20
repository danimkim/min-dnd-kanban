import { useState } from 'react';
import { initialCards } from '../data/initialData';
import type { Card } from '../types';

export function useKanban() {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const addCard = (card: Card) => setCards((prev) => [...prev, card]);

  const deleteCard = ({ id }: Pick<Card, 'id'>) =>
    setCards((prev) => prev.filter((card) => card.id !== id));

  const moveCard = ({ id, status }: Pick<Card, 'id' | 'status'>) => {
    setCards((prev) => {
      return prev.map((card) =>
        card.id === id
          ? {
              ...card,
              status,
            }
          : card
      );
    });
  };
  return { addCard, deleteCard, moveCard };
}
