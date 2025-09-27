import React from "react";
import { useNavigate } from "react-router-dom"; // React Router DOM pour navigation
import { CButton } from "./../../../components/Buttons/CButton";
import { StaticProgressBar } from "./../../../components/StaticProgressBar";

interface BottomButtonsProps {
  onContinue: () => void;
  step: number;
  maxSteps?: number;
  disabled?: boolean;
}

export const BottomButtons: React.FC<BottomButtonsProps> = ({
  onContinue,
  step,
  maxSteps = 5,
  disabled,
}) => {
  const navigate = useNavigate();

  return (
    <div 
      style={{ 
        paddingBottom: 8, 
        display: "flex", 
        flexDirection: "column", 
        flex: 1, 
        justifyContent: "flex-end" 
      }}
      className="px-4 md:px-8 lg:px-12"
    >
      {/* Enhanced container with responsive sizing */}
      <div className="w-full max-w-5xl mx-auto space-y-6 md:space-y-8 lg:space-y-10">
        
        {/* Enhanced progress bar container */}
        <div className="px-2 md:px-4 lg:px-6">
          <StaticProgressBar 
            value={step} 
            maxValue={maxSteps} 
            className="h-2 md:h-3 lg:h-4"
          />
        </div>

        {/* Enhanced buttons container */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-8">
          
          {/* Enhanced Return Button */}
          <CButton
            onClick={() => navigate(-1)} // équivalent de goBack()
            buttonType="primary"
            text="common.return"
            className="w-full h-12 md:h-14 lg:h-16 xl:h-18 
                       text-sm md:text-base lg:text-lg xl:text-xl
                       px-6 md:px-8 lg:px-10 xl:px-12"
          />

          {/* Enhanced Continue Button */}
          <button 
            disabled={disabled} 
            onClick={onContinue} 
            className={`w-full h-12 md:h-14 lg:h-16 xl:h-18
                       text-sm md:text-base lg:text-lg xl:text-xl
                       font-bold
                       px-6 md:px-8 lg:px-10 xl:px-12
                       ${disabled 
                         ? 'opacity-50 cursor-not-allowed' 
                         : ''
                       }`}
            style={{
              color: '#000000',
              background: disabled 
                ? '#9CA3AF' 
                : "linear-gradient(135deg, #000000 0%, #405c57ff 25%, #E79C1C 50%, #E79C1C 75%, #6BE1DF 100%)",
              borderRadius: "99px", 
              padding: "12px 24px",
            }}
          >
            {disabled ? 'CHARGEMENT...' : 'SUIVANT'}
          </button>
        </div>


      </div>
    </div>
  );
};