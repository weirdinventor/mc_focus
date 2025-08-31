import { CONSTANTS } from '../config/Configuration';
import { OtherUser } from '../core/domain/entities/OtherUser';
import {
  useCreateConversationMutation,
  useSendMessageMutation,
} from '../react-query/queries/chat/chatMutations';
import { useGetMeQuery } from '../react-query/queries/user/userQueries';
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
const app = getApps().length === 0
  ? initializeApp({
      databaseURL: CONSTANTS.FB_REALTIME_URL,
      // add other firebase config values here if needed
    })
  : getApps()[0];
const database = getDatabase(app);
import { Message, Section, transformData } from '../utils/transformChatData';
import { useEffect, useMemo, useState } from 'react';

export const useChat = (
  participant?: OtherUser,
  conversationId?: string,
  isGroup: boolean = false,
) => {
  const [messages, setMessages] = useState<Section[]>([]);
  const [convId, setConvId] = useState(conversationId);

  const { data: me } = useGetMeQuery();

  const { mutate: createUserConv } = useCreateConversationMutation();
  const { mutate: sendMessage } = useSendMessageMutation(isGroup);

  const refName = `${isGroup ? 'conversationGroups' : 'conversations'}/${convId}/messages`;
  const messagesRef = useMemo(
    () => ref(database, refName),
    [convId, refName],
  );

  useEffect(() => {
    const handleNewMessages = (snapshot: any) => {
      const data: Record<string, Message> | null = snapshot.val();
      if (data && me) {
        const transformedData = transformData(data, me, participant);
        setMessages(transformedData);
      }
    };

    const unsubscribe = onValue(messagesRef, handleNewMessages);

    return () => off(messagesRef, "value", handleNewMessages);
  }, [messagesRef]);

  const onSendMessageHandler = async (text: string) => {
    if (!convId && participant) {
      createUserConv(
        { participant: participant.id },
        {
          onSuccess: (data) => {
            setConvId(data.conversation.id);
            sendMessage({
              text,
              type: ['text'],
              conversation: data.conversation.id,
            });
          },
        },
      );

      return;
    }

    if (convId) {
      sendMessage({ text, type: ['text'], conversation: convId });
      return;
    }
  };

  return { onSendMessageHandler, messages };
};
