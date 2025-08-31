import { Record } from './../../../core/domain/entities/Record';
import { RecordType } from './../../../core/domain/entities/RecordType';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { FeedRepo } from './../../../core/domain/repositories/FeedRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Record[]>;

export interface GetRecordsCommand {
  recordType: RecordType;
  groupId?: string;
}

export class GetRecords
  implements UseCase<GetRecordsCommand, Promise<Response>>
{
  constructor(private feedRepo: FeedRepo) {}
  public async execute(req: GetRecordsCommand): Promise<Response> {
    try {
      const result = await this.feedRepo.getRecords(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetRecords', error);
    }
  }
}
