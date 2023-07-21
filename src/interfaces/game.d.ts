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

export interface Player extends User {
  wpm: number;
  accuracy: number;
}
