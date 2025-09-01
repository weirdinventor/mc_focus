// /components/ControlledInput.tsx (SIMPLIFIÉ)

import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { CTextInput, CustomTextInputProps } from './CTextInput'; // Assurez-vous que le chemin est correct

interface ControlledInputProps<TFieldValues extends FieldValues = FieldValues>
  extends CustomTextInputProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
}

export const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  name,
  ...cTextInputProps
}: ControlledInputProps<TFieldValues>) => {
  return (
    <Controller
      
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur, ref }, // On récupère la ref ici
        fieldState: { invalid, error },
      }) => (
        <CTextInput
        
          {...cTextInputProps}

          // Les props du champ sont directement passées
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}

          // La ref du Controller est passée à la prop `ref` du CTextInput
          ref={ref}

          // L'état est dérivé de react-hook-form
          state={invalid ? 'error' : undefined}
          error={error}
        />
      )}
    />
  );
};