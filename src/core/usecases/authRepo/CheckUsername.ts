import { UsernameValidity } from './../../../core/domain/entities/UsernameValidity';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { AuthRepo } from './../../../core/domain/repositories/AuthRepo';
import { UseCase } from './../../../core/usecases/Usecase';

export interface CheckUsernameCommand {
  username: string;
}

type Response = ErrorOr<UsernameValidity>;

export class CheckUsername
  implements UseCase<CheckUsernameCommand, Promise<Response>>
{
  constructor(private authRepo: AuthRepo) {}
  public async execute(request: CheckUsernameCommand): Promise<Response> {
    try {
      const result = await this.authRepo.checkUsername(request);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('CheckUsername', error);
    }
  }
}
