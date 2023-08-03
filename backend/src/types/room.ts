import { GameDifficulties, GameDuration, GameModes } from './game'
import { User } from './user'

export interface GameSettings {
  mode: GameModes
  difficulty: GameDifficulties
  duration: GameDuration
}

export enum RoomStatus {
  WAITING,
  PLAYING,
  FINISHED
}

export interface Progress {
  wpm: number
  accuracy: number
  correctWordsArray: string[]
  incorrectWordsArray: string[]
}

export interface Room {
  roomId: string
  owner: User
  users: User[]
  usersProgress: {
    key: string
    value: Progress
  }[]
  gameSettings: GameSettings
  status: RoomStatus
  createdAt: Date
  paragraph: string
  timer: number
}
