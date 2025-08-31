import { User } from './../../../core/domain/entities/User';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<User>;

export class GetMe implements UseCase<void, Promise<Response>> {
  constructor(private userRepo: UserRepo) {}

  public async execute(): Promise<Response> {
    try {
      const result = await this.userRepo.getMe();
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetMe', error);
    }
  }
}
