import { ConversationsList } from './../../../core/domain/entities/ConversationsList';
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { chatFactory } from '../queryFactory';
import { compareDesc, parseISO } from 'date-fns';
import { GetDiscussionByIdCommand } from './../../../core/usecases/chatRepo/GetDiscussionById';
import { queryClient } from '../../queryClient';
import { GetConversationByUserIdCommand } from './../../../core/usecases/chatRepo/GetConversationByUserId';

export const useGetUserConversationsQuery = (searchValue: string) => {
  const transformGetUserConversations = (
    data: InfiniteData<ConversationsList, number>,
  ) => {
    if (data) {
      const flattenedMap = data.pages.flatMap((page) => page.conversations);
      const filteredArrayBySearch = flattenedMap.filter(
        (el) => el.participant.username.includes(searchValue) && !el.isBlocked,
      );
      const sortedArray = filteredArrayBySearch.sort((a, b) =>
        compareDesc(parseISO(a.updatedAt), parseISO(b.updatedAt)),
      );

      return sortedArray;
    } else return [];
  };

  return useInfiniteQuery({
    ...chatFactory.getUserConversations(),
    select: transformGetUserConversations,
  });
};

export const useGetDiscussionsQuery = () => {
  return useQuery({
    ...chatFactory.getDiscussions(),
    initialData: [],
  });
};

export const useGetDiscussionByIdQuery = (req: GetDiscussionByIdCommand) => {
  const userQueryKey = chatFactory.getDiscussions().queryKey;

  return useQuery({
    ...chatFactory.getDiscussionById(req),
    placeholderData: () => {
      return queryClient
        .getQueryData(userQueryKey)
        ?.find((discusussion) => discusussion.id === req.id);
    },
  });
};

export const useGetConversationByUserIdQuery = (
  req: GetConversationByUserIdCommand,
) => {
  return useQuery({
    ...chatFactory.getConversationByUserId(req),
  });
};
