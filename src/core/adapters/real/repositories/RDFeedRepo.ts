import { Category } from './../../../../core/domain/entities/Category';
import { FeedPosts } from './../../../../core/domain/entities/FeedPosts';
import { Live } from './../../../../core/domain/entities/Live';
import { Record } from './../../../../core/domain/entities/Record';
import { Resource } from './../../../../core/domain/entities/Resource';
import { FeedRepo } from './../../../../core/domain/repositories/FeedRepo';
import { GetFeedPostsCommand } from './../../../../core/usecases/feedRepo/GetFeedPosts';
import { GetRecordsCommand } from './../../../../core/usecases/feedRepo/GetRecords';
import { GetResourcesByGroupIdCommand } from './../../../../core/usecases/feedRepo/GetResourcesByGroupId';
import { GetTimeframeLivesCommand } from './../../../../core/usecases/feedRepo/GetTimeframeLives';
import { LikePostCommand } from './../../../../core/usecases/feedRepo/LikePost';
import { AxiosInstance } from 'axios';

export class RDFeedRepo implements FeedRepo {
  constructor(private httpClient: AxiosInstance) {}

  async getFeedPosts(req: GetFeedPostsCommand) {
    const { page, categoryId } = req;

    const result: FeedPosts = await this.httpClient.get(
      `api/feed/posts?page=${page}${categoryId ? `&categoryId=${categoryId}` : ''}`,
    );
    return result;
  }

  async getTimeframeLives(req: GetTimeframeLivesCommand) {
    const { timeframe, groupId } = req;

    const result: Live[] = await this.httpClient.get('api/live/filter', {
      params: { timeframe, groupId },
    });
    return result;
  }

  async getCategories() {
    const result: Category[] = await this.httpClient.get(
      'api/admin/live/category',
    );
    return result;
  }

  async getResourcesByGroupId(req: GetResourcesByGroupIdCommand) {
    const { groupId } = req;
    const result: Resource[] = await this.httpClient.get(
      `api/resources/${groupId}`,
    );
    return result;
  }

  async getRecords(req: GetRecordsCommand) {
    const { recordType, groupId } = req;
    const result: Record[] = await this.httpClient.get(
      `api/record/${recordType}`,
      { params: { groupId } },
    );
    return result;
  }

  async likePost(req: LikePostCommand) {
    const { postId, emoji } = req;
    const result: FeedPosts = await this.httpClient.post(
      `api/feed/${postId}/react`,
      { emoji },
    );
    return result;
  }
}
