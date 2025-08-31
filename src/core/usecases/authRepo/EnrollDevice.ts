import { OS } from './../../../core/domain/entities/OS';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { AuthRepo } from './../../../core/domain/repositories/AuthRepo';
import { UseCase } from './../../../core/usecases/Usecase';

export interface EnrollDeviceCommand {
  registrationToken: string;
  os: OS;
}

type Response = ErrorOr<void>;

export class EnrollDevice
  implements UseCase<EnrollDeviceCommand, Promise<Response>>
{
  constructor(private authRepo: AuthRepo) {}

  public async execute(request: EnrollDeviceCommand): Promise<Response> {
    try {
      const result = await this.authRepo.enrollDevice(request);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('EnrollDevice', error);
    }
  }
}
