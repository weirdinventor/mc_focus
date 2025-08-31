import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { StreamRepo } from './../../../core/domain/repositories/StreamRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<void>;

export interface InterestToLiveCommand {
  liveId: string;
}

export class InterestToLive
  implements UseCase<InterestToLiveCommand, Promise<Response>>
{
  constructor(private streamRepo: StreamRepo) {}
  public async execute(req: InterestToLiveCommand): Promise<Response> {
    try {
      const result = await this.streamRepo.interestToLive(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('InterestToLive', error);
    }
  }
}
