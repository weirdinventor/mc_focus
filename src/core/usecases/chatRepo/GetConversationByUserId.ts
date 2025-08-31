import { Conversation } from './../../../core/domain/entities/Conversation';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { ChatRepo } from './../../../core/domain/repositories/ChatRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Omit<Conversation, 'startedBy'>>;

export interface GetConversationByUserIdCommand {
  id?: string;
}

export class GetConversationByUserId
  implements UseCase<GetConversationByUserIdCommand, Promise<Response>>
{
  constructor(private chatRepo: ChatRepo) {}
  public async execute(req: GetConversationByUserIdCommand): Promise<Response> {
    try {
      const result = await this.chatRepo.getConversationByUserId(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetConversationByUserId', error);
    }
  }
}
