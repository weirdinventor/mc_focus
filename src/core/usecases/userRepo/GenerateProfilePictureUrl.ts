import { GeneratedUrl } from './../../../core/domain/entities/GeneratedUrl';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<GeneratedUrl>;

export class GenerateProfilePictureUrl
  implements UseCase<void, Promise<Response>>
{
  constructor(private userRepo: UserRepo) {}

  public async execute(): Promise<Response> {
    try {
      const result = await this.userRepo.generateProfilePictureUrl();
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GenerateProfilePictureUrl', error);
    }
  }
}
