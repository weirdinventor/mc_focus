import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { UserQueryFunctions } from './user/_userQueryFunctions';
import { FeedQueryFunctions } from './feed/_feedQueryFunctions';
import { GetTimeframeLivesCommand } from './../../core/usecases/feedRepo/GetTimeframeLives';
import { SearchUserByUsernameCommand } from './../../core/usecases/userRepo/SearchUserByUsername';
import { ChatQueryFunctions } from './chat/_chatQueryFunctions';
import { GetDiscussionByIdCommand } from './../../core/usecases/chatRepo/GetDiscussionById';
import { GetResourcesByGroupIdCommand } from './../../core/usecases/feedRepo/GetResourcesByGroupId';
import { GetConversationByUserIdCommand } from './../../core/usecases/chatRepo/GetConversationByUserId';
import { GetRecordsCommand } from './../../core/usecases/feedRepo/GetRecords';
import { GetModuleByIdCommand } from './../../core/usecases/modulesRepo/GetModuleById';
import { ModulesQueryFunctions } from './modules/_modulesQueryFunctions';
import { GetFeedPostsCommand } from './../../core/usecases/feedRepo/GetFeedPosts';
import { GetModuleCommand } from './../../core/usecases/modulesRepo/GetModules';
import { GetUserBadgesCommand } from './../../core/usecases/userRepo/GetUserBadges';

export const userFactory = {
  getMe: () =>
    queryOptions({
      queryKey: ['getMe'] as const,
      queryFn: () => UserQueryFunctions.getMe(),
    }),
  searchUserByUsername: (req: SearchUserByUsernameCommand) =>
    queryOptions({
      queryKey: ['searchByUsername', req] as const,
      queryFn: () => UserQueryFunctions.searchUserByUsername(req),
    }),
  getUserBadges: (req: GetUserBadgesCommand) =>
    queryOptions({
      queryKey: ['getUserBadges', req] as const,
      queryFn: () => UserQueryFunctions.getUserBadges(req),
    }),
};

export const feedFactory = {
  all: ['feed'] as const,
  getFeedPosts: (req: GetFeedPostsCommand) =>
    infiniteQueryOptions({
      queryKey: [...feedFactory.all, 'getFeedPosts', req] as const,
      queryFn: ({ pageParam }) =>
        FeedQueryFunctions.getFeedPosts({
          page: pageParam,
          categoryId: req.categoryId,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPageParam === lastPage?.pagination.totalPages) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    }),
  getTimeframeLives: (req: GetTimeframeLivesCommand) =>
    queryOptions({
      queryKey: [...feedFactory.all, 'getTimeframeLives', req] as const,
      queryFn: () => UserQueryFunctions.getTimeframeLives(req),
    }),
  getCategories: () =>
    queryOptions({
      queryKey: [...feedFactory.all, 'getCategories'] as const,
      queryFn: () => UserQueryFunctions.getCategories(),
    }),
  getResourcesByGroupId: (req: GetResourcesByGroupIdCommand) =>
    queryOptions({
      queryKey: [...feedFactory.all, 'getResourcesByGroupId', req] as const,
      queryFn: () => UserQueryFunctions.getResourcesByGroupId(req),
    }),
  getRecords: (req: GetRecordsCommand) =>
    queryOptions({
      queryKey: [...feedFactory.all, 'getRecords', req] as const,
      queryFn: () => UserQueryFunctions.getRecords(req),
    }),
};

export const modulesFactory = {
  all: ['modules'] as const,
  getModules: (req?: GetModuleCommand) =>
    queryOptions({
      queryKey: [...modulesFactory.all, 'getModules', req] as const,
      queryFn: () => ModulesQueryFunctions.getModules(req ?? {}),
    }),
  getModuleById: (req: GetModuleByIdCommand) =>
    queryOptions({
      queryKey: [...modulesFactory.all, 'getModuleById', req] as const,
      queryFn: () => ModulesQueryFunctions.getModuleById(req),
    }),
};

export const chatFactory = {
  all: ['chat'] as const,
  getUserConversations: () =>
    infiniteQueryOptions({
      queryKey: [...chatFactory.all, 'getUserConversations'] as const,
      queryFn: ({ pageParam }) =>
        ChatQueryFunctions.getUserConversations({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPageParam === lastPage?.pagination.totalPages) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    }),
  getDiscussions: () =>
    queryOptions({
      queryKey: [...chatFactory.all, 'getDiscussions'] as const,
      queryFn: () => UserQueryFunctions.getDiscussions(),
    }),
  getDiscussionById: (req: GetDiscussionByIdCommand) =>
    queryOptions({
      queryKey: [...chatFactory.all, 'getDiscussionById', req] as const,
      queryFn: () => UserQueryFunctions.getDiscussionById(req),
    }),
  getConversationByUserId: (req: GetConversationByUserIdCommand) =>
    queryOptions({
      queryKey: [...chatFactory.all, 'getConversationByUserId', req] as const,
      queryFn: () => UserQueryFunctions.getConversationByUserId(req),
    }),
};
