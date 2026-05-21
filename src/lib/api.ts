import type { CardType } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.status}`);
    }

    return response.json();
  },
  post: async <T>(endpoint: string, body: CardType): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed: ${response.status}`);
    }

    return response.json();
  },
  put: async <T>(endpoint: string, body: CardType): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`PUT ${endpoint} failed: ${response.status}`);
    }

    return response.json();
  },
  delete: async (endpoint: string, id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`DELETE ${endpoint}/${id} failed: ${response.status}`);
    }

    return response.json();
  },
};

export default api;
