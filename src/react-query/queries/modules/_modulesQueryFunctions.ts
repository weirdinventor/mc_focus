import { core } from './../../../config/Configuration';
import { GetModuleByIdCommand } from './../../../core/usecases/modulesRepo/GetModuleById';
import { GetModuleCommand } from './../../../core/usecases/modulesRepo/GetModules';
import { defaultQueryResult } from './../../queryHelpers';

const getModules = async (req: GetModuleCommand) => {
  const result = await core.getModules.execute(req);
  return defaultQueryResult(result);
};

const getModuleById = async (req: GetModuleByIdCommand) => {
  const result = await core.getModuleById.execute(req);
  return defaultQueryResult(result);
};

export const ModulesQueryFunctions = {
  getModules,
  getModuleById,
};
