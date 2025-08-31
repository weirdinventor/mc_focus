import IA from './../../../assets/images';
import { CButton } from './../../../components/Buttons/CButton';
import { CText } from './../../../components/CText';
import { useAppDispatch } from './../../../store/index';
import { OnboardingActions } from './../../../store/onboardingSlice';
import React, { useState } from 'react';
import { ConsentText } from '../components/ConsentText';
import { PhotoBack } from '../components/PhotoBack';
import { PhotoPreview } from '../components/PhotoPreview';
import { isHttpUrl } from './../../../utils/isHttpUrl';
import { useSignUpMutation } from './../../../react-query/queries/auth/authMutations';
import { useAuth } from './../../../hooks/useAuth';
import { queryClient } from './../../../react-query/queryClient';
import { userFactory } from './../../../react-query/queries/queryFactory';

interface PhotoScreenProps {
  photoPath?: string;
}

export const PhotoScreen: React.FC<PhotoScreenProps> = ({ photoPath = '' }) => {
  const dispatch = useAppDispatch();
  const [tokens] = useState({ token: '', firebaseToken: '' });
  const { login } = useAuth();
  const { mutateAsync: signUpMutation } = useSignUpMutation();

  const onContinueHandler = async () => {
    if (!isHttpUrl(photoPath)) {
      await dispatch(
        OnboardingActions.setPhotoPath(photoPath.replace('file://', '')),
      );
    }
    try {
      const { firebaseToken, token } = await signUpMutation();
      if (token && firebaseToken) {
        await queryClient.invalidateQueries({
          queryKey: userFactory.getMe().queryKey,
        });
        return login(firebaseToken, token);
      }
      await login(tokens.firebaseToken, tokens.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `url(${IA.BG_CLEAN})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '36px 16px 24px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <CText
          color="pink700"
          isCentered
          size="md_bold"
          text="profile.profil"
          toUppercase
        />
        <CText
          mt={16}
          mb={52}
          color="white"
          isCentered
          size="huge_black"
          text="onboarding.clic-clac"
          toUppercase
        />
      </div>

      <PhotoPreview photoPath={photoPath} />

      <div style={{ padding: '0 24px', marginTop: '32px' }}>
        <ConsentText />
        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <PhotoBack />
          <CButton
            onClick={onContinueHandler}
            buttonType="colored"
            text="onboarding.toSubs"
            style={{ flex: 1 }}
          />
        </div>
      </div>
    </div>
  );
};
