import './App.css';
import Board from './components/Board';
import { KanbanProvider } from './contexts/KanbanContext';

function App() {
  return (
    <KanbanProvider>
      <div>
        <h1 className="text-3xl font-bold text-blue-500">Kanban Board🎉</h1>
      </div>
      <Board />
    </KanbanProvider>
  );
}

export default App;
