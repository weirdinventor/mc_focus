import { Module } from './../../../../core/domain/entities/Module';
import { ModulesRepo } from './../../../../core/domain/repositories/ModulesRepo';
import { GetModuleByIdCommand } from './../../../../core/usecases/modulesRepo/GetModuleById';
import { GetModuleCommand } from './../../../../core/usecases/modulesRepo/GetModules';
import { AxiosInstance } from 'axios';

export class RDModulesRepo implements ModulesRepo {
  constructor(private httpClient: AxiosInstance) {}

  async getModules(req: GetModuleCommand) {
    const result: Module[] = await this.httpClient.get(`api/module`, {
      params: {
        paid: req.paid,
      },
    });
    return result;
  }

  async getModuleById(req: GetModuleByIdCommand) {
    const { id } = req;

    const result: Module = await this.httpClient.get(`api/module/${id}`);
    return result;
  }
}
