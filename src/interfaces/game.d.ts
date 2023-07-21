import { User } from './user';

export enum GameStatus {
  WAITING,
  PLAYING,
  FINISHED,
}

export interface Player extends User {
  wpm: number;
  accuracy: number;
}
