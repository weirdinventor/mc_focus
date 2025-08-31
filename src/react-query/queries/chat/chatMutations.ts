import { useMutation } from '@tanstack/react-query';
import { ChatQueryFunctions } from './_chatQueryFunctions';
import { queryClient } from '../../queryClient';
import { chatFactory } from '../queryFactory';

export const useCreateConversationMutation = () => {
  const userConversationsQueryKey = chatFactory.getUserConversations().queryKey;

  return useMutation({
    mutationFn: ChatQueryFunctions.createConversation,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: userConversationsQueryKey,
      }),
  });
};

export const useSendMessageMutation = (isGroup: boolean) => {
  const mutationFn = isGroup
    ? ChatQueryFunctions.sendGroupMessage
    : ChatQueryFunctions.sendMessage;

  return useMutation({ mutationFn });
};
