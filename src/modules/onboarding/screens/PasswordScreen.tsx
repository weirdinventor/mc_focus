import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from './../../../store/index';
import { OnboardingActions } from './../../../store/onboardingSlice';
import { PasswordScheme, passwordScheme } from './../../../schemes/password.scheme';
import { PassStats } from '../PassStats';
import { OnboardingWrapper } from '../components/OnboardingWrapper';
import { useNavigate } from 'react-router-dom';
import { OnboardingStackRoutes, RootStackRoutes } from '../../../navigators/routes';

export const PasswordScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [error, setError] = useState(false);

  const {  watch, register } = useForm<PasswordScheme>({
    defaultValues: { password: '' },
    resolver: zodResolver(passwordScheme),
  });

  const password = watch('password');

  const onContinueHandler = (password: string) => {
    if (isPasswordValid) {
      dispatch(OnboardingActions.setSignupInfo({ password }));
      navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.USER_INFO_SCREEN}`);
    } else {
      setError(true);
    }
  };

  return (
    <OnboardingWrapper
      step={2}
      onContinue={() => onContinueHandler(password)}
    >
      <div style={{ marginBottom: '16px', marginTop: '16px' }} className='bg-black/5 rounded-full'>
        <input
          type="password"
          className='w-3xl rounded-full'
          placeholder="Enter your password"
          {...register('password')}
          style={{ padding: '12px 24px', width: '600px' , color: 'grey', borderRadius: "999px"}}
        />
      </div>

      <PassStats
        newPassword={password}
        onValidChange={setIsPasswordValid}
        isError={error}
      />
    </OnboardingWrapper>
  );
};
