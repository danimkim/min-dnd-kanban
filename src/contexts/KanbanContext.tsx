import { createContext, useContext, type ReactNode } from 'react';
import { useKanban } from '../hooks/useKanban';

export type KanbanContextType = ReturnType<typeof useKanban>;

const KanbanContext = createContext<KanbanContextType | null>(null);

export function KanbanProvider({ children }: { children: ReactNode }) {
  const state = useKanban();

  return <KanbanContext.Provider value={state}>{children}</KanbanContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useKanbanContext() {
  const context = useContext(KanbanContext);

  if (!context) {
    throw new Error('useKanbanContext can only be used inside of provider');
  }

  return context;
}
