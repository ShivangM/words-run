import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  GameDifficulties,
  GameDuration,
  GameModes,
  GameStatus,
  Progress,
} from '../interfaces/game.d';
import { ExtendedUser } from '../interfaces/user';
import fetchParagraphForGame from '../lib/fetchParagraphForGame';
import calculateWordsPerMinute from '../utils/calculateAccuracyAndWPM';
import { db } from '../utils/firebase';
import { socket } from '../utils/socket';

interface GameState {
  timer: number;
  mode: GameModes;
  duration: GameDuration;
  difficulty: GameDifficulties;
  gameStatus: GameStatus;
  loading: string | null;
  paragraph: string | null;
  wpm: number;
  typed: string;
  accuracy: number;
  players: ExtendedUser[];
  progress: Map<string, Progress>;
  correctWordsArray: string[];
  incorrectWordsArray: string[];
  roomId: string | null;
  owner: string | null;
  setMode: (mode: GameModes) => void;
  setDuration: (duration: GameDuration) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setDificulty: (difficulty: GameDifficulties) => void;
  setPlayers: (players: ExtendedUser[]) => void;
  setTyped: (typed: string) => void;
  startGame: () => void;
  endGame: (user: ExtendedUser) => void;
  decrementTimer: () => void;
  setRoomId: (roomId: string) => void;
  setOwner: (owner: string) => void;
  setProgress: (progress: Progress, socketId: string) => void;
  setParagraph: (paragraph: string) => void;
  setTimer: (timer: number) => void;
  setWpm: (wpm: number) => void;
  setAccuracy: (accuracy: number) => void;
}

const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    loading: null,
    players: [],
    roomId: null,
    owner: null,
    mode: GameModes.SINGLE_PLAYER,
    duration: GameDuration.ONE_MIN,
    difficulty: GameDifficulties.EASY,
    gameStatus: GameStatus.WAITING,
    wpm: 0,
    accuracy: 0,
    timer: 0,
    paragraph: null,
    typed: '',
    correctWordsArray: [],
    incorrectWordsArray: [],
    progress: new Map(),

    setWpm: (wpm) => set({ wpm }),
    setAccuracy: (accuracy) => set({ accuracy }),

    setTimer: (timer) => set({ timer }),
    setParagraph: (paragraph) => set({ paragraph }),

    setProgress: (progress, socketId) => {
      const progressMap = get().progress;
      progressMap.set(socketId, progress);
      set({ progress: progressMap });
    },

    //Game Settings
    setDuration: (duration) => set({ duration }),
    setMode: (mode) => set({ mode }),
    setDificulty: (difficulty) => set({ difficulty }),

    //Game State
    setGameStatus: (gameStatus) => {
      set({ gameStatus });
    },

    //Play With Firends Mode
    setOwner: (owner) => set({ owner }),
    setRoomId: (roomId) => set({ roomId }),
    setPlayers: (players) => set({ players }),

    setTyped: (typed) => {
      set({ typed });
      const {
        wordsPerMinute,
        accuracy,
        correctWordsArray,
        incorrectWordsArray,
      } = calculateWordsPerMinute(get().paragraph!, typed, get().duration / 60);

      if (get().mode !== GameModes.SINGLE_PLAYER) {
        socket.emit('progressUpdate', {
          roomId: get().roomId,
          progress: {
            wpm: wordsPerMinute,
            accuracy,
          },
        });
      }

      set({
        wpm: wordsPerMinute,
        accuracy,
        correctWordsArray: correctWordsArray,
        incorrectWordsArray: incorrectWordsArray,
      });
    },

    startGame: async () => {
      set({
        loading: 'Generating a paragraph for you! Please Wait....',
        timer: 0,
        accuracy: 0,
        wpm: 0,
      });

      const response = await fetchParagraphForGame(
        get().difficulty,
        get().duration
      );

      if (get().mode !== GameModes.SINGLE_PLAYER) {
        socket.emit('gameStatus', {
          status: GameStatus.PLAYING,
          paragraph: response?.content,
          roomId: get().roomId,
          timer: get().duration,
        });
      }

      set({
        timer: get().duration,
        gameStatus: GameStatus.PLAYING,
        loading: null,
        paragraph: response?.content,
      });
    },

    endGame: async (user) => {
      if (get().mode !== GameModes.SINGLE_PLAYER) {
        socket.emit('gameStatus', {
          status: GameStatus.FINISHED,
        });
      }

      const game = {
        wpm: get().wpm,
        accuracy: get().accuracy,
        duration: get().duration,
        difficulty: get().difficulty,
        mode: get().mode,
      };

      if (user?.uid) {
        try {
          await setDoc(doc(db, 'users', user?.uid), {
            games: arrayUnion(game),
          });
        } catch (error) {
          console.error(error);
        }
      }

      set({
        gameStatus: GameStatus.FINISHED,
        typed: '',
        correctWordsArray: [],
        incorrectWordsArray: [],
      });
    },

    decrementTimer: () => set({ timer: get().timer - 1 }),
  }))
);

export default useGameStore;
