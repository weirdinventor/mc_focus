import { Gender } from './../../../core/domain/entities/Gender';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<void>;

export interface CreateProfileCommand {
  firstname: string;
  lastname: string;
  username: string;
  gender: Gender;
}

export class CreateProfile
  implements UseCase<CreateProfileCommand, Promise<Response>>
{
  constructor(private userRepo: UserRepo) {}
  public async execute(req: CreateProfileCommand): Promise<Response> {
    try {
      const result = await this.userRepo.createProfile(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('CreateProfile', error);
    }
  }
}
