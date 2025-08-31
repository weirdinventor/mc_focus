import { Discussion } from './../../../core/domain/entities/Discussion';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { ChatRepo } from './../../../core/domain/repositories/ChatRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Discussion>;

export interface GetDiscussionByIdCommand {
  id: string;
}

export class GetDiscussionById
  implements UseCase<GetDiscussionByIdCommand, Promise<Response>>
{
  constructor(private chatRepo: ChatRepo) {}
  public async execute(req: GetDiscussionByIdCommand): Promise<Response> {
    try {
      const result = await this.chatRepo.getDiscussionById(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetDiscussionById', error);
    }
  }
}
