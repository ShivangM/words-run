import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  GameDifficulties,
  GameDuration,
  GameModes,
} from '../interfaces/game.d';
import { GameSettings, Progress, Room, RoomStatus } from '../interfaces/room.d';
import { User } from '../interfaces/user';
import fetchParagraphForGame from '../lib/fetchParagraphForGame';
import calculateWordsPerMinute from '../utils/calculateAccuracyAndWPM';
import { db } from '../utils/firebase';
import getDuration from '../utils/getDuration';
import { socket } from '../utils/socket';

interface GameState {
  loading: string | null;
  error: Error | null;
  room: Room | null;
  typed: string;
  userProgress: Progress | null;
  createRoom: (user: User) => void;
  joinRoom: (roomId: string, user: User) => void;
  exitRoom: () => void;
  updateRoom: (room: Room) => void;
  gameStatusUpdate: (roomId: string, status: string) => void;
  userProgressUpdate: (
    roomId: string,
    socketId: string,
    progress: Progress
  ) => void;
  startGame: () => void;
  setTyped: (typed: string) => void;
  setMode: (mode: GameModes) => void;
  setDuration: (duration: GameDuration) => void;
  setDificulty: (difficulty: GameDifficulties) => void;
  resetRoom: () => void;
  resetProgress: () => void;
}

const initialRoom: Room = {
  gameSettings: {
    mode: GameModes.SINGLE_PLAYER,
    difficulty: GameDifficulties.EASY,
    duration: GameDuration.ONE_MIN,
  },
};

const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    loading: null,
    error: null,
    room: initialRoom,
    typed: '',
    userProgress: {
      wpm: 0,
      accuracy: 0,
      correctWordsArray: [],
      incorrectWordsArray: [],
    },

    createRoom: async (user) => {
      const gameSettings = get().room?.gameSettings!;

      if (gameSettings.mode === GameModes.SINGLE_PLAYER) {
        set({
          room: { ...get().room!, users: [user], status: RoomStatus.WAITING },
        });
      } else if (gameSettings.mode === GameModes.WITH_FRIENDS) {
        set({ loading: 'Creating a room for you! Please Wait....' });

        socket.emit('createRoom', user, gameSettings, (res) => {
          if (res.success === false) {
            set({ error: res.error });
          } else {
            set({ room: res.data });
          }
        });

        set({ loading: null });
      }
    },

    joinRoom: (roomId, user) => {
      set({ loading: 'Joining the room! Please Wait....' });
      socket.emit('joinRoom', roomId, user, (res) => {
        if (res.success === false) {
          set({ error: res.error });
        }
      });

      set({ loading: null });
    },

    exitRoom: () => {
      set({ room: initialRoom });

      if (get().room?.gameSettings?.mode === GameModes.SINGLE_PLAYER) {
        return;
      }

      socket.emit('exitRoom', get().room?.roomId!, (res) => {
        if (res.success === false) {
          set({ error: res.error, loading: null });
        }
      });
    },

    updateRoom: async (room) => {
      set({ room });
    },

    gameStatusUpdate: async (roomId, status) => {
      socket.emit('gameStatusUpdate', roomId, status, (res) => {
        if (res.success === false) {
          set({ loading: null, error: res.error });
        }
      });
    },

    userProgressUpdate: async (roomId, socketId, progress) => {
      socket.emit('userProgressUpdate', roomId, socketId, progress, (res) => {
        if (res.success === false) {
          set({ loading: null, error: res.error });
        }
      });
    },

    resetProgress: () => {
      set({
        typed: '',
        userProgress: {
          wpm: 0,
          accuracy: 0,
          correctWordsArray: [],
          incorrectWordsArray: [],
        },
      });
    },

    startGame: async () => {
      const difficulty = get().room?.gameSettings?.difficulty!;
      const duration = get().room?.gameSettings?.duration!;
      const mode = get().room?.gameSettings?.mode;

      if (mode === GameModes.SINGLE_PLAYER) {
        set({
          loading: 'Starting the game! Please Wait....',
        });
      }

      const paragraph = await fetchParagraphForGame(difficulty, duration);

      if (mode === GameModes.WITH_FRIENDS) {
        socket.emit('startGame', get().room?.roomId!, paragraph!, (res) => {
          if (res.success === false) {
            set({ loading: null, error: res.error });
          }
        });
      } else {
        let room = get().room!;
        room.paragraph = paragraph;
        room.status = RoomStatus.PLAYING;
        room.timer = getDuration(duration);

        set({ room, loading: null });

        const timer = (seconds: number, cb: (remaningTime: number) => void) => {
          setTimeout(function () {
            cb(seconds);
            if (seconds > 0) {
              timer(seconds - 1, cb);
            }
          }, 1000);
        };

        var callback = function (remaningTime: number) {
          set({ room: { ...get().room!, timer: remaningTime } });
          if (remaningTime === 0) {
            set({
              room: { ...get().room!, status: RoomStatus.FINISHED },
              typed: '',
            });
          }
        };

        timer(getDuration(duration), callback);
      }
    },

    resetRoom: () => {
      set({ room: initialRoom });
    },

    setTyped: (typed) => {
      set({ typed });
      const progress = calculateWordsPerMinute(
        get().room!.paragraph!,
        typed,
        getDuration(get().room!.gameSettings!.duration) / 60
      );

      set({ userProgress: progress });

      if (
        !get().room?.gameSettings?.mode ||
        get().room?.gameSettings?.mode === GameModes.SINGLE_PLAYER
      )
        return;
      get().userProgressUpdate(get().room!.roomId!, socket.id, progress);
    },

    setMode: (mode) => {
      const room = get().room!;
      room.gameSettings.mode = mode;
      set({ room });
    },

    setDuration: (duration) => {
      const room = get().room!;
      room.gameSettings.duration = duration;
      set({ room });
    },

    setDificulty: (difficulty) => {
      const room = get().room!;
      room.gameSettings.difficulty = difficulty;
      set({ room });
    },
  }))
);

export default useGameStore;
