import { useMutation } from '@tanstack/react-query';
import { FeedQueryFunctions } from './_feedQueryFunctions';
import { queryClient } from './../../queryClient';
import { feedFactory } from '../queryFactory';

export const useLikePostMutation = () => {
  return useMutation({
    mutationFn: FeedQueryFunctions.likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedFactory.getFeedPosts({}).queryKey,
      });
    },
  });
};
