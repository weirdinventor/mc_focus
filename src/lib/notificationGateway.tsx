import { CONSTANTS } from '../config/Configuration';
import { OtherUser } from '../core/domain/entities/OtherUser';
import { chatFactory } from './../react-query/queries/queryFactory';
import { queryClient } from './../react-query/queryClient';

enum NotificationTypesEnum {
  NEW_MESSAGE = 'NewMessage',
}

export type NotificationDataType =
  | {
      type: NotificationTypesEnum;
      [key: string]: string | object;
    }
  | undefined;

export const notificationGateway = (
  data: NotificationDataType,
): string | null => {
  const notificationType = data?.type;

  switch (notificationType) {
    case NotificationTypesEnum.NEW_MESSAGE:
      const messagesListQueryKey = chatFactory.getUserConversations().queryKey;
      const participant: OtherUser = JSON.parse(data?.participant as string);
      const conversationId = data?.conversationId;

      queryClient.invalidateQueries({ queryKey: messagesListQueryKey });

      return `${CONSTANTS.DEEPLINK_PREFIX}chat/${participant}/${conversationId}/${participant.username}`;

    default:
      console.warn('Unhandled notification type', notificationType);
      return null;
  }
};
