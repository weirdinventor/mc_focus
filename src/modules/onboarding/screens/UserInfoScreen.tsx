import React from 'react';
import { useForm, useController, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Colors } from './../../../constants/Colors';
import { OnboardingWrapper } from '../components/OnboardingWrapper'; // Assuming this is a shared component
import { UserInfoScheme, userInfoScheme } from './../../../schemes/userInfo.scheme';
import { OnboardingStackRoutes, RootStackRoutes } from './../../../navigators/routes';
import { useAppDispatch } from './../../../store/index';
import { OnboardingActions } from './../../../store/onboardingSlice';

// --- New Import for Web Conversion ---
import { useNavigate } from 'react-router-dom';

// Input styles matching EmailTextInput
const inputStyles = `
  .input-wrapper { 
    display: flex; 
    align-items: center; 
    background-color: rgba(0, 0, 0, 0.05); 
    border: 1px solid transparent; 
    border-radius: 9999px; 
    padding: 16px; 
    height: 56px; 
    transition: border-color 0.2s, box-shadow 0.2s; 
    margin-bottom: 1rem;
    position: relative;
    width: 100%;
  }
  .input-wrapper.focused { 
    border-color: ${Colors.seance400}; 
    box-shadow: 0 0 0 2px rgba(106, 90, 205, 0.2); 
  }
  .input-wrapper .accessory { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }
  .input-wrapper .left-accessory { 
    margin-right: 12px; 
  }
  .input-wrapper .right-accessory { 
    margin-left: 12px; 
  }
  .input-field { 
    flex: 1; 
    height: 100%; 
    border: none; 
    background: transparent; 
    font-size: 16px; 
    outline: none; 
    padding: 0; 
  }
  .error { 
    color: red; 
    font-size: 12px; 
    margin-top: 4px; 
    position: absolute;
    bottom: -20px;
    left: 16px;
  }
`;

// Styled ControlledInput component matching EmailScreen
const ControlledInput = ({
  control,
  name,
  placeholderText,
  error,
  LeftAccessory,
}: {
  control: Control<UserInfoScheme>;
  name: keyof UserInfoScheme;
  placeholderText: string;
  error?: string;
  LeftAccessory?: React.ComponentType<{ isFocused: boolean }>;
}) => {
  const { field } = useController({ name, control });
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <>
      <style>{inputStyles}</style>
      <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
        {LeftAccessory && (
          <div className="accessory left-accessory">
            <LeftAccessory isFocused={isFocused} />
          </div>
        )}
        <input
          {...field}
          placeholder={placeholderText}
          type="text"
          className="input-field"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

// --- Main Screen Component ---
export const UserInfoScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { 
    control, 
    handleSubmit,
    formState: { errors }
  } = useForm<UserInfoScheme>({
    defaultValues: { firstname: '', lastname: '' },
    resolver: zodResolver(userInfoScheme),
  });

  const onContinueHandler = ({ firstname, lastname }: UserInfoScheme) => {
    dispatch(OnboardingActions.setProfileInfo({ firstname, lastname }));
    navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.USERNAME_SCREEN}`);
  };

  return (
    <OnboardingWrapper step={3} onContinue={handleSubmit(onContinueHandler)}>
      <div className="space-y-4 w-3xl">
        <ControlledInput
          placeholderText="Prénom"
          control={control}
          name="firstname"
          error={errors.firstname?.message}
          LeftAccessory={({ isFocused }) => (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isFocused ? Colors.seance400 : Colors.grey6,
                fontSize: 20,
              }}
            >
              👤
            </span>
          )}
        />
        
        <ControlledInput
          placeholderText="Nom de famille"
          control={control}
          name="lastname"
          error={errors.lastname?.message}
          LeftAccessory={({ isFocused }) => (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isFocused ? Colors.seance400 : Colors.grey6,
                fontSize: 20,
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