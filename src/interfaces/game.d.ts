import { User } from './user';

export enum GameStatus {
  WAITING,
  PLAYING,
  FINISHED,
}

export enum GameModes {
  SINGLE_PLAYER,
  ONLINE,
  WITH_FRIENDS,
}

export enum GameDifficulties {
  EASY,
  MEDIUM,
  HARD,
}

export enum GameDuration {
  ONE_MIN = 60,
  THREE_MIN = 180,
  FIVE_MIN = 300,
}

export interface Progress {
  wpm: number;
  accuracy: number;
}
