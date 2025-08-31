import { FirebaseMessage } from '../core/domain/entities/FirebaseMessage';
import { OtherUser } from '../core/domain/entities/OtherUser';
import { User } from '../core/domain/entities/User';
import { formatISO, fromUnixTime } from 'date-fns';
import { dayString } from './dayString'; // Assuming this helper is also platform-agnostic

export interface Message {
  timestamp: number;
  senderId: string;
  message: FirebaseMessage;
}

export interface TransformedMessage {
  uid: string;
  senderId: string;
  username: string;
  createdAt?: string;
  text?: string;
  profilePicture?: string | null;
}

export interface Section {
  title: string;
  data: TransformedMessage[];
}

export const transformData = (
  messages: Record<string, Message>,
  me: User,
  participant?: OtherUser,
): Section[] => {
  const messagesArray = Object.keys(messages).map((key) => ({
    uid: key,
    ...messages[key],
  }));

  // Sort messages with the most recent appearing first
  messagesArray.sort((a, b) => b.timestamp - a.timestamp);

  // Group sorted messages into sections by date
  return messagesArray.reduce<Section[]>((acc, el) => {
    const formattedDate = dayString(el.timestamp);
    const section = acc.find((c) => c.title === formattedDate);

    const username =
      (el.message?.username ||
        (el.senderId === me.id ? me.username : participant?.username)) ??
      '';

    const profilePicture =
      (el.message.profilePicture ||
        (el.senderId === me.id
          ? me.profilePicture
          : participant?.profilePicture)) ??
      '';

    const timeFromUnix = el.message.userCreatedAt
      ? fromUnixTime(el.message.userCreatedAt / 1000)
      : 0;

    const messageData: TransformedMessage = {
      uid: el.uid,
      senderId: el.senderId,
      username,
      createdAt: formatISO(timeFromUnix),
      text: el.message.text,
      profilePicture,
    };

    // Add the message to an existing section or create a new one
    if (section) {
      section.data.push(messageData);
    } else {
      acc.push({ title: formattedDate, data: [messageData] });
    }

    return acc;
  }, []);
};