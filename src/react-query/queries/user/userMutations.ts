import { useMutation } from '@tanstack/react-query';
import { UserQueryFunctions } from './_userQueryFunctions';
import { userFactory } from '../queryFactory';
import { queryClient } from '../../queryClient';
import { User } from './../../../core/domain/entities/User';

export const useCreateProfileMutation = () => {
  return useMutation({ mutationFn: UserQueryFunctions.createProfile });
};

export const useUploadPictureMutation = () => {
  return useMutation({ mutationFn: UserQueryFunctions.uploadPicture });
};

export const useGeneratePictureUrlMutation = () => {
  return useMutation({ mutationFn: UserQueryFunctions.generatePictureUrl });
};

export const useValidateUploadPictureMutation = () => {
  return useMutation({ mutationFn: UserQueryFunctions.validateUploadPicture });
};

export const useBlockUserMutation = () => {
  return useMutation({
    mutationFn: UserQueryFunctions.blockUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['searchByUsername'] }),
  });
};

export const useDeleteAccountMutation = () => {
  return useMutation({ mutationFn: UserQueryFunctions.deleteAccount });
};

export const useChangePasswordMutation = () => {
  return useMutation({ mutationFn: UserQueryFunctions.changePassword });
};

export const useChangeProfilePictureMutation = () => {
  const { mutateAsync: uploadPictureMutation } = useUploadPictureMutation();
  const { mutateAsync: validateUploadMutation } =
    useValidateUploadPictureMutation();

  const userQueryKey = userFactory.getMe().queryKey;

  const updater = (
    previousUser: User | undefined,
    profilePicturePath: string,
  ) => {
    if (!previousUser) return;

    const newUser: User = {
      ...previousUser,
      profilePicture: profilePicturePath,
    };
    return newUser;
  };

  return useMutation({
    mutationFn: async (photoPath: string) => {
      const replacedPhotoPath = photoPath.replace('file://', '');

      const { url, filePath } = await UserQueryFunctions.generatePictureUrl();
      await uploadPictureMutation({ url: url, photoPath: replacedPhotoPath });
      await validateUploadMutation({ filePath: filePath });
    },
    onMutate: async (variable) => {
      await queryClient.cancelQueries({ queryKey: userQueryKey });
      const snapshot = queryClient.getQueryData(userQueryKey);

      queryClient.setQueryData(userQueryKey, updater(snapshot, variable));

      return () => queryClient.setQueryData(userQueryKey, snapshot);
    },
    onError: (_, __, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: userQueryKey });
    },
  });
};

export const useChangeUsernameMutation = () => {
  const userQueryKey = userFactory.getMe().queryKey;

  const updater = (previousUser: User | undefined, username: string) => {
    if (!previousUser) return;

    const newUser: User = { ...previousUser, username };
    return newUser;
  };

  return useMutation({
    mutationFn: UserQueryFunctions.changeUsername,
    onMutate: async ({ username }) => {
      await queryClient.cancelQueries({ queryKey: userQueryKey });
      const snapshot = queryClient.getQueryData(userQueryKey);

      queryClient.setQueryData(userQueryKey, updater(snapshot, username));

      return () => queryClient.setQueryData(userQueryKey, snapshot);
    },
    onError: (_, __, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: userQueryKey });
    },
  });
};
