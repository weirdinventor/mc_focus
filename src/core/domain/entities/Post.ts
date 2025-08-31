import { MediaType } from './MediaType';
import { User } from './User';

export interface Post {
  id: string;
  text: string;
  mediaUrl: string | null;
  thumbnail?: string | null;
  mediaType: MediaType;
  createdAt: string;
  updatedAt: string;
  author: User;
  reactions: Reaction[];
}

export interface Reaction {
  id: string;
  emoji: string;
  userId: string;
}
