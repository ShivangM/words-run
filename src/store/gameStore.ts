import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GameState {
  Games: number;
  increase: (by: number) => void;
}

const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set) => ({
        Games: 0,
        increase: (by) => set((state) => ({ Games: state.Games + by })),
      }),
      {
        name: 'Game-storage',
      }
    )
  )
);

export default useGameStore;
