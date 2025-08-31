import { SendMessageMediaType } from './MediaType';
import { MessageType } from './MessageType';

export interface FirebaseMessage {
  text?: string;
  media?: { url: string; type: SendMessageMediaType }[];
  audio?: string;
  type: MessageType;
  username?: string;
  profilePicture?: string;
  userCreatedAt?: number;
}
