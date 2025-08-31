import { Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingStackRoutes } from '../routes';
import {  OnboardingLayout } from '../../modules/onboarding/components/OnboardingHeader';
import { ForgotPassNavigator } from './ForgotPassNavigator';
import { TutorialScreen } from '../../modules/onboarding/screens/TutorialScreen';
import { EmailScreen } from '../../modules/onboarding/screens/EmailScreen';
import { PasswordScreen } from '../../modules/onboarding/screens/PasswordScreen';
import { UserInfoScreen } from '../../modules/onboarding/screens/UserInfoScreen';
import { UsernameScreen } from '../../modules/onboarding/screens/UsernameScreen';
import { GenderScreen } from '../../modules/onboarding/screens/GenderScreen';
import { TakePhotoScreen } from '../../modules/onboarding/screens/TakePhotoScreen';
import { PhotoScreen } from '../../modules/onboarding/screens/PhotoScreen';
import { LoginScreen } from '../../modules/onboarding/screens/LoginScreen';
import { StripeSubscriptionScreen } from '../../modules/onboarding/screens/StripeSubscriptionScreen';

export function OnboardingNavigator() {
  return (
    <Routes>
      {/* --- Routes WITH a Header --- */}
      <Route element={<OnboardingLayout />}>
        <Route path={OnboardingStackRoutes.LOGIN_SCREEN} element={<LoginScreen />} />
        <Route path={OnboardingStackRoutes.EMAIL_SCREEN} element={<EmailScreen />} />
        <Route path={OnboardingStackRoutes.PASSWORD_SCREEN} element={<PasswordScreen />} />
        <Route path={OnboardingStackRoutes.USER_INFO_SCREEN} element={<UserInfoScreen />} />
        <Route path={OnboardingStackRoutes.USERNAME_SCREEN} element={<UsernameScreen />} />
        <Route path={OnboardingStackRoutes.GENDER_SCREEN} element={<GenderScreen />} />
      </Route>

      {/* --- Routes WITHOUT a Header (screens that had `headerShown: false`) --- */}
      <Route path={OnboardingStackRoutes.TUTORIAL_SCREEN} element={<TutorialScreen />} />
      <Route path={OnboardingStackRoutes.TAKE_PHOTO_SCREEN} element={<TakePhotoScreen />} />
      <Route path={OnboardingStackRoutes.PHOTO_SCREEN} element={<PhotoScreen />} />
      <Route path={OnboardingStackRoutes.SUB_SCREEN} element={<StripeSubscriptionScreen />} />

      {/* --- Nested Navigator --- */}
      {/* This route hands off control to the ForgotPassNavigator for any path matching '/forgot-password/*' */}
      <Route
        path={`${OnboardingStackRoutes.FORGOT_PASS_STACK}/*`}
        element={<ForgotPassNavigator />}
      />

      {/* --- Default Route --- */}
      <Route
        index
        element={<Navigate to={OnboardingStackRoutes.LOGIN_SCREEN} replace />}
      />
    </Routes>
  );
}