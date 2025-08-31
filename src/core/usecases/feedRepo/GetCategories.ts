import { Category } from './../../../core/domain/entities/Category';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { FeedRepo } from './../../../core/domain/repositories/FeedRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Category[]>;

export class GetCategories implements UseCase<void, Promise<Response>> {
  constructor(private feedRepo: FeedRepo) {}
  public async execute(): Promise<Response> {
    try {
      const result = await this.feedRepo.getCategories();
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetCategories', error);
    }
  }
}
