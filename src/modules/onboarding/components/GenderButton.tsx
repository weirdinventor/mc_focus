import { t } from "i18next";
import React from "react";

type Gender = "male" | "female"|"unknown"; // you can adjust according to your app

interface GenderButtonProps {
  onPress: (gender: Gender) => void;
  gender: Gender;
  selectedGender?: Gender;
}

export const GenderButton: React.FC<GenderButtonProps> = ({
  onPress,
  gender,
  selectedGender,
}) => {
  return (
    <button
      onClick={() => onPress(gender)}
      style={{
        background:
          selectedGender === gender
            ? "linear-gradient(90deg, #084b61, #f17612)"
            : "#ccc",
        borderRadius: "32px",
        padding: "16px 24px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {t(`onboarding.userInfos.gender.${gender}`)}
    </button>
  );
};
