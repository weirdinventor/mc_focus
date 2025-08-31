import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { FeedPosts } from './../../../core/domain/entities/FeedPosts';
import { GetTimeframeLivesCommand } from './../../../core/usecases/feedRepo/GetTimeframeLives';
import { feedFactory } from '../queryFactory';
import { useGetMeQuery } from '../user/userQueries';
import { GetResourcesByGroupIdCommand } from './../../../core/usecases/feedRepo/GetResourcesByGroupId';
import { GetRecordsCommand } from './../../../core/usecases/feedRepo/GetRecords';
import { GetFeedPostsCommand } from './../../../core/usecases/feedRepo/GetFeedPosts';

export const useGetFeedPostsQuery = (req: GetFeedPostsCommand) => {
  const transformGetFeedPosts = (data: InfiniteData<FeedPosts, number>) => {
    if (data) {
      return data.pages.flatMap((page) => page.posts);
    }
  };

  return useInfiniteQuery({
    ...feedFactory.getFeedPosts(req),
    select: transformGetFeedPosts,
  });
};

export const useGetTimeframeLivesQuery = (req: GetTimeframeLivesCommand) => {
  return useQuery({
    ...feedFactory.getTimeframeLives(req),
    initialData: [],
  });
};

export const useGetCategoriesQuery = () => {
  return useQuery({
    ...feedFactory.getCategories(),
    staleTime: Infinity,
    select: (data) => [{ id: null, name: 'Tout' }, ...data],
  });
};

export const useGetSingleOngoingLiveQuery = () => {
  const { data: me } = useGetMeQuery();

  return useQuery({
    ...feedFactory.getTimeframeLives({ timeframe: 'ongoing' }),
    select: (data) =>
      data?.find((el) => (me?.isSubscribed ? el : el.accessLevel === 'free')) ??
      undefined,
  });
};

export const useGetModuleOngoingLiveQuery = (groupId: string) => {
  return useQuery({
    ...feedFactory.getTimeframeLives({ timeframe: 'ongoing', groupId }),
    initialData: [],
  });
};

export const useGetResourcesByGroupIdQuery = (
  req: GetResourcesByGroupIdCommand,
) => {
  return useQuery({
    ...feedFactory.getResourcesByGroupId(req),
    select: (data) => data.map((el) => ({ ...el, categoryId: el.category.id })),
    initialData: [],
  });
};

export const useGetRecordsQuery = (req: GetRecordsCommand) => {
  return useQuery({
    ...feedFactory.getRecords(req),
    select: (data) => data.map((el) => ({ ...el, categoryId: el.category.id })),
    initialData: [],
  });
};
