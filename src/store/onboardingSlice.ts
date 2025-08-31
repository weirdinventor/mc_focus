import { SocialProviders } from '../core/domain/entities/Providers';
import { ResetPasswordCommand } from '../core/usecases/authRepo/ResetPassword';
import { SignUpCommand } from '../core/usecases/authRepo/SignUp';
import { CreateProfileCommand } from '../core/usecases/userRepo/CreateProfile';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OnboardingState {
  singupInfo: SignUpCommand;
  profileInfo: CreateProfileCommand;
  photoPath: string;
  providerIdToken: string | null;
  provider?: SocialProviders;
  resetPasswordInfo?: Omit<Partial<ResetPasswordCommand>, 'password'>;
}

const initialState: OnboardingState = {
  singupInfo: {
    email: '',
    password: '',
  },
  profileInfo: {
    firstname: '',
    lastname: '',
    username: '',
    gender: 'unknown',
  },
  photoPath: '',
  providerIdToken: null,
  provider: undefined,
  //TEMP: TILL FLOW CHANGED
  resetPasswordInfo: undefined,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setSignupInfo: (
      state,
      { payload }: PayloadAction<Partial<SignUpCommand>>,
    ) => {
      state.singupInfo = { ...state.singupInfo, ...payload };
    },
    setProfileInfo: (
      state,
      { payload }: PayloadAction<Partial<CreateProfileCommand>>,
    ) => {
      state.profileInfo = { ...state.profileInfo, ...payload };
    },
    setPhotoPath: (state, { payload }: PayloadAction<string>) => {
      state.photoPath = payload;
    },
    setProviderInfo: (
      state,
      {
        payload,
      }: PayloadAction<{ idToken: string | null; provider: SocialProviders }>,
    ) => {
      state.providerIdToken = payload.idToken;
      state.provider = payload.provider;
    },
    //TEMP----
    setResetPasswordInfo: (
      state,
      {
        payload,
      }: PayloadAction<Omit<Partial<ResetPasswordCommand>, 'password'>>,
    ) => {
      state.resetPasswordInfo = { ...state.resetPasswordInfo, ...payload };
    },
    ///////
    clearProviderInfo: (state) => {
      state.providerIdToken = initialState.providerIdToken;
      state.provider = initialState.provider;
    },
  },
});

export const OnboardingActions = onboardingSlice.actions;
