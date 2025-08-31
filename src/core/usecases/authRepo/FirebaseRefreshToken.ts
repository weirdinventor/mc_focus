import { Token } from './../../../core/domain/entities/Token';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { AuthRepo } from './../../../core/domain/repositories/AuthRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Token>;

export class FirebaseRefreshToken implements UseCase<void, Promise<Response>> {
  constructor(private authRepo: AuthRepo) {}
  public async execute(): Promise<Response> {
    try {
      const result = await this.authRepo.firebaseRefreshToken();
      return Result.ok(result);
    } catch (error) {
      return Result.fail('FirebaseRefreshToken', error);
    }
  }
}
