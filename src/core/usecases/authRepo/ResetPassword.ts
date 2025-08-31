import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { AuthRepo } from './../../../core/domain/repositories/AuthRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<void>;

export interface ResetPasswordCommand {
  email: string;
  recoveryCode: string;
  password: string;
}

export class ResetPassword
  implements UseCase<ResetPasswordCommand, Promise<Response>>
{
  constructor(private authRepo: AuthRepo) {}
  public async execute(req: ResetPasswordCommand): Promise<Response> {
    try {
      const result = await this.authRepo.resetPassword(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('ResetPassword', error);
    }
  }
}
