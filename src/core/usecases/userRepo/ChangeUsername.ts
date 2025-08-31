import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<void>;

export interface ChangeUsernameCommand {
  username: string;
}

export class ChangeUsername
  implements UseCase<ChangeUsernameCommand, Promise<Response>>
{
  constructor(private userRepo: UserRepo) {}
  public async execute(req: ChangeUsernameCommand): Promise<Response> {
    try {
      const result = await this.userRepo.changeUsername(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('ChangeUsername', error);
    }
  }
}
