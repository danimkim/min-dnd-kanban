import { useEffect, useState } from 'react';
import type { CardType, TodoStatus } from '../types';
import api from '../lib/api';

export function useKanban() {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    let isMounted = true;

    /** get initial data from api */
    const loadInitialData = async () => {
      try {
        const res = await api.get<CardType[]>('/cards');
        if (isMounted && res) {
          setCards(res);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const addCard = (card: CardType) => setCards((prev) => [...prev, card]);

  const deleteCard = (id: string) => setCards((prev) => prev.filter((card) => card.id !== id));

  const moveCard = ({ id, status }: { id: string; status: TodoStatus }) => {
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
  return { addCard, deleteCard, moveCard, cards };
}
