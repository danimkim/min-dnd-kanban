import { useState } from 'react';

import type { CardType, Priority, TodoStatus } from '../types';
import { useKanbanContext } from '../contexts/KanbanContext';

interface Props {
  formHandler: {
    toggleForm: () => void;
  };
  status: TodoStatus;
}

export default function AddCardForm({ formHandler, status }: Props) {
  const { addCard } = useKanbanContext();
  const { toggleForm } = formHandler;

  const initialFormdata: CardType = {
    id: '',
    title: '',
    dueDate: '',
    priority: 'low',
    status: 'todo',
  };

  const [formData, setFormData] = useState<CardType>(initialFormdata);

  const resetFormData = () => setFormData(initialFormdata);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFormData = {
      ...formData,
      id: crypto.randomUUID(),
      status,
    };

    addCard(newFormData);
    resetFormData();
    toggleForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Title</label>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormData((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <label htmlFor="">Date</label>
      <input
        type="date"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormData((prev) => ({
            ...prev,
            dueDate: e.target.value,
          }))
        }
      />
      <select
        name=""
        id=""
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFormData((prev) => ({
            ...prev,
            priority: e.target.value as Priority,
          }))
        }
      >
        <option value="low">Low</option>
        <option value="mid">Mid</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add</button>
      <button onClick={toggleForm}>🆇</button>
    </form>
  );
}
