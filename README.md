# Mini Kanban Board

A lightweight Kanban board built with React and TypeScript, featuring drag-and-drop card management and REST API integration.

## Features

- **Drag and Drop** — Move cards between columns using `@dnd-kit/react`
- **Three-column board** — To Do / In Progress / Done
- **Card management** — Add, edit, and delete cards with title, due date, and priority
- **REST API integration** — All card operations are persisted via a remote API
- **Optimistic updates** — UI updates immediately on mutation; rolls back on API failure

## Tech Stack

| Category         | Library / Tool                                 |
| ---------------- | ---------------------------------------------- |
| Framework        | React 19 + TypeScript                          |
| Build tool       | Vite                                           |
| Styling          | TailwindCSS                                    |
| Drag & Drop      | @dnd-kit/react                                 |
| State management | React Context + custom hook                    |
| API              | Fetch (REST) via [MockAPI](https://mockapi.io) |

## Project Structure

```
src/
├── components/
│   ├── Board.tsx          # DragDropProvider wrapper, renders columns
│   ├── Column.tsx         # Droppable column with card list
│   ├── Card.tsx           # Draggable card with edit/delete
│   └── AddCardForm.tsx    # Form for creating new cards
├── contexts/
│   └── KanbanContext.tsx  # Global state provider
├── hooks/
│   └── useKanban.ts       # Card CRUD logic and state
├── lib/
│   └── api.ts             # Typed fetch wrapper (GET/POST/PUT/DELETE)
├── types/
│   └── index.ts           # CardType, ColumnType, TodoStatus, Priority
└── constants/
    └── index.ts           # Column definitions
```

## Demo

https://mini-dnd-kanban.vercel.app

## Data Model

```ts
type CardType = {
  id: string;
  title: string;
  dueDate: string;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'mid' | 'high';
};
```

## API Endpoints

| Method | Endpoint     | Description                                      |
| ------ | ------------ | ------------------------------------------------ |
| GET    | `/cards`     | Fetch all cards                                  |
| POST   | `/cards`     | Create a new card                                |
| PUT    | `/cards/:id` | Update a card (title, status, priority, dueDate) |
| DELETE | `/cards/:id` | Delete a card                                    |
