import { Module } from './../../../core/domain/entities/Module';
import { ErrorOr, Result } from './../../../core/domain/models/ResultHandling';
import { ModulesRepo } from './../../../core/domain/repositories/ModulesRepo';
import { UseCase } from './../../../core/usecases/Usecase';

type Response = ErrorOr<Module>;

export interface GetModuleByIdCommand {
  id: string;
}

export class GetModuleById
  implements UseCase<GetModuleByIdCommand, Promise<Response>>
{
  constructor(private modulesRepo: ModulesRepo) {}
  public async execute(req: GetModuleByIdCommand): Promise<Response> {
    try {
      const result = await this.modulesRepo.getModuleById(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetModuleById', error);
    }
  }
}
