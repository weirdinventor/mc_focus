// /components/OTPInput.js

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import OtpInput from 'react-otp-input';

// --- Mock de constantes ---
const Colors = {
  white: '#FFFFFF',
  grey7: '#e0e0e0',
  primaryBlack: '#333333',
  seance700: '#6a5acd',
  deepRed: '#dc3545',
  transparent: 'transparent',
};

// --- Styles CSS ---
const otpStyles = `
  .otp-container {
    justify-content: space-between;
    gap: 10px; /* Ajoute un espacement si space-between n'est pas suffisant */
  }
  .otp-input {
    background-color: ${Colors.grey7};
    height: 62px !important;
    width: 62px !important;
    border: 2px solid ${Colors.transparent};
    border-radius: 100% !important; /* Cercle parfait */
    font-size: 16px;
    color: ${Colors.primaryBlack};
    transition: border-color 0.2s, background-color 0.2s;
  }
  .otp-input:focus {
    border-color: ${Colors.seance700};
    outline: none;
  }
  .otp-input.filled {
    border-color: ${Colors.seance700};
    background-color: ${Colors.white};
  }
  .otp-input.error {
    border-color: ${Colors.deepRed} !important; /* Priorité sur les autres styles */
  }
`;

// --- Interface des props ---
interface OTPInputCustomProps {
  value: string;
  onChange: (otp: string) => void;
  isError: boolean;
  // Ajoutez d'autres props de react-otp-input que vous voulez exposer
}

// --- Le composant React JS ---
export const OTPInput = forwardRef(({ isError, ...otpInputProps }: OTPInputCustomProps, ref) => {
  // Le `ref` de `react-otp-input` ne donne pas accès aux mêmes méthodes.
  // Nous ne pouvons pas simplement le transférer. On pourrait l'adapter si nécessaire.
  // Pour une conversion simple, nous omettons la logique de ref avancée pour l'instant.

  return (
    <>
      <style>{otpStyles}</style>
      <OtpInput
        {...otpInputProps}
        numInputs={5}
        containerStyle="otp-container"
        inputStyle={`otp-input ${isError ? 'error' : ''}`}
        shouldAutoFocus
        // `renderInput` est puissant pour la personnalisation
        renderInput={(props, index) => (
          <input
            {...props}
            className={`${props.className} ${props.value ? 'filled' : ''}`}
          />
        )}
      />
    </>
  );
});