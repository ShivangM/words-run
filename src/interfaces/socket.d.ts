import { GameSettings, Progress, Room } from './room';
import { User } from './user';

interface ServerToClientEvents {
  roomCreated: (room: Room) => void;
  roomError: (error: string) => void;
  updateRoom: (room: Room) => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface Response<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

interface ClientToServerEvents {
  createRoom: (
    user: User,
    settings: GameSettings,
    callback: (res: Response<Room>) => void
  ) => void;

  joinRoom: (
    roomId: string,
    user: User,
    callback: (res: Response<Room>) => void
  ) => void;

  startGame: (
    roomId: string,
    paragraph: string,
    callback: (res: Response<Room>) => void
  ) => void;

  gameStatusUpdate: (
    roomId: string,
    status: RoomStatus,
    callback: (res: Response<Room>) => void
  ) => void;

  userProgressUpdate: (
    roomId: string,
    socketId: string,
    progress: Progress,
    callback: (res: Response<Room>) => void
  ) => void;

  exitRoom: (roomId: string, callback: (res: Response) => void) => void;
}
