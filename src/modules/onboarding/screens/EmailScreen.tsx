import React, { useRef } from "react";
import { useForm, UseFormRegister, useController, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Colors } from "./../../../constants/Colors";
import { useAppDispatch } from "./../../../store";
import { OnboardingActions } from "./../../../store/onboardingSlice";
import { useCheckEmailMutation } from "./../../../react-query/queries/auth/authMutations";
import EtaSymbol from './../../../assets/svg/etaSymbol.svg?react';
// --- New Imports for Web Conversion ---
import { useNavigate } from "react-router-dom";
import { OnboardingStackRoutes, RootStackRoutes } from "../../../navigators/routes";
import { CButton } from "../../../components/Buttons/CButton";

const emailScheme = z.object({
  email: z.string().email("Adresse email invalide"),
});
type EmailScheme = z.infer<typeof emailScheme>;

// Input styles matching EmailTextInput
const inputStyles = `
  .input-wrapper { 
    display: flex; 
    align-items: center; 
    background-color: rgba(0, 0, 0, 0.05); 
    border: 1px solid transparent; 
    border-radius: 9999px; 
    padding: 16px; 
    height: 56px; 
    transition: border-color 0.2s, box-shadow 0.2s; 
    margin-bottom: 1rem;
    position: relative;
  }
  .input-wrapper.focused { 
    border-color: ${Colors.seance400}; 
    box-shadow: 0 0 0 2px rgba(106, 90, 205, 0.2); 
  }
  .input-wrapper .accessory { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }
  .input-wrapper .left-accessory { 
    margin-right: 12px; 
  }
  .input-wrapper .right-accessory { 
    margin-left: 12px; 
  }
  .input-field { 
    flex: 1; 
    height: 100%; 
    border: none; 
    background: transparent; 
    font-size: 16px; 
    outline: none; 
    padding: 0; 
  }
  .error { 
    color: red; 
    font-size: 12px; 
    margin-top: 4px; 
    position: absolute;
    bottom: -20px;
    left: 16px;
  }
`;

// --- Helper Components ---
// Wrapper web pour onboarding
const OnboardingWrapper: React.FC<{
  step: number;
  onContinue: () => void;
  children: React.ReactNode;
}> = ({ step, onContinue, children }) => (
  <div className="min-h-screen flex items-center justify-center p-4 w-4xl">
    <div className="w-full max-w-7xl mx-auto p-6 sm:p-8 md:p-12">
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center">
          Étape {step}
        </h2>
        <div className="w-full max-w-4xl">
          {children}
        </div>
        <div className="w-full max-w-md">
          <CButton 
            style={{
              background: "linear-gradient(135deg, #000000 0%, #405c57ff 25%, #E79C1C 50%, #E79C1C 75%, #6BE1DF 100%)", 
              color: "#FFFFFF"
            }} 
            className="text-white w-full" 
            text="common.continue" 
            onClick={onContinue} 
          />
        </div>
      </div>
    </div>
  </div>
);

// Updated ControlledInput with the same styling as EmailTextInput
const ControlledInput = ({
  control,
  name,
  placeholderText,
  error,
  LeftAccessory,
}: {
  control: Control<EmailScheme>;
  name: keyof EmailScheme;
  placeholderText: string;
  error?: string;
  LeftAccessory?: React.ComponentType<{ isFocused: boolean }>;
}) => {
  const { field } = useController({ name, control });
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <>
      <style>{inputStyles}</style>
      <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
        {LeftAccessory && (
          <div className="accessory left-accessory">
            <LeftAccessory isFocused={isFocused} />
          </div>
        )}
        <input
          {...field}
          placeholder={placeholderText}
          type="email"
          className="input-field"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export const EmailScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mutate: checkEmail } = useCheckEmailMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailScheme>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailScheme),
  });

  const onContinueHandler = ({ email }: EmailScheme) => {
    checkEmail(
      { email },
      {
        onSuccess: (data) => {
          if (data.taken) {
            setError("email", {
              message: "Cet email est déjà utilisé. Veuillez utiliser un autre email.",
            });
            return;
          }
          dispatch(OnboardingActions.setSignupInfo({ email }));
          navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.PASSWORD_SCREEN}`);
        },
      }
    );
  };

  return (
    <OnboardingWrapper step={1} onContinue={handleSubmit(onContinueHandler)}>      
      <ControlledInput
        control={control}
        placeholderText="Entrez votre email"
        name="email"
        error={errors.email?.message}
        LeftAccessory={({ isFocused }) => (
          <EtaSymbol
            width={20}
            height={20}
            stroke={isFocused ? Colors.seance400 : Colors.grey6}
          />
        )}
      />
    </OnboardingWrapper>
  );
};