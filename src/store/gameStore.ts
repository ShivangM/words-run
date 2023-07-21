import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GameStatus } from '../interfaces/game.d';
import fetchParagraphForGame from '../lib/fetchParagraphForGame';
import calculateWordsPerMinute from '../utils/calculateAccuracyAndWPM';

interface GameState {
  mode: string;
  timer: number;
  duration: number;
  difficulty: string;
  loading: string | null;
  paragraph: string | null;
  gameStatus: GameStatus;
  wpm: number;
  typed: string;
  accuracy: number;
  setTyped: (typed: string) => void;
  setMode: (mode: string) => void;
  startGame: () => void;
  endGame: () => void;
  setDuration: (duration: number) => void;
  decrementTimer: () => void;
  setGameStatus: (gameStatus: GameStatus) => void;
}

const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    mode: 'single',
    timer: 0,
    duration: 0,
    difficulty: 'easy',
    paragraph: null,
    loading: null,
    wpm: 0,
    gameStatus: GameStatus.WAITING,
    typed: '',
    accuracy: 0,

    setGameStatus: (gameStatus) => set({ gameStatus }),

    setTyped: (typed) => {
      set({ typed });
      const { wordsPerMinute, accuracy } = calculateWordsPerMinute(
        get().paragraph!,
        typed,
        get().duration / 60
      );
      set({ wpm: wordsPerMinute, accuracy });
    },

    startGame: async () => {
      set({ loading: 'Generating a paragraph for you! Please Wait....' });

      const response = await fetchParagraphForGame(
        get().difficulty,
        get().duration
      );

      set({
        timer: get().duration,
        gameStatus: GameStatus.PLAYING,
        loading: null,
        paragraph: response?.content,
      });
    },
    endGame: () =>
      set({
        timer: 0,
        gameStatus: GameStatus.FINISHED,
        typed: '',
        accuracy: 0,
        wpm: 0,
      }),
    decrementTimer: () => set({ timer: get().timer - 1 }),
    setDuration: (duration) => set({ duration }),
    setMode: (mode) => set({ mode }),
  }))
);

export default useGameStore;
