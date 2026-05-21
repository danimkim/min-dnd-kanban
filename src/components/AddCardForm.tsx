import { useState } from 'react';
import type { CardType, Priority, TodoStatus } from '../types';
import { useKanbanContext } from '../contexts/KanbanContext';

interface Props {
  formHandler: {
    toggleForm: () => void;
  };
  status: TodoStatus;
}

const inputClass =
  'w-full border border-gray-200 rounded-md text-sm px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-900';

export default function AddCardForm({ formHandler, status }: Props) {
  const { addCard } = useKanbanContext();
  const { toggleForm } = formHandler;

  const initialFormData: CardType = {
    id: '',
    title: '',
    dueDate: '',
    priority: 'low',
    status: 'todo',
  };

  const [formData, setFormData] = useState<CardType>(initialFormData);

  const resetFormData = () => setFormData(initialFormData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = { ...formData, id: crypto.randomUUID(), status };
    addCard(newFormData);
    resetFormData();
    toggleForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 bg-white rounded-lg border border-gray-200 p-3 flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Card title"
        value={formData.title}
        className={inputClass}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        required
      />
      <div className="flex gap-2">
        <input
          type="date"
          value={formData.dueDate}
          className={`${inputClass} flex-1`}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
          }
        />
        <select
          value={formData.priority}
          className={`${inputClass} flex-1`}
          onChange={(e) =>
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
      </div>
      <div className="flex gap-2 items-center">
        <button
          type="submit"
          className="bg-gray-900 text-white text-sm rounded-md px-3 py-1.5 hover:bg-gray-700 transition-colors duration-150"
        >
          Add
        </button>
        <button
          type="button"
          onClick={toggleForm}
          className="text-gray-400 text-sm hover:text-gray-600 transition-colors duration-150"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
