import { useAuth } from './../../../hooks/useAuth'; // Assumed to be platform-agnostic
import { useAppSelector } from '../../../store/index'; // Platform-agnostic (Redux)
import { useMutation } from '@tanstack/react-query'; // Platform-agnostic
import {
  useCreateProfileMutation,
  useGeneratePictureUrlMutation,
  useUploadPictureMutation,
  useValidateUploadPictureMutation,
} from '../user/userMutations'; // Platform-agnostic hooks
import { AuthQueryFunctions } from './_authQueryFunctions'; // Platform-agnostic API calls
import { isHttpUrl } from '../../../utils/isHttpUrl'; // Platform-agnostic utility
import { BuySubscriptionCommand } from '../../../core/usecases/authRepo/BuySubscription'; // Type definition

// No changes needed.
export const useLoginWithEmailMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: AuthQueryFunctions.loginWithEmail,
    onSuccess: ({ token, firebaseToken }) => login(firebaseToken, token),
  });
};

// No changes needed. The logic is sound for web, assuming the underlying
// `uploadPictureMutation` can handle a web `File` object instead of a native path.
export const useSignUpMutation = () => {
  const { profileInfo, photoPath, singupInfo, provider, providerIdToken } =
    useAppSelector((state) => state.onboarding);
  const { signup } = useAuth();
  const { mutateAsync: createProfileMutation } = useCreateProfileMutation();
  const { mutateAsync: generateUrlMutation } = useGeneratePictureUrlMutation();
  const { mutateAsync: uploadPictureMutation } = useUploadPictureMutation();
  const { mutateAsync: validateUploadMutation } =
    useValidateUploadPictureMutation();

  const providerFuncExec = () => {
    if (provider === 'google') {
      return AuthQueryFunctions.googleSignup({ token: providerIdToken });
    }
    if (provider === 'apple') {
      return AuthQueryFunctions.appleSignup({ token: providerIdToken });
    }

    return AuthQueryFunctions.signUp(singupInfo);
  };

  return useMutation({
    mutationFn: providerFuncExec,
    onSuccess: async ({ token, firebaseToken }) => {
      signup(token, firebaseToken);
      await createProfileMutation(profileInfo);

      if (isHttpUrl(photoPath) || !photoPath) {
        return;
      }

      const data = await generateUrlMutation();

      if (data) {
        // Note: For web, photoPath should be a File object from an input,
        // and uploadPictureMutation should be adapted to handle it.
        await uploadPictureMutation({ url: data.url, photoPath });
      }

      await validateUploadMutation({ filePath: data.filePath });
      return;
    },
  });
};

// No changes needed for the following hooks as they just wrap API calls.
export const useCheckEmailMutation = () => {
  return useMutation({ mutationFn: AuthQueryFunctions.checkEmail });
};

export const useCheckUsernameMutation = () => {
  return useMutation({ mutationFn: AuthQueryFunctions.checkUsername });
};

export const useAppleSigninMutation = () => {
  return useMutation({ mutationFn: AuthQueryFunctions.appleSignin });
};

export const useGoogleSigninMutation = () => {
  return useMutation({ mutationFn: AuthQueryFunctions.googleSignin });
};

export const useGeneratePasswordCodeMutation = () => {
  return useMutation({ mutationFn: AuthQueryFunctions.generatePasswordCode });
};

export const useResetPasswordMutation = () => {
  return useMutation({ mutationFn: AuthQueryFunctions.resetPassword });
};

export const useEnrollDeviceMutation = () => {
  return useMutation({ mutationFn: AuthQueryFunctions.enrollDevice });
};

// --- THIS IS THE FIXED HOOK ---
export const useBuySubscriptionMutation = () => {
  return useMutation({
    mutationFn: (req: Omit<BuySubscriptionCommand, 'os'>) =>
      // The `PLATFORM` variable has been replaced with the string 'web'.
      AuthQueryFunctions.buySubscription({ os: 'web', ...req }),
  });
};