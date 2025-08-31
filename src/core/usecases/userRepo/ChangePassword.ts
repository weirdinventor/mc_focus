import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<void>;

export interface ChangePasswordCommand {
  previousPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export class ChangePassword
  implements UseCase<ChangePasswordCommand, Promise<Response>>
{
  constructor(private userRepo: UserRepo) {}
  public async execute(req: ChangePasswordCommand): Promise<Response> {
    try {
      const result = await this.userRepo.changePassword(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('ChangePassword', error);
    }
  }
}
