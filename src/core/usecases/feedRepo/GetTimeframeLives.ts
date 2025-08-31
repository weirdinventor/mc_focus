import { Live } from './../../../core/domain/entities/Live';
import { LiveTimeframe } from './../../../core/domain/entities/LiveTimeframe';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { FeedRepo } from './../../../core/domain/repositories/FeedRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Live[]>;

export interface GetTimeframeLivesCommand {
  timeframe: LiveTimeframe;
  groupId?: string;
}

export class GetTimeframeLives
  implements UseCase<GetTimeframeLivesCommand, Promise<Response>>
{
  constructor(private feedRepo: FeedRepo) {}
  public async execute(req: GetTimeframeLivesCommand): Promise<Response> {
    try {
      const result = await this.feedRepo.getTimeframeLives(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetTimeframeLives', error);
    }
  }
}
