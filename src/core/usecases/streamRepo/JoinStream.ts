import { LiveRoom } from './../../../core/domain/entities/LiveRoom';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { StreamRepo } from './../../../core/domain/repositories/StreamRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<LiveRoom>;

export interface JoinStreamCommand {
  liveId: string;
}

export class JoinStream
  implements UseCase<JoinStreamCommand, Promise<Response>>
{
  constructor(private streamRepo: StreamRepo) {}
  public async execute(req: JoinStreamCommand): Promise<Response> {
    try {
      const result = await this.streamRepo.joinStream(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('JoinStream', error);
    }
  }
}
