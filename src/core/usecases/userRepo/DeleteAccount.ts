import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<void>;

export class DeleteAccount implements UseCase<void, Promise<Response>> {
  constructor(private userRepo: UserRepo) {}

  public async execute(): Promise<Response> {
    try {
      const result = await this.userRepo.deleteAccount();
      return Result.ok(result);
    } catch (error) {
      return Result.fail('DeleteAccount', error);
    }
  }
}
