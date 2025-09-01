// /components/EmailTextInput.tsx

import React, { useState } from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';

const Colors = {
  seance400: '#6a5acd',
  grey6: '#888888',
  grey5: '#aaaaaa',
};

// SVG Email Icon
const EmailIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const inputStyles = `
  .input-wrapper { display: flex; align-items: center; background-color: #f0f0f0; border: 1px solid transparent; border-radius: 8px; padding: 0 12px; height: 56px; transition: border-color 0.2s, box-shadow 0.2s; }
  .input-wrapper.focused { border-color: ${Colors.seance400}; box-shadow: 0 0 0 2px rgba(106, 90, 205, 0.2); }
  .input-wrapper .accessory { display: flex; align-items: center; justify-content: center; }
  .input-wrapper .left-accessory { margin-right: 10px; }
  .input-wrapper .right-accessory { margin-left: 10px; }
  .input-field { flex: 1; height: 100%; border: none; background: transparent; font-size: 16px; outline: none; padding: 0; }
`;

interface ControlledInputProps<TFieldValues extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  LeftAccessory?: React.ComponentType<{ isFocused: boolean }>;
  RightAccessory?: React.ComponentType<{ isFocused: boolean }>;
}

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

const ControlledInput = React.forwardRef(ControlledInputInner) as <TFieldValues extends FieldValues>(
    props: ControlledInputProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;

interface EmailTextInputProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  placeHolder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const EmailTextInput = <TFieldValues extends FieldValues>({ control, name, placeHolder = 'Email', inputRef }: EmailTextInputProps<TFieldValues>) => {
  return (
    <>
      <style>{inputStyles}</style>
      <ControlledInput
        ref={inputRef}
        type="email"
        placeholder={placeHolder}
        control={control}
        name={name}
        autoComplete="email"
        LeftAccessory={({ isFocused }) => (<EmailIcon color={isFocused ? Colors.seance400 : Colors.grey6} />)}
      />
    </>
  );
};
