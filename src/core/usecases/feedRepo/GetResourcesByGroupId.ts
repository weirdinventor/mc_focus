import { Resource } from './../../../core/domain/entities/Resource';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { FeedRepo } from './../../../core/domain/repositories/FeedRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Resource[]>;

export interface GetResourcesByGroupIdCommand {
  groupId: string;
}

export class GetResourcesByGroupId
  implements UseCase<GetResourcesByGroupIdCommand, Promise<Response>>
{
  constructor(private feedRepo: FeedRepo) {}
  public async execute(req: GetResourcesByGroupIdCommand): Promise<Response> {
    try {
      const result = await this.feedRepo.getResourcesByGroupId(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetResourcesByGroupId', error);
    }
  }
}
