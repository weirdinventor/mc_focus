import { ConversationsList } from './../../../core/domain/entities/ConversationsList';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { ChatRepo } from './../../../core/domain/repositories/ChatRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<ConversationsList>;

export interface GetUserConversationsCommand {
  page: number;
}

export class GetUserConversations
  implements UseCase<GetUserConversationsCommand, Promise<Response>>
{
  constructor(private chatRepo: ChatRepo) {}
  public async execute(req: GetUserConversationsCommand): Promise<Response> {
    try {
      const result = await this.chatRepo.getUserConversations(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetUserConversations', error);
    }
  }
}
