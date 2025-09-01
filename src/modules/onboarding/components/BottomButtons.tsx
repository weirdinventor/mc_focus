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
    <div style={{ paddingBottom: 8, display: "flex", flexDirection: "column", flex: 1, justifyContent: "flex-end" }}>
      <StaticProgressBar value={step} maxValue={maxSteps} />
      <div style={{ display: "flex", flexDirection: "row", gap: 16, marginTop: 16 }}>
        <CButton
          onClick={() => navigate(-1)} // équivalent de goBack()
          buttonType="primary"
          text="common.return"
          className="w-full"
        />
        <button disabled={disabled} onClick={onContinue} style={{background: "linear-gradient(135deg, #000000 0%, #405c57ff 25%, #E79C1C 50%, #E79C1C 75%, #6BE1DF 100%)", borderRadius: "99px", padding: "12px 24px", width: "100%"}} className="bg-[#CA82FF] text-white rounded-full px-4 py-2">SUIVANT</button>
      </div>
    </div>
  );
};
