import './App.css';
import Board from './components/Board';
import { KanbanProvider } from './contexts/KanbanContext';

function App() {
  return (
    <KanbanProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white border-b border-gray-100 py-4 px-6">
          <h1 className="text-xl font-bold text-gray-800">📋 Kanban Board</h1>
        </header>
        <main className="p-6">
          <Board />
        </main>
      </div>
    </KanbanProvider>
  );
}

export default App;
