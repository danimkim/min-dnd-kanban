import { useState } from 'react';
import { initialCards } from '../data/initialData';
import type { CardType } from '../types';

export function useKanban() {
  const [cards, setCards] = useState<CardType[]>(initialCards);

  const addCard = (card: CardType) => setCards((prev) => [...prev, card]);

  const deleteCard = ({ id }: Pick<CardType, 'id'>) =>
    setCards((prev) => prev.filter((card) => card.id !== id));

  const moveCard = ({ id, status }: Pick<CardType, 'id' | 'status'>) => {
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
