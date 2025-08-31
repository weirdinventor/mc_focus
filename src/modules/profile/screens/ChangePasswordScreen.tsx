// --- React & Library Imports ---
import { zodResolver } from '@hookform/resolvers/zod';
import React, { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for web navigation

// --- Custom Component Imports (ensure these are web-compatible) ---
import { CButton } from './../../../components/Buttons/CButton';
import { SmallHeader } from './../../../components/Headers/SmallHeader';
import { PassTextInput } from './../../../components/PassTextInput';
import { Wrapper } from './../../../components/Wrapper';

// --- Internationalization, Queries & Schemes ---
import { t } from '../../../i18n/i18n';
import { useChangePasswordMutation } from './../../../react-query/queries/user/userMutations';
import {
  ChangeKnownPasswordScheme,
  changeKnownPasswordScheme,
} from './../../../../src/schemes/password.scheme';

// --- Component Definition ---
export const ChangePasswordScreen = (): JSX.Element => {
  const navigate = useNavigate(); // Hook for web navigation
  const { mutate } = useChangePasswordMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty, isValid },
  } = useForm<ChangeKnownPasswordScheme>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(changeKnownPasswordScheme),
  });

  const onPressHandler = (formData: ChangeKnownPasswordScheme) => {
    mutate(
      {
        previousPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      },
      {
        onSuccess: () => navigate(-1), // Use navigate(-1) to go back
        onError: () => setError('currentPassword', {}),
      },
    );
  };

  return (
    // Assuming <Wrapper> is a web-compatible component (e.g., a div)
    <Wrapper noHorizontalPadding withoutTopEdge>
      {/* Assuming <SmallHeader> is a web-compatible component (e.g., an h2 or header tag) */}
      <SmallHeader withSearch={false} title={t('profile.changePassword')} />
      
      {/* Replaced React Native's <View> with <div> */}
      <div style={styles.container}>
        {/* Assuming <PassTextInput> is a web-compatible component (e.g., a custom input) */}
        <PassTextInput
          control={control}
          name="currentPassword"
          placeHolder="profile.currentPassword"
        />
        <div style={styles.newPassWrapper}>
          <PassTextInput
            control={control}
            name="newPassword"
            placeHolder="profile.newPassword"
          />
          <PassTextInput
            control={control}
            name="confirmPassword"
            placeHolder="profile.confirmPassword"
          />
        </div>
      </div>
      
      {/* Assuming <CButton> is a web-compatible button, using onClick */}
      <CButton
        onClick={handleSubmit(onPressHandler)}
        style={styles.buttonWrapper}
        text="profile.saveModifications"
        buttonType="colored"
        disabled={!isValid || !isDirty}
      />
    </Wrapper>
  );
};

// --- Styles (as a standard JavaScript object for inline styling) ---
const styles = {
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 32,
    gap: 20,
    paddingTop: 0,
  },
  newPassWrapper: {
    gap: 6,
  },
  buttonWrapper: {
    paddingLeft: 16,
    paddingRight: 16,
  },
};