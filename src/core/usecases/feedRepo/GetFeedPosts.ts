import { FeedPosts } from './../../../core/domain/entities/FeedPosts';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { FeedRepo } from './../../../core/domain/repositories/FeedRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<FeedPosts>;

export interface GetFeedPostsCommand {
  page?: number;
  categoryId?: string;
}

export class GetFeedPosts
  implements UseCase<GetFeedPostsCommand, Promise<Response>>
{
  constructor(private feedRepo: FeedRepo) {}
  public async execute(req: GetFeedPostsCommand): Promise<Response> {
    try {
      const result = await this.feedRepo.getFeedPosts(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetFeedPosts', error);
    }
  }
}
