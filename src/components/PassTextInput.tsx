// /components/PassTextInput.tsx

import React, { useState } from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';

// --- Mock de constantes (à remplacer par vos vraies valeurs) ---
const Colors = {
  seance400: '#6a5acd', // Un violet pour l'état focus
  grey6: '#888888',
  grey5: '#aaaaaa',
};

// --- Remplacement des Icônes par des composants SVG ---
const LockIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
const EyeIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const EyeOffIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

// --- Styles CSS ---
const inputStyles = `
  .input-wrapper { display: flex; align-items: center; background-color: #f0f0f0; border: 1px solid transparent; border-radius: 8px; padding: 0 12px; height: 56px; transition: border-color 0.2s, box-shadow 0.2s; }
  .input-wrapper.focused { border-color: ${Colors.seance400}; box-shadow: 0 0 0 2px rgba(106, 90, 205, 0.2); }
  .input-wrapper .accessory { display: flex; align-items: center; justify-content: center; }
  .input-wrapper .left-accessory { margin-right: 10px; }
  .input-wrapper .right-accessory { margin-left: 10px; }
  .input-wrapper .toggle-visibility-btn { background: none; border: none; padding: 4px; cursor: pointer; display: flex; align-items: center; }
  .input-field { flex: 1; height: 100%; border: none; background: transparent; font-size: 16px; outline: none; padding: 0; }
`;

// --- Version web de `ControlledInput` (corrigée) ---
interface ControlledInputProps<TFieldValues extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  LeftAccessory?: React.ComponentType<{ isFocused: boolean }>;
  RightAccessory?: React.ComponentType<{ isFocused: boolean }>;
}

// Étape 1: Déclarer le composant comme une fonction générique nommée qui gère le ref.
const ControlledInputInner = <TFieldValues extends FieldValues>(
  { control, name, LeftAccessory, RightAccessory, ...rest }: ControlledInputProps<TFieldValues>,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const { field } = useController({ name, control });
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
      {LeftAccessory && <div className="accessory left-accessory"><LeftAccessory isFocused={isFocused} /></div>}
      <input {...field} {...rest} ref={ref} className="input-field" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
      {RightAccessory && <div className="accessory right-accessory"><RightAccessory isFocused={isFocused} /></div>}
    </div>
  );
};

// Étape 2: Envelopper la fonction avec React.forwardRef. TypeScript va maintenant
// correctement inférer les types génériques lors de son utilisation.
const ControlledInput = React.forwardRef(ControlledInputInner) as <TFieldValues extends FieldValues>(
    props: ControlledInputProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;


// --- Interface et Composant `PassTextInput` (inchangé) ---
interface PassTextInputProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  placeHolder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const PassTextInput = <TFieldValues extends FieldValues>({ control, name, placeHolder = 'Mot de passe', inputRef }: PassTextInputProps<TFieldValues>) => {
  const [isSecureEnabled, setIsSecuredEnabled] = useState(true);
  return (
    <>
      <style>{inputStyles}</style>
      <ControlledInput
        ref={inputRef}
        type={isSecureEnabled ? 'password' : 'text'}
        placeholder={placeHolder}
        control={control}
        name={name}
        LeftAccessory={({ isFocused }) => ( <LockIcon color={isFocused ? Colors.seance400 : Colors.grey6} /> )}
        RightAccessory={() => (
          <button type="button" className="toggle-visibility-btn" onClick={() => setIsSecuredEnabled(!isSecureEnabled)} aria-label={isSecureEnabled ? "Afficher le mot de passe" : "Cacher le mot de passe"}>
            {isSecureEnabled ? <EyeOffIcon color={Colors.grey5} /> : <EyeIcon color={Colors.grey5} />}
          </button>
        )}
      />
    </>
  );
};