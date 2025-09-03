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
      <div className="space-y-4 w-3xl">
        <ControlledInput
          placeholderText="Nom d'utilisateur"
          control={control}
          name="username"
          error={errors.username?.message}
          LeftAccessory={({ isFocused }) => (
            <AiOutlineStar 
              size={20} 
              color={isFocused ? Colors.seance400 : Colors.grey6}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }} 
            />
          )}
        />
        
        {errorMessage && (
          <div className="text-red-600 text-sm font-semibold text-center">
            {errorMessage}
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <div className="text-pink-700 text-sm font-semibold text-center">
              Suggestions de noms d'utilisateur :
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((el, index) => (
                <SuggestionChip
                  key={index}
                  text={el}
                  onClick={() => {
                    setValue('username', el);
                    clearErrors();
                    setErrorMessage('');
                    setSuggestions([]);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </OnboardingWrapper>
  );
};