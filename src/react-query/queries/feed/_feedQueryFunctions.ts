import { core } from './../../../config/Configuration';
import { GetFeedPostsCommand } from './../../../core/usecases/feedRepo/GetFeedPosts';
import { LikePostCommand } from './../../../core/usecases/feedRepo/LikePost';
import { defaultQueryResult } from '../../queryHelpers';

const getFeedPosts = async (req: GetFeedPostsCommand) => {
  const result = await core.getFeedPosts.execute(req);
  return defaultQueryResult(result);
};
const likePost = async (req: LikePostCommand) => {
  const result = await core.likePost.execute(req);

  return defaultQueryResult(result);
};
export const FeedQueryFunctions = {
  getFeedPosts,
  likePost,
};
