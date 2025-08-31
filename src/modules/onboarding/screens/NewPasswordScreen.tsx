import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ChangePasswordScheme, changePasswordScheme } from './../../../schemes/password.scheme';
import { useResetPasswordMutation } from './../../../react-query/queries/auth/authMutations';
import { useAppSelector } from './../../../store/index';
import { useNavigate } from 'react-router-dom'; // pour navigation web
import { OnboardingWrapper } from '../components/OnboardingWrapper';
import { OnboardingStackRoutes, RootStackRoutes } from '../../../navigators/routes';

type NewPasswordFormProps = Record<string, never>;

export const NewPasswordScreen: React.FC<NewPasswordFormProps> = () => {
  const { resetPasswordInfo } = useAppSelector((state) => state.onboarding);
  const { mutate } = useResetPasswordMutation();
  const navigate = useNavigate();

  const {  handleSubmit, register } = useForm<ChangePasswordScheme>({
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onContinuePress = ({ newPassword }: ChangePasswordScheme) => {
    newPasswordRef.current?.blur();
    confirmPasswordRef.current?.blur();
    //TODO : SHOULD HANDLE PASSWORD CORRECTLY
    if (resetPasswordInfo?.email && resetPasswordInfo.recoveryCode) {
      mutate(
        {
          email: resetPasswordInfo.email,
          recoveryCode: resetPasswordInfo.recoveryCode,
          password: "123456789@c",
        },
        {
          onSuccess: () => navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.LOGIN_SCREEN}`),
          onError: (error) => console.log(error),
        },
      );
    }
  };

  return (
    <OnboardingWrapper step={3} maxSteps={3} onContinue={handleSubmit(onContinuePress)}>
      <div style={{ marginBottom: '16px' , marginTop: '16px'}}>
        <div className='input-wrapper'>
          <input
            type="password"
            placeholder="New password"
            {...register('newPassword')}
            ref={newPasswordRef}
            style={{ padding: '8px', width: '100%', color: 'grey' }}
          />
        </div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <div className='input-wrapper'>
          <input
            type="password"
            placeholder="Confirm password"
            {...register('confirmPassword')}
            ref={confirmPasswordRef}
            style={{ padding: '8px', width: '100%', color: 'grey' }}
          />
        </div>
      </div>
    </OnboardingWrapper>
  );
};
