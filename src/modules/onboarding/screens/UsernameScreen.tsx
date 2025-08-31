import React, { useState } from 'react';
import { CText } from './../../../components/CText';
import { ControlledInput } from './../../../components/ControlledInput';
import { SuggestionChip } from './../../../components/SuggestionChip';
import { Colors } from './../../../constants/Colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingStackRoutes, RootStackRoutes } from './../../../navigators/routes';
import { useCheckUsernameMutation } from './../../../react-query/queries/auth/authMutations';
import { useAppDispatch } from './../../../store/index';
import { OnboardingActions } from './../../../store/onboardingSlice';
import { useForm } from 'react-hook-form';
import { UsernameScheme, usernameScheme } from './../../../schemes/username.scheme';
import { OnboardingWrapper } from '../components/OnboardingWrapper';
import { AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const UsernameScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mutate: checkUsername, isPending } = useCheckUsernameMutation();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { control, handleSubmit, setError, setValue, clearErrors } =
    useForm<UsernameScheme>({
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
          // In web, navigate using your router, e.g., react-router
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
      <div className={`input-wrapper`}>
        <ControlledInput
          placeholderText="onboarding.userInfos.usernamePlaceholder"
          style={{ color: 'grey', width: '100%' }}
          control={control}
          name="username"
          LeftAccessory={() => (
            <AiOutlineStar size={24} color={Colors.seance400} style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
              fontSize: 24,
            }} />
          )}
        />
      </div>
      {errorMessage && (
        <CText size="md_bold" color="deepRed">
          {errorMessage}
        </CText>
      )}

      {suggestions.length > 0 && (
        <>
          <CText
            size="md_bold"
            text="onboarding.userInfos.suggestions"
            color="pink700"
          />
          <div style={styles.suggestionsWrapper}>
            {suggestions.map((el, index) => (
              <SuggestionChip
                key={index}
                text={el}
                onClick={() => {
                  setValue('username', el);
                  clearErrors();
                  setErrorMessage('');
                }}
              />
            ))}
          </div>
        </>
      )}
    </OnboardingWrapper>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  suggestionsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
};
