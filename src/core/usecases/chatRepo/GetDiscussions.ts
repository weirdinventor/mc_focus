import { Discussion } from './../../../core/domain/entities/Discussion';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { ChatRepo } from './../../../core/domain/repositories/ChatRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Discussion[]>;

export class GetDiscussions implements UseCase<void, Promise<Response>> {
  constructor(private chatRepo: ChatRepo) {}
  public async execute(): Promise<Response> {
    try {
      const result = await this.chatRepo.getDiscussions();
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetDiscussions', error);
    }
  }
}
