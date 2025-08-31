import { Conversation } from './../../../core/domain/entities/Conversation';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { ChatRepo } from './../../../core/domain/repositories/ChatRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<{ conversation: Conversation }>;

export interface CreateConversationCommand {
  participant: string;
}

export class CreateConversation
  implements UseCase<CreateConversationCommand, Promise<Response>>
{
  constructor(private chatRepo: ChatRepo) {}
  public async execute(req: CreateConversationCommand): Promise<Response> {
    try {
      const result = await this.chatRepo.createConversation(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('CreateConversation', error);
    }
  }
}
