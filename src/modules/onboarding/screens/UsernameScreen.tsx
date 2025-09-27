import React, { useState } from 'react';
import { useForm, useController, Control } from 'react-hook-form';
import { CText } from './../../../components/CText';
import { SuggestionChip } from './../../../components/SuggestionChip';
import { Colors } from './../../../constants/Colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingStackRoutes, RootStackRoutes } from './../../../navigators/routes';
import { useCheckUsernameMutation } from './../../../react-query/queries/auth/authMutations';
import { useAppDispatch } from './../../../store/index';
import { OnboardingActions } from './../../../store/onboardingSlice';
import { UsernameScheme, usernameScheme } from './../../../schemes/username.scheme';
import { OnboardingWrapper } from '../components/OnboardingWrapper';
import { AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

// Enhanced input styles with responsive sizing
const inputStyles = `
  .input-wrapper { 
    display: flex; 
    align-items: center; 
    background-color: rgba(0, 0, 0, 0.05); 
    border: 1px solid transparent; 
    border-radius: 9999px; 
    padding: 16px 20px; 
    height: 56px; 
    transition: border-color 0.2s, box-shadow 0.2s; 
    margin-bottom: 1rem;
    position: relative;
    width: 100%;
  }
  
  /* Responsive sizing for larger screens */
  @media (min-width: 768px) {
    .input-wrapper {
      height: 68px;
      padding: 20px 28px;
      margin-bottom: 1.5rem;
    }
  }
  
  @media (min-width: 1024px) {
    .input-wrapper {
      height: 76px;
      padding: 24px 32px;
      margin-bottom: 2rem;
    }
  }
  
  @media (min-width: 1280px) {
    .input-wrapper {
      height: 84px;
      padding: 28px 36px;
    }
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
  
  @media (min-width: 768px) {
    .input-wrapper .left-accessory { 
      margin-right: 16px; 
    }
  }
  
  @media (min-width: 1024px) {
    .input-wrapper .left-accessory { 
      margin-right: 20px; 
    }
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
    font-weight: 500;
  }
  
  /* Responsive font sizing */
  @media (min-width: 768px) {
    .input-field {
      font-size: 18px;
    }
  }
  
  @media (min-width: 1024px) {
    .input-field {
      font-size: 20px;
    }
  }
  
  @media (min-width: 1280px) {
    .input-field {
      font-size: 22px;
    }
  }
  
  .error { 
    color: red; 
    font-size: 12px; 
    margin-top: 4px; 
    position: absolute;
    bottom: -20px;
    left: 16px;
    font-weight: 500;
  }
  
  @media (min-width: 768px) {
    .error {
      font-size: 14px;
      bottom: -24px;
      left: 28px;
    }
  }
  
  @media (min-width: 1024px) {
    .error {
      font-size: 16px;
      bottom: -28px;
      left: 32px;
    }
  }
`;

// Enhanced ControlledInput component with responsive icon sizing
const ControlledInput = ({
  control,
  name,
  placeholderText,
  error,
  LeftAccessory,
}: {
  control: Control<UsernameScheme>;
  name: keyof UsernameScheme;
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

export const UsernameScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mutate: checkUsername, isPending } = useCheckUsernameMutation();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { 
    control, 
    handleSubmit, 
    setError, 
    setValue, 
    clearErrors,
    formState: { errors }
  } = useForm<UsernameScheme>({
    defaultValues: { username: '' },
    resolver: zodResolver(usernameScheme),
  });

  const onContinueHandler = ({ username }: UsernameScheme) => {
    if (isPending) return;

    setErrorMessage('');
    setSuggestions([]);

    checkUsername(
      { username: username.trim() },
      {
        onSuccess: (data) => {
          if (data.isTaken) {
            setError('username', {
              type: 'manual',
              message: "Ce nom d'utilisateur est déjà pris",
            });
            setSuggestions(data.suggestions);
            return;
          }
          dispatch(OnboardingActions.setProfileInfo({ username }));
          navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.GENDER_SCREEN}`);
        },
        onError: () => {
          setErrorMessage('Serveur indisponible. Mode hors ligne activé.');
        },
      },
    );
  };

  return (
    <OnboardingWrapper
      step={3}
      onContinue={handleSubmit(onContinueHandler)}
      disabled={isPending}
    >
      {/* Enhanced container with better spacing and responsive padding */}
      <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
        
      

        {/* Input section with enhanced spacing */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          <ControlledInput
            placeholderText="Nom d'utilisateur"
            control={control}
            name="username"
            error={errors.username?.message}
            LeftAccessory={({ isFocused }) => (
              <AiOutlineStar 
                size={window.innerWidth >= 1280 ? 28 : window.innerWidth >= 1024 ? 24 : window.innerWidth >= 768 ? 22 : 20} 
                color={isFocused ? Colors.seance400 : Colors.grey6}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }} 
              />
            )}
          />
        </div>
        
        {/* Enhanced error message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 md:p-6 lg:p-8">
            <div className="text-red-600 text-sm md:text-base lg:text-lg font-semibold text-center">
              {errorMessage}
            </div>
          </div>
        )}

        {/* Enhanced suggestions section */}
        {suggestions.length > 0 && (
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 md:p-6 lg:p-8">
              <div className="text-pink-700 text-sm md:text-base lg:text-lg font-semibold text-center mb-4 md:mb-6">
                Suggestions de noms d'utilisateur :
              </div>
              <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-5 justify-center">
                {suggestions.map((el, index) => (
                  <div
                    key={index}
                    className="transform transition-all duration-200 hover:scale-105"
                  >
                    <SuggestionChip
                      text={el}
                      onClick={() => {
                        setValue('username', el);
                        clearErrors();
                        setErrorMessage('');
                        setSuggestions([]);
                      }}
                      className="text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


      </div>
    </OnboardingWrapper>
  );
};