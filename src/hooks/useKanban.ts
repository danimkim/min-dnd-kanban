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

  const addCard = async (formData: CardType) => {
    const { id, title, status, priority, dueDate } = formData;

    setCards((prev) => [...prev, formData]);

    try {
      await api.post<CardType>('/cards', { id, title, status, priority, dueDate });
    } catch (err) {
      setCards((prev) => prev.filter((card) => card.id !== formData.id));
      console.error(err);
    }
  };

  // const deleteCard = (id: string) => setCards((prev) => prev.filter((card) => card.id !== id));
  const deleteCard = async (id: string) => {
    const res = await api.delete('/cards', id);
    return res;
  };

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
