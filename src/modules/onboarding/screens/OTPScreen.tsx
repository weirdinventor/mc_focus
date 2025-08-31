import React, { useState } from 'react';
import { useAppDispatch } from './../../../store/index';
import { OnboardingActions } from './../../../store/onboardingSlice';
import { OnboardingWrapper } from '../components/OnboardingWrapper';
import { useNavigate } from 'react-router-dom';
import { ForgotPassStackRoutes, OnboardingStackRoutes, RootStackRoutes } from '../../../navigators/routes';

export const OTPScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState('');

  const onContinuePress = () => {
    dispatch(OnboardingActions.setResetPasswordInfo({ recoveryCode: otpCode }));
    setOtpCode('');
    navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.FORGOT_PASS_STACK}/${ForgotPassStackRoutes.FORGOT_NEW_PASS}`)
  };

  const onResendPress = () => {
    // Ici, ajoute la logique pour renvoyer le code OTP
    window.alert('OTP resent!');
  };

  return (
    <OnboardingWrapper step={2} maxSteps={3} onContinue={onContinuePress}>
      <div style={{ marginBottom: '16px' , marginTop: '16px'}} className='input-wrapper'>
        <input
          type="text"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          placeholder="Enter OTP"
          style={{ padding: '8px', width: '100%', textAlign: 'center', letterSpacing: '4px' , color: 'grey'}}
        />
      </div>

      <button
        onClick={onResendPress}
        style={{
          marginTop: '12px',
          padding: '8px 16px',
          backgroundColor: '#ddd',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Resend Code
      </button>
    </OnboardingWrapper>
  );
};
