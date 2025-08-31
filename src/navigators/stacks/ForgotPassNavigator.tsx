import { ForgotPassEmailScreen } from '../../modules/onboarding/screens/ForgotPassEmailScreen';
import { NewPasswordScreen } from '../../modules/onboarding/screens/NewPasswordScreen';
import { OTPScreen } from '../../modules/onboarding/screens/OTPScreen';
import { OnboardingHeader } from '../../modules/onboarding/components/OnboardingHeader';
import { ForgotPassStackRoutes } from '../routes';
import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

const ForgotPassLayout: React.FC = () => (
  <div>
    <OnboardingHeader />
    <main>
      <Outlet />
    </main>
  </div>
);

export function ForgotPassNavigator() {
  return (
    <Routes>
      <Route element={<ForgotPassLayout />}>
        <Route
          path={ForgotPassStackRoutes.FORGOT_PASS_EMAIL}
          element={<ForgotPassEmailScreen />}
        />
        <Route
          path={ForgotPassStackRoutes.FORGOT_OTP_CHECK}
          element={<OTPScreen />}
        />
        <Route
          path={ForgotPassStackRoutes.FORGOT_NEW_PASS}
          element={<NewPasswordScreen />}
        />
      </Route>
      {/* --- Default Route --- */}
      <Route
        index
        element={<Navigate to={ForgotPassStackRoutes.FORGOT_PASS_EMAIL} replace />}
      />
    </Routes>
  );
}