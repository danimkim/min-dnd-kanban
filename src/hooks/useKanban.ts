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

  const deleteCard = async (id: string) => {
    const previousCards = cards;

    setCards((prev) => prev.filter((card) => card.id !== id));

    try {
      await api.delete('/cards', id);
    } catch (err) {
      setCards(previousCards);
      console.error(err);
    }
  };

  const moveCard = async ({ id, status }: { id: string; status: TodoStatus }) => {
    const previousCards = cards;
    const updatedCard = cards.find((card) => card.id === id);
    if (!updatedCard) return;

    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, status } : card))
    );

    try {
      await api.put<CardType>(`/cards/${id}`, { ...updatedCard, status });
    } catch (err) {
      setCards(previousCards);
      console.error(err);
    }
  };
  return { addCard, deleteCard, moveCard, cards };
}
