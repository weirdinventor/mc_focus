import { GetModuleByIdCommand } from './../../../core/usecases/modulesRepo/GetModuleById';
import { useQuery } from '@tanstack/react-query';
import { modulesFactory } from '../queryFactory';
import { queryClient } from './../../queryClient';
import { GetModuleCommand } from './../../../core/usecases/modulesRepo/GetModules';

export const useGetAllModulesQuery = (req: GetModuleCommand) => {
  return useQuery({
    ...modulesFactory.getModules(req),
    select: (data) => data.filter((el) => !el.owned),
    initialData: [],
  });
};

export const useGetMyModulesQuery = () => {
  return useQuery({
    ...modulesFactory.getModules(),
    select: (data) => data.filter((el) => el.owned),
    initialData: [],
  });
};

export const useGetModuleByIdQuery = (req: GetModuleByIdCommand) => {
  const modulesQueryKey = modulesFactory.getModules().queryKey;

  return useQuery({
    ...modulesFactory.getModuleById(req),
    placeholderData: () => {
      return queryClient
        .getQueryData(modulesQueryKey)
        ?.find((el) => el.id === req.id);
    },
  });
};
