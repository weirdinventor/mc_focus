import { FirebaseToken } from './../../../core/domain/entities/FirebaseToken';
import { ProviderTokenCommand } from './../../../core/domain/entities/ProviderTokenCommand';
import { Token } from './../../../core/domain/entities/Token';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { AuthRepo } from './../../../core/domain/repositories/AuthRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Token & FirebaseToken>;

export class GoogleSignup
  implements UseCase<ProviderTokenCommand, Promise<Response>>
{
  constructor(private authRepo: AuthRepo) {}
  public async execute(request: ProviderTokenCommand): Promise<Response> {
    try {
      const result = await this.authRepo.googleSignup(request);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GoogleSignup', error);
    }
  }
}
