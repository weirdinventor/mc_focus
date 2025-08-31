import { Gender } from './Gender';

export interface User {
  id: string;
  username: string;
  status: 'active' | 'inactive';
  role: 1 | 2 | 3;
  profilePicture: string | null;
  gender: Gender;
  firstName: string;
  lastName: string;
  isSubscribed?: boolean;
  createdAt: string;
  email: string;
  badges: Badeges[];
}

export interface Badeges {
  id: string;
  name: string;
  description: string;
  pictureUrl: string;
  earnedTimestamp: string;
}
