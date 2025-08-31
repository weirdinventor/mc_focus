import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledInput } from './../../../components/ControlledInput'; // Assuming this is a shared component
import { Colors } from './../../../constants/Colors';
import { OnboardingWrapper } from '../components/OnboardingWrapper'; // Assuming this is a shared component
import { UserInfoScheme, userInfoScheme } from './../../../schemes/userInfo.scheme';
import { OnboardingStackRoutes, RootStackRoutes } from './../../../navigators/routes';
import { useAppDispatch } from './../../../store/index';
import { OnboardingActions } from './../../../store/onboardingSlice';

// --- New Import for Web Conversion ---
import { useNavigate } from 'react-router-dom';


// --- Main Screen Component ---
// No longer accepts props
export const UserInfoScreen: React.FC = () => {
  // Get the navigate function from the hook
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<UserInfoScheme>({
    defaultValues: { firstname: '', lastname: '' },
    resolver: zodResolver(userInfoScheme),
  });

  const onContinueHandler = ({ firstname, lastname }: UserInfoScheme) => {
    dispatch(OnboardingActions.setProfileInfo({ firstname, lastname }));
    // Use the navigate function from the hook
    navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.USERNAME_SCREEN}`);
  };

  return (
    <OnboardingWrapper step={3} onContinue={handleSubmit(onContinueHandler)}>
      <div className={`input-wrapper`}>
        <ControlledInput
          placeholderText="onboarding.userInfos.firstNamePlaceholder"
          style={{ color: 'grey' }}
          control={control}
          name="firstname"
          LeftAccessory={({ state }) => (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
                color: state === 'focused' ? Colors.seance400 : Colors.grey6,
                fontSize: 24,
              }}
            >
              👤
            </span>
          )}
        />
      </div>
      <div className={`input-wrapper`}>
        <ControlledInput
          placeholderText="onboarding.userInfos.lastNamePlaceholder"
          style={{ color: 'grey',width:'100%' }}
          control={control}
          name="lastname"
          LeftAccessory={({ state }) => (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
                color: state === 'focused' ? Colors.seance400 : Colors.grey6,
                fontSize: 24,
              }}
            >
              👤
            </span>
          )}
        />
      </div>
    </OnboardingWrapper>
  );
};