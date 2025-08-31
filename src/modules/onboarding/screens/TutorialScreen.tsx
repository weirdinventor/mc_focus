import IA from './../../../assets/images';
import { CButton } from './../../../components/Buttons/CButton';
import { CText } from './../../../components/CText';
import React, { useState } from 'react';
import { I18nKeyPath } from './../../../i18n/types';
import { SheetsTypes } from './../../../lib/sheets';
import { TutorialSegment } from '../components/TutorialSegment';
import { LoginSheet } from '../../../components/Sheets/LoginSheet';

interface TutorialDataInf {
  title: I18nKeyPath;
  description: I18nKeyPath;
  image: string; // chemin de l'image
}

const TUTORIAL_DATA: TutorialDataInf[] = [
  {
    title: 'onboarding.tutorial.title.1',
    description: 'onboarding.tutorial.description.1',
    image: IA.TUT_BG,
  },
  {
    title: 'onboarding.tutorial.title.2',
    description: 'onboarding.tutorial.description.2',
    image: IA.TUT_BG_2,
  },
  {
    title: 'onboarding.tutorial.title.3',
    description: 'onboarding.tutorial.description.3',
    image: IA.TUT_BG_3,
  },
];

export const TutorialScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { title, description, image } = TUTORIAL_DATA[currentStep];
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);

  const onNextHandler = () => {
    if (currentStep === 2) {
      // Ici tu peux gérer la navigation web selon ton router
      console.log('Show login sheet:', SheetsTypes.LOGIN_SHEET);
      setIsLoginSheetOpen(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <LoginSheet
        open={isLoginSheetOpen}
        onOpenChange={setIsLoginSheetOpen}
        onClose={() => setIsLoginSheetOpen(false)}
      />
      <div className="flex flex-row" style={{
        backgroundColor: "#A61EDF",
        display: "flex",
        background:
          "linear-gradient(42.15deg, #CA82FF 0%, #CD80F0 11.26%, #A61EDF 22.91%, #1C0024 77.68%)",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}>
        <div
          className="flex-1 bg-cover bg-center min-h-screen"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="flex-1 flex flex-col justify-around px-6 md:px-12">
          <div style={{ marginBottom: 120 }}>
            <CText
              isCentered
              size="massive_black"
              color="white"
              toUppercase
              text={title}
            />
            <CText
              mt={16}
              mb={32}
              size="md"
              color="white80"
              isCentered
              text={description}
            />
            <TutorialSegment step={currentStep} />
          </div>
          <CButton
            buttonType={currentStep === 2 ? 'primary' : 'transparent'}
            mb={16}
            text={
              currentStep === 2
                ? 'common.start'
                : 'onboarding.tutorial.tapToContinue'
            }
            onClick={onNextHandler}
          />
        </div>
      </div>
    </>
  );
};
