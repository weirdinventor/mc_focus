import { SendMessageMediaType } from './../../../core/domain/entities/MediaType';
import { MessageType } from './../../../core/domain/entities/MessageType';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { ChatRepo } from './../../../core/domain/repositories/ChatRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<void>;

export interface SendMessageCommand {
  text?: string;
  media?: { url: string; type: SendMessageMediaType }[];
  audio?: string;
  type: MessageType[];
  conversation: string;
}

export class SendMessage
  implements UseCase<SendMessageCommand, Promise<Response>>
{
  constructor(private chatRepo: ChatRepo) {}
  public async execute(req: SendMessageCommand): Promise<Response> {
    try {
      const result = await this.chatRepo.sendMessage(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('SendMessage', error);
    }
  }
}
