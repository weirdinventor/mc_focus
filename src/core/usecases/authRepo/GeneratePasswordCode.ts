import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { AuthRepo } from './../../../core/domain/repositories/AuthRepo';
import { UseCase } from './../../../core/usecases/Usecase';

export interface GeneratePasswordCodeCommand {
  email: string;
}

type Response = ErrorOr<void>;

export class GeneratePasswordCode
  implements UseCase<GeneratePasswordCodeCommand, Promise<Response>>
{
  constructor(private authRepo: AuthRepo) {}
  public async execute(
    request: GeneratePasswordCodeCommand,
  ): Promise<Response> {
    try {
      const result = await this.authRepo.generatePasswordCode(request);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GeneratePasswordCode', error);
    }
  }
}
