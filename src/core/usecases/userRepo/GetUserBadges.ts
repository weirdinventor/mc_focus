import { Badge } from './../../../core/domain/entities/Badge';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Badge[]>;

export interface GetUserBadgesCommand {
  userId: string;
}

export class GetUserBadges
  implements UseCase<GetUserBadgesCommand, Promise<Response>>
{
  constructor(private userRepo: UserRepo) {}

  public async execute(req: GetUserBadgesCommand): Promise<Response> {
    try {
      const result = await this.userRepo.getUserBadges(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('getUserBadge failed', error);
    }
  }
}
