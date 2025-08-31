import React, { useState } from "react";
import { Gender } from "../../../core/domain/entities/Gender"; // import type from GenderButton
import { useAppDispatch, useAppSelector } from "../../../store";
import { OnboardingActions } from "../../../store/onboardingSlice";
import { OnboardingWrapper } from "../components/OnboardingWrapper";
import { GenderButton } from "../components/GenderButton";
import { OnboardingStackRoutes } from '../../../navigators/routes';
import { useNavigate } from "react-router-dom";


export const GenderScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { photoPath } = useAppSelector((state) => state.onboarding);
  const [selectedGender, setSelectedGender] = useState<Gender>();
  const navigate = useNavigate();

  const onContinueHandler = () => {
    if (!selectedGender) return;

    dispatch(OnboardingActions.setProfileInfo({ gender: selectedGender }));
    if (photoPath) {
      navigate(`/onboarding/${OnboardingStackRoutes.PHOTO_SCREEN}?path=${photoPath}`);
    } else {
      navigate(`/onboarding/${OnboardingStackRoutes.TAKE_PHOTO_SCREEN}`);
    }
  };

  return (
    <OnboardingWrapper
      disabled={!selectedGender}
      step={4}
      onContinue={onContinueHandler}
    >
      <GenderButton
        onPress={setSelectedGender}
        gender="male"
        selectedGender={selectedGender}
      />
      <GenderButton
        onPress={setSelectedGender}
        gender="female"
        selectedGender={selectedGender}
      />
      <GenderButton
        onPress={setSelectedGender}
        gender="unknown"
        selectedGender={selectedGender}
      />
    </OnboardingWrapper>
  );
};
