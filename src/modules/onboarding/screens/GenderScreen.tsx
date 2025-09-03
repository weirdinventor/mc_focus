import React, { useState } from "react";
import { Gender } from "../../../core/domain/entities/Gender";
import { useAppDispatch, useAppSelector } from "../../../store";
import { OnboardingActions } from "../../../store/onboardingSlice";
import { OnboardingWrapper } from "../components/OnboardingWrapper";
import { OnboardingStackRoutes } from '../../../navigators/routes';
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../constants/Colors";

// Choice styles matching the input styling
const choiceStyles = `
  .choice-wrapper { 
    display: flex; 
    align-items: center; 
    background-color: rgba(0, 0, 0, 0.05); 
    border: 2px solid transparent; 
    border-radius: 9999px; 
    padding: 16px 20px; 
    height: 64px; 
    transition: all 0.2s ease; 
    margin-bottom: 12px;
    position: relative;
    width: 100%;
    cursor: pointer;
    user-select: none;
  }
  .choice-wrapper:hover { 
    background-color: rgba(0, 0, 0, 0.08); 
    transform: translateY(-1px);
  }
  .choice-wrapper.selected { 
    border-color: ${Colors.seance400}; 
    background-color: rgba(106, 90, 205, 0.1);
    box-shadow: 0 0 0 2px rgba(106, 90, 205, 0.2); 
  }
  .choice-wrapper.selected:hover { 
    background-color: rgba(106, 90, 205, 0.15);
  }
  .choice-icon { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    margin-right: 16px;
    font-size: 24px;
    min-width: 32px;
    transition: all 0.2s ease;
  }
  .choice-wrapper.selected .choice-icon {
    transform: scale(1.1);
  }
  .choice-text { 
    flex: 1; 
    font-size: 16px; 
    font-weight: 500;
    color: #374151;
    transition: color 0.2s ease;
  }
  .choice-wrapper.selected .choice-text {
    color: ${Colors.seance400};
    font-weight: 600;
  }
  .choice-indicator {
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    transition: all 0.2s ease;
    position: relative;
  }
  .choice-wrapper.selected .choice-indicator {
    border-color: ${Colors.seance400};
    background-color: ${Colors.seance400};
  }
  .choice-wrapper.selected .choice-indicator::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
  }
`;

// Gender choice data
const genderChoices = [
  {
    value: "male" as Gender,
    label: "Homme",
    icon: "👨",
    description: "Je m'identifie comme homme"
  },
  {
    value: "female" as Gender,
    label: "Femme", 
    icon: "👩",
    description: "Je m'identifie comme femme"
  },
  {
    value: "unknown" as Gender,
    label: "Autre / Préfère ne pas dire",
    icon: "👤",
    description: "Autre identité de genre"
  }
];

// Styled choice component
const GenderChoice = ({
  choice,
  isSelected,
  onSelect,
}: {
  choice: typeof genderChoices[0];
  isSelected: boolean;
  onSelect: (gender: Gender) => void;
}) => {
  return (
    <>
      <style>{choiceStyles}</style>
      <div 
        className={`choice-wrapper ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelect(choice.value)}
      >
        <div className="choice-icon">
          {choice.icon}
        </div>
        <div className="flex flex-col flex-1">
          <div className="choice-text">
            {choice.label}
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: isSelected ? Colors.seance400 : '#9ca3af',
            marginTop: '2px',
            fontWeight: '400'
          }}>
            {choice.description}
          </div>
        </div>
        <div className="choice-indicator"></div>
      </div>
    </>
  );
};

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
      <div className="space-y-3 w-3xl">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Comment vous identifiez-vous ?
          </h3>
          <p className="text-gray-600 text-sm">
            Cette information nous aide à personnaliser votre expérience
          </p>
        </div>
        
        {genderChoices.map((choice) => (
          <GenderChoice
            key={choice.value}
            choice={choice}
            isSelected={selectedGender === choice.value}
            onSelect={setSelectedGender}
          />
        ))}
      </div>
    </OnboardingWrapper>
  );
};