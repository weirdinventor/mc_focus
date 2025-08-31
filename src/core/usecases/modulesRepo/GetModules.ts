import { Module } from './../../../core/domain/entities/Module';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { ModulesRepo } from './../../../core/domain/repositories/ModulesRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Module[]>;
export interface GetModuleCommand {
  paid?: boolean;
}

export class GetModules
  implements UseCase<GetModuleCommand, Promise<Response>>
{
  constructor(private modulesRepo: ModulesRepo) {}
  public async execute(req: GetModuleCommand): Promise<Response> {
    try {
      const result = await this.modulesRepo.getModules(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetModules', error);
    }
  }
}
