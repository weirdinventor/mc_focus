import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { AuthRepo } from './../../../core/domain/repositories/AuthRepo';
import { UseCase } from './../../../core/usecases/Usecase';

export interface BuySubscriptionCommand {
  os: string;
  receiptId?: string;
  subscriptionId: string;
}

type Response = ErrorOr<void>;

export class BuySubscription
  implements UseCase<BuySubscriptionCommand, Promise<Response>>
{
  constructor(private authRepo: AuthRepo) {}
  public async execute(req: BuySubscriptionCommand): Promise<Response> {
    try {
      const result = await this.authRepo.buySubscription(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('BuySubscription', error);
    }
  }
}
