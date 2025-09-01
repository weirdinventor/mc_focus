import { useState } from 'react';
import { Mail, Apple } from 'lucide-react';
import IA from './../../../assets/images';
import { LoginSheet } from '../../../components/Sheets/LoginSheet';


const TutorialScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);

  const tutorialData = [
    {
      title: "LE MEILLEUR DU BUSINESS EN LIGNE",
      description: "Lorem ipsum dolor sit amet consectetur. Convallis semper sed curabitur sit mattis congue maecenas.",
      image: IA.TUT_BG,
    },
    {
      title: "LIVES EXCLUSIFS DE BUSINESS",
      description: "Lorem ipsum dolor sit amet consectetur. Convallis semper sed curabitur sit mattis congue maecenas.",
      image: IA.TWO,
    },
    {
      title: "LIVES EXCLUSIFS DE BUSINESS",
      description: "Lorem ipsum dolor sit amet consectetur. Convallis semper sed curabitur sit mattis congue maecenas.",
      image: IA.THREE,
      isLast: true
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowAuthModal(true);
      setIsLoginSheetOpen(true);
    }
  };

  const currentData = tutorialData[currentStep];

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)"
      }}
    >
      {/* Background blur effects */}
      <div 
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "#5D00EF",
          filter: "blur(234px)",
          right: "-100px",
          bottom: "-150px"
        }}
      />
      <div 
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "#FE54D2",
          filter: "blur(234px)",
          left: "-100px",
          bottom: "-200px"
        }}
      />

      {/* Main Content */}
      <div
        className="relative z-10 flex-col items-center justify-center h-full px-6"
        style={showAuthModal ? { display: 'none' } : { display: 'flex' }}
      >
        {/* === START: MODIFIED AREA === */}
        {/* Image for the current step */}
        <img
          src={currentData.image}
          alt={currentData.title}
          className="max-w-[400px] h-auto object-cover rounded-2xl mb-12"
          key={currentStep}
        />
        {/* === END: MODIFIED AREA === */}

        {/* Main Content Text */}
        <div className="text-center max-w-2xl mx-auto">
          <h1
            className="text-6xl font-black mb-6 uppercase"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 2.97%, #CACACA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Cabinet Grotesk', sans-serif"
            }}
          >
            {currentData.title}
          </h1>

          <p
            className="text-lg mb-16"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "'Cabinet Grotesk', sans-serif"
            }}
          >
            {currentData.description}
          </p>

          {/* Progress Stepper */}
          <div className="flex justify-center mb-12">
            <div className="relative w-12 h-2">
              <div
                className="absolute w-full h-2 rounded-full"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
              />
              <div
                className="absolute h-2 bg-white rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / tutorialData.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleNext}
            className="px-8 py-4 text-white font-bold uppercase tracking-wide text-lg"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 59.86%, #CACACA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Cabinet Grotesk', sans-serif",
              border: "none",
              cursor: "pointer"
            }}
          >
            TAPER POUR CONTINUER
          </button>
        </div>
      </div>
      {showAuthModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <LoginSheet
              open={isLoginSheetOpen}
              onOpenChange={setIsLoginSheetOpen}
              onClose={() => { setIsLoginSheetOpen(false); setShowAuthModal(false); }}
            />
          </div>
        </div>
      )}

      {/* Bottom overlay gradient */}
      <div 
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 59.33%)"
        }}
      />

    </div>
  );
};

export { TutorialScreen };