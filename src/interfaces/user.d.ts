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
  uid?: string;
  photoURL: string;
  stats: {
    averageWpm: number;
    races: number;
  };
}
