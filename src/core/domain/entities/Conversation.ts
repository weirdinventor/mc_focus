import { FirebaseMessage } from './FirebaseMessage';
import { OtherUser } from './OtherUser';

export interface Conversation {
  id: string;
  startedBy: OtherUser;
  participant: OtherUser;
  latestMessage: FirebaseMessage | null;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}
