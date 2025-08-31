import { useQuery } from '@tanstack/react-query';
import { userFactory } from '../queryFactory';
import { GetUserBadgesCommand } from './../../../core/usecases/userRepo/GetUserBadges';

export const useGetMeQuery = (enabled = true) => {
  return useQuery({
    ...userFactory.getMe(),
    enabled,
    staleTime: Infinity,
  });
};

export const useSearchUserByUsernameQuery = (username: string) => {
  return useQuery({
    ...userFactory.searchUserByUsername({ username }),
    enabled: !!username,
    staleTime: 10 * 1000,
  });
};
export const useGetUserBadgesQuery = (
  req: GetUserBadgesCommand,
  enabled = true,
) => {
  return useQuery({
    ...userFactory.getUserBadges(req),
    enabled,
    initialData: [],
  });
};
