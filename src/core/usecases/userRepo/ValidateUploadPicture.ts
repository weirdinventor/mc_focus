import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<void>;

export interface ValidateUploadPictureCommand {
  filePath: string;
}

export class ValidateUploadPicture
  implements UseCase<ValidateUploadPictureCommand, Promise<Response>>
{
  constructor(private userRepo: UserRepo) {}

  public async execute(req: ValidateUploadPictureCommand): Promise<Response> {
    try {
      const result = await this.userRepo.validateUploadPicture(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('ValidateUploadPicture', error);
    }
  }
}
