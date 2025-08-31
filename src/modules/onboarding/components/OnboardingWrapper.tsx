import React, { ReactNode } from "react";
import { BottomButtons } from "./BottomButtons";
import { Colors } from "./../../../constants/Colors";

interface OnboardingWrapperProps {
  onContinue: () => void;
  step: number;
  maxSteps?: number;
  disabled?: boolean;
  children: ReactNode; 
}

export const OnboardingWrapper = ({
  onContinue,
  children,
  step,
  maxSteps,
  disabled,
}: OnboardingWrapperProps) => {
  return (
    <div style={styles.container}>
      {children}
      <BottomButtons
        disabled={disabled}
        step={step}
        maxSteps={maxSteps}
        onContinue={onContinue}
      />
    </div>
  );
};

const styles: { container: React.CSSProperties } = {
  container: {
 // 👈 TS reconnaît la valeur exacte
    flex: 1,
    padding: "0 16px",
    gap: "12px",
  },
};
