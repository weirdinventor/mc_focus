import React from 'react';
import IA from './../../../assets/images';
import { CButton } from './../../../components/Buttons/CButton';
import { CText } from './../../../components/CText';
import { useImagePicker } from './../../../hooks/useImagePicker';
import { useAppDispatch, useAppSelector } from './../../../store/index';
import { OnboardingActions } from './../../../store/onboardingSlice';
import { useAuth } from './../../../hooks/useAuth';
import { useSignUpMutation } from './../../../react-query/queries/auth/authMutations';
import { ConsentText } from '../components/ConsentText';

export const TakePhotoScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { openImageLibrary } = useImagePicker();
  const { mutateAsync: signUpMutation } = useSignUpMutation();
  const { login } = useAuth();
  const { username } = useAppSelector((state) => state.onboarding.profileInfo);
  const { photoPath } = useAppSelector((state) => state.onboarding);

  const onPhotoAlbumOpenHandler = async () => {
    try {
      const result = await openImageLibrary();
      if (result?.type === 'success') {
        console.log('Photo choisie:', result.photoPath);
        dispatch(OnboardingActions.setPhotoPath(result.photoPath));
      }
    } catch (error) {
      console.error('Erreur lors de la sélection de la photo :', error);
    }
  };

  const onSignupPress = async () => {
    try {
      const { firebaseToken, token } = await signUpMutation();
      if (token && firebaseToken) login(firebaseToken, token);
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
    }
  }

  const onPicturePassPress = async () => {
    dispatch(OnboardingActions.setPhotoPath(''));
    try {
      const { firebaseToken, token } = await signUpMutation();
      if (token && firebaseToken) login(firebaseToken, token);
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `url(${IA.BG_CLEAN})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '36px 16px 24px',
        position: 'relative',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <CText color="pink700" isCentered size="md_bold" text="profile.profil" toUppercase />
        <CText
          mt={40}
          color="white"
          isCentered
          size="massive_black"
          text="onboarding.hello"
          textOptions={{ name: username }}
          toUppercase
        />
      </div>

      <div
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 260,
            height: 260,
            position: 'absolute',
            cursor: 'pointer',
            backgroundImage: photoPath ? `url("${photoPath}")` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          onClick={onPhotoAlbumOpenHandler}
        />
        <CButton
          buttonType="seance"
          text="onboarding.userInfos.addProfile"
          small
          customStyle={{ position: 'relative', top: 112 }}
          onClick={onPhotoAlbumOpenHandler}
        />
      </div>

      <div style={{ padding: '0 24px', position: 'relative' }}>
      <CButton
          onClick={onPicturePassPress}
          mb={32}
          buttonType="transparent"
          text="onboarding.signup"
        />
        <CButton
          onClick={onPicturePassPress}
          mb={32}
          buttonType="transparent"
          text="onboarding.passStep"
        />
        <ConsentText />
      </div>
    </div>
  );
};
