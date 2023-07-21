import { User } from 'firebase/auth';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GameModes, GameStatus } from '../interfaces/game.d';
import fetchParagraphForGame from '../lib/fetchParagraphForGame';
import calculateWordsPerMinute from '../utils/calculateAccuracyAndWPM';

interface GameState {
  mode: GameModes;
  timer: number;
  duration: number;
  difficulty: string;
  loading: string | null;
  paragraph: string | null;
  gameStatus: GameStatus;
  wpm: number;
  typed: string;
  accuracy: number;
  players: User[];
  correctWordsArray: string[];
  incorrectWordsArray: string[];
  roomId: string | null;
  setPlayers: (players: User[]) => void;
  setTyped: (typed: string) => void;
  setMode: (mode: GameModes) => void;
  startGame: () => void;
  endGame: () => void;
  setDuration: (duration: number) => void;
  decrementTimer: () => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setRoomId: (roomId: string) => void;
}

const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    mode: GameModes.SINGLE_PLAYER,
    timer: 0,
    duration: 0,
    difficulty: 'easy',
    paragraph: null,
    loading: null,
    wpm: 0,
    gameStatus: GameStatus.WAITING,
    typed: '',
    accuracy: 0,
    players: [],
    correctWordsArray: [],
    incorrectWordsArray: [],
    roomId: null,

    setRoomId: (roomId) => set({ roomId }),

    setPlayers: (players) => set({ players }),

    setGameStatus: (gameStatus) => set({ gameStatus }),

    setTyped: (typed) => {
      set({ typed });
      const {
        wordsPerMinute,
        accuracy,
        correctWordsArray,
        incorrectWordsArray,
      } = calculateWordsPerMinute(get().paragraph!, typed, get().duration / 60);

      set({
        wpm: wordsPerMinute,
        accuracy,
        correctWordsArray: correctWordsArray,
        incorrectWordsArray: incorrectWordsArray,
      });
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
        correctWordsArray: [],
        incorrectWordsArray: [],
      }),
    decrementTimer: () => set({ timer: get().timer - 1 }),
    setDuration: (duration) => set({ duration }),
    setMode: (mode) => set({ mode }),
  }))
);

export default useGameStore;
