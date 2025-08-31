// /components/CTextInput.tsx (CORRIGÉ AVEC forwardRef)

import React, { ComponentType, useMemo, useRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { CText } from './CText'; // Assurez-vous que ce composant existe et est adapté au web
import { t } from "i18next";

// --- Mocks et Styles (inchangés) ---
const Colors = { /* ... vos couleurs ... */ };
const TestIDs = { tests: { CTextInputBottomText: 'ctext-input-bottom-text' } };
const componentStyles = `/* ... vos styles ... */`;

// --- Type Definitions for Web (MODIFIÉES) ---
type TextInputStatuses = 'disabled' | 'error' | 'focused';
type AccessoryProps = { state?: TextInputStatuses };

// On enlève `inputRef` d'ici, car il sera géré par `forwardRef`
export type CustomTextInputProps = {
  state?: TextInputStatuses;
  placeholderText?: string;
  error?: FieldError;
  LeftAccessory?: ComponentType<AccessoryProps>;
  RightAccessory?: ComponentType<AccessoryProps>;
  bottomText?: string;
  bottomTextColor?: string;
  wrapperClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'>;


/**
 * Un composant de saisie de texte personnalisable qui propage la ref.
 * Enveloppé dans React.forwardRef.
 */
export const CTextInput = React.forwardRef<HTMLInputElement, CustomTextInputProps>(
  ({
    state,
    placeholderText,
    LeftAccessory,
    RightAccessory,
    bottomText,
    bottomTextColor = 'red',
    error,
    className,
    wrapperClassName,
    style,
    disabled: propsDisabled,
    ...textInputProps
  }, ref) => { // La ref est maintenant le deuxième argument !

    const [isFocused, setIsFocused] = useState(false);

    const disabled = propsDisabled || state === 'disabled';
    const hasError = !!error || state === 'error';
    const placeholderString = (placeholderText && t(placeholderText));

    const focusTextInput = () => {
      if (disabled) return;
      // Pour faire le focus, on peut vérifier si la ref est un objet
      if (ref && typeof ref !== 'function') {
        ref.current?.focus();
      }
    };

    // --- Logique des classes CSS (inchangée) ---
    const linearOuterClasses = useMemo(() => [/* ... */].filter(Boolean).join(' '), [isFocused, hasError]);
    const wrapperClasses = useMemo(() => [/* ... */].filter(Boolean).join(' '), [isFocused, wrapperClassName]);
    const inputClasses = useMemo(() => [/* ... */].filter(Boolean).join(' '), [hasError, className]);
    const currentAccessoryState = isFocused ? 'focused' : state;

    return (
      <>
        <style>{componentStyles}</style>
        <div className="ctext-input-pressable-wrapper" onClick={focusTextInput}>
          <div className={linearOuterClasses} style={style}>
            <div className={wrapperClasses}>
              {!!LeftAccessory && <LeftAccessory state={currentAccessoryState} />}
              <input
                // ICI : La ref est directement attachée à l'élément input.
                ref={ref}
                placeholder={placeholderString}
                {...textInputProps}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                className={inputClasses}
              />
              {!!RightAccessory && <RightAccessory state={currentAccessoryState} />}
            </div>
          </div>
          
          {error?.message && hasError && !isFocused && (
            <CText
              data-testid={TestIDs.tests.CTextInputBottomText}
              size="sm_extraBold"
              style={{ color: bottomTextColor }}
              className="ctext-input-bottom-text"
            >
              {error?.message ?? bottomText}
            </CText>
          )}
        </div>
      </>
    );
  }
);