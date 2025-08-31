import { GetFeedPostsCommand } from './../../../core/usecases/feedRepo/GetFeedPosts';
import { FeedPosts } from '../entities/FeedPosts';
import { GetTimeframeLivesCommand } from './../../../core/usecases/feedRepo/GetTimeframeLives';
import { Live } from '../entities/Live';
import { Category } from '../entities/Category';
import { GetResourcesByGroupIdCommand } from './../../../core/usecases/feedRepo/GetResourcesByGroupId';
import { Resource } from '../entities/Resource';
import { GetRecordsCommand } from './../../../core/usecases/feedRepo/GetRecords';
import { Record } from '../entities/Record';
import { LikePostCommand } from './../../../core/usecases/feedRepo/LikePost';

export interface FeedRepo {
  getFeedPosts(req: GetFeedPostsCommand): Promise<FeedPosts>;
  getTimeframeLives(req: GetTimeframeLivesCommand): Promise<Live[]>;
  getCategories(): Promise<Category[]>;
  getResourcesByGroupId(req: GetResourcesByGroupIdCommand): Promise<Resource[]>;
  getRecords(req: GetRecordsCommand): Promise<Record[]>;
  likePost(req: LikePostCommand): Promise<FeedPosts>;
}
