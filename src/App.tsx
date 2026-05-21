import './App.css';
import Board from './components/Board';
import { useKanban } from './hooks/useKanban';

function App() {
  const { cards } = useKanban();

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-blue-500">Kanban Board🎉</h1>
      </div>
      <Board cards={cards} />
    </>
  );
}

export default App;
