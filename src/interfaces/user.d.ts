import { User } from 'firebase/auth';

interface ExtendedUser extends User {
  socketId: string;
  stats?: {
    averageWpm: number;
    races: number;
  };
}

interface InitialUser {
  displayName: string;
  photoURL: string;
  stats: {
    averageWpm: number;
    races: number;
  };
}
