import { GetModuleByIdCommand } from './../../../core/usecases/modulesRepo/GetModuleById';
import { Module } from '../entities/Module';
import { GetModuleCommand } from './../../../core/usecases/modulesRepo/GetModules';

export interface ModulesRepo {
  getModules(req: GetModuleCommand): Promise<Module[]>;
  getModuleById(req: GetModuleByIdCommand): Promise<Module>;
}
