// --- Imports adaptés pour le Web ---
import { useAppDispatch } from './../store/index';
import { OnboardingActions } from './../store/onboardingSlice';
import { useAuth } from './useAuth';
import {
  useAppleSigninMutation,
  useGoogleSigninMutation,
} from './../react-query/queries/auth/authMutations';
import { useNavigate } from 'react-router-dom';
import { auth } from './../lib/firebase';
import {
  GoogleAuthProvider,
  OAuthProvider, // CHANGEMENT ICI: On importe OAuthProvider au lieu d'AppleAuthProvider
  signInWithPopup,
  signOut,
  User,
  AuthProvider, // Utile pour le typage générique
} from 'firebase/auth';
import { SocialProviders } from './../core/domain/entities/Providers';
import { OnboardingStackRoutes, RootStackRoutes } from './../navigators/routes';

interface UserRemapper {
  firstname: string;
  lastname: string;
  photo: string;
}

interface isRegistration {
  isRegistration?: boolean;
}

export const useProviderAuth = () => {
  const dispatch = useAppDispatch();
  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate: googleSigninMutation, isPending: googlePending } =
    useGoogleSigninMutation();
  const { mutate: appleSignInMutaiton, isPending: applePending } =
    useAppleSigninMutation();

  const _handleAuthPopup = async (
    provider: AuthProvider, // Typage plus générique pour accepter les deux
    providerName: SocialProviders,
    mutation: typeof googleSigninMutation,
    isRegistration?: boolean,
  ) => {
    try {
      const result = await signInWithPopup(auth, provider);
      let idToken: string | null = null;
      if (providerName === 'google') {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        idToken = credential?.idToken || null;
      } else {
        idToken = await result.user.getIdToken();
      }
      const user = result.user;

      mutation(
        { token: idToken },
        {
          onSuccess: ({ firebaseToken, token }) => {
            return login(firebaseToken, token);
          },
          onError: async () => {
            if (isRegistration) {
              return _providerRegistrationFlow(
                remapUserInfo(user),
                idToken,
                providerName,
              );
            }
            await signOut(auth);
            window.alert("Account doesn't exist");
          },
        },
      );
    } catch (error: any) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error(`[${providerName.toUpperCase()} AUTH ERROR]:`, error);
        window.alert(error.message);
      }
    }
  };

  const googleAuthHandler = async ({ isRegistration }: isRegistration) => {
    const googleProvider = new GoogleAuthProvider();
    await _handleAuthPopup(googleProvider, 'google', googleSigninMutation, isRegistration);
  };

  const appleAuthHandler = async ({ isRegistration }: isRegistration) => {
    // CHANGEMENT ICI: On instancie OAuthProvider avec l'ID spécifique d'Apple
    const appleProvider = new OAuthProvider('apple.com');
    
    // Optionnel: Vous pouvez demander des scopes supplémentaires si nécessaire
    appleProvider.addScope('email');
    appleProvider.addScope('name');

    await _handleAuthPopup(appleProvider, 'apple', appleSignInMutaiton, isRegistration);
  };

  const _providerRegistrationFlow = (
    user: UserRemapper,
    idToken: string | null,
    provider: SocialProviders,
  ) => {
    _dispatchProfileInformation(user, idToken, provider);

    if (!user.firstname || !user.lastname) {
      navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.USER_INFO_SCREEN}`);
      return;
    }

    navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.USERNAME_SCREEN}`);
  };

  const _dispatchProfileInformation = (
    user: UserRemapper,
    idToken: string | null,
    provider: SocialProviders,
  ) => {
    dispatch(
      OnboardingActions.setProfileInfo({
        firstname: user.firstname,
        lastname: user.lastname,
      }),
    );
    dispatch(OnboardingActions.setPhotoPath(user.photo));
    dispatch(OnboardingActions.setProviderInfo({ idToken, provider }));
  };

  const remapUserInfo = (user: User): UserRemapper => {
    const [firstname, ...lastnameParts] = (user.displayName || '').split(' ');
    return {
      firstname: firstname || '',
      lastname: lastnameParts.join(' ') || '',
      photo: user.photoURL || '',
    };
  };

  return { googleAuthHandler, appleAuthHandler, googlePending, applePending };
};