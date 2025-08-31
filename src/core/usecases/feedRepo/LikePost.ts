import { FeedPosts } from './../../../core/domain/entities/FeedPosts';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { FeedRepo } from './../../../core/domain/repositories/FeedRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<FeedPosts>;

export interface LikePostCommand {
  postId: string;
  emoji: string;
}

export class LikePost implements UseCase<LikePostCommand, Promise<Response>> {
  constructor(private feedRepo: FeedRepo) {}
  public async execute(req: LikePostCommand): Promise<Response> {
    try {
      const result = await this.feedRepo.likePost(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('LikePost Fail', error);
    }
  }
}
