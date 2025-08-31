import { OtherUser } from './../../../core/domain/entities/OtherUser';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<OtherUser[]>;

export interface SearchUserByUsernameCommand {
  username: string;
}

export class SearchUserByUsername
  implements UseCase<SearchUserByUsernameCommand, Promise<Response>>
{
  constructor(private userRepo: UserRepo) {}

  public async execute(req: SearchUserByUsernameCommand): Promise<Response> {
    try {
      const result = await this.userRepo.searchUserByUsername(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('SearchUserByUsername', error);
    }
  }
}
