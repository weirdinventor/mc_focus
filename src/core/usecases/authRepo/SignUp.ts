import { FirebaseToken } from './../../../core/domain/entities/FirebaseToken';
import { Token } from './../../../core/domain/entities/Token';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { AuthRepo } from './../../../core/domain/repositories/AuthRepo';
import { UseCase } from './../../../core/usecases/Usecase';

export interface SignUpCommand {
  email: string;
  password: string;
}

type Response = ErrorOr<Token & FirebaseToken>;

export class SignUp implements UseCase<SignUpCommand, Promise<Response>> {
  constructor(private authRepo: AuthRepo) {}

  public async execute(request: SignUpCommand): Promise<Response> {
    try {
      const lowercasedEmail = request.email.toLowerCase();

      const result = await this.authRepo.signUp({
        ...request,
        email: lowercasedEmail,
      });

      return Result.ok(result);
    } catch (error) {
      return Result.fail('SignUp', error);
    }
  }
}
