import { useState } from 'react';
import { useKanban } from '../hooks/useKanban';
import type { CardType, Priority, TodoStatus } from '../types';

interface Props {
  formHandler: {
    toggleForm: () => void;
  };
  status: TodoStatus;
}

export default function AddCardForm({ formHandler, status }: Props) {
  const { toggleForm } = formHandler;

  const initialFormdata: CardType = {
    id: '5',
    title: '',
    dueDate: '',
    priority: 'low',
    status: 'todo',
  };

  const { addCard } = useKanban();
  const [formData, setFormData] = useState<CardType>(initialFormdata);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // TODO: generate random id
    setFormData((prev) => ({
      ...prev,
      status,
    }));
    console.log(formData);

    addCard(formData);
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
        <option value="">Low</option>
        <option value="">Mid</option>
        <option value="">High</option>
      </select>
      <button type="submit">Add</button>
      <button onClick={toggleForm}>🆇</button>
    </form>
  );
}
