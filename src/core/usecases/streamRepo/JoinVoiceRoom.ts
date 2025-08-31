import { LiveRoom } from './../../../core/domain/entities/LiveRoom';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { StreamRepo } from './../../../core/domain/repositories/StreamRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<LiveRoom>;

export interface JoinVoiceRoomCommand {
  groupId: string;
}

export class JoinVoiceRoom
  implements UseCase<JoinVoiceRoomCommand, Promise<Response>>
{
  constructor(private streamRepo: StreamRepo) {}
  public async execute(req: JoinVoiceRoomCommand): Promise<Response> {
    try {
      const result = await this.streamRepo.joinVoiceRoom(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('JoinVoiceRoom', error);
    }
  }
}
