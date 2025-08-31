import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { UserRepo } from './../../../core/domain/repositories/UserRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<void>;

export interface BlockUserCommand {
  otherUserId: string;
}

export class BlockUser implements UseCase<BlockUserCommand, Promise<Response>> {
  constructor(private userRepo: UserRepo) {}

  public async execute(req: BlockUserCommand): Promise<Response> {
    try {
      const result = await this.userRepo.blockUser(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('BlockUser', error);
    }
  }
}
