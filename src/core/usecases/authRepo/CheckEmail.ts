import { Taken } from './../../../core/domain/entities/Taken';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { AuthRepo } from './../../../core/domain/repositories/AuthRepo';
import { UseCase } from './../../../core/usecases/Usecase';

export interface CheckEmailCommand {
  email: string;
}

type Response = ErrorOr<Taken>;

export class CheckEmail
  implements UseCase<CheckEmailCommand, Promise<Response>>
{
  constructor(private authRepo: AuthRepo) {}
  public async execute(request: CheckEmailCommand): Promise<Response> {
    try {
      const result = await this.authRepo.checkEmail(request);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('CheckEmail', error);
    }
  }
}
