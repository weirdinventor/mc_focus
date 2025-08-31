import React, { useRef } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
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


const emailScheme = z.object({
  email: z.string().email("Adresse email invalide"),
});
type EmailScheme = z.infer<typeof emailScheme>;

// --- Helper Components ---
// Wrapper web pour onboarding
const OnboardingWrapper: React.FC<{
  step: number;
  onContinue: () => void;
  children: React.ReactNode;
}> = ({ step, onContinue, children }) => (
  <div className="onboarding-wrapper">
    <h2>Étape {step}</h2>
    {children}
    <button onClick={onContinue}>Continuer</button>
  </div>
);

// Exemple d’input contrôlé web
const ControlledInput = ({
  inputRef,
  placeholderText,
  name,
  register,
  error,
  LeftAccessory,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  placeholderText: string;
  name: keyof EmailScheme; // ✅ sécurisé ("email" uniquement)
  register: UseFormRegister<EmailScheme>; // ✅ typé correctement
  error?: string;
  LeftAccessory?: React.FC<{ state: "focused" | "default" }>;

}) => {
  const [focused, setFocused] = React.useState(false);

  // 🔑 On sépare `ref` de `register` pour éviter le doublon
  const { ref, ...rest } = register(name);

  return (
    <div className="input-container" style={{ position: "relative", marginBottom: '1rem' }}>
      {LeftAccessory && (
        <div style={{ position: "absolute", left: 8, top: 8 }}>

          <LeftAccessory state={focused ? "focused" : "default"} />
        </div>
      )}
      <input
        {...rest}
        ref={(el) => {
          ref(el); // assigne le ref à react-hook-form
          if (inputRef) {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
          }
        }}
        placeholder={placeholderText}
        type="email"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ paddingLeft: LeftAccessory ? 32 : 8, width: '100%', height: '40px' }}
      />
      {error && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }} className="error">{error}</p>}
    </div>
  );
};

export const EmailScreen: React.FC<{ navigation: { navigate: (route: string) => void } }> = ({
  navigation,
}) => {

  const dispatch = useAppDispatch();
  const { mutate: checkEmail } = useCheckEmailMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailScheme>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailScheme),
  });

  const emailRef = useRef<HTMLInputElement | null>(null);

  const onContinueHandler = ({ email }: EmailScheme) => {
    emailRef.current?.blur();
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
          // Use the navigate function from the hook
          navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.PASSWORD_SCREEN}`);
        },
      }
    );
  };

  return (
    <OnboardingWrapper step={1} onContinue={handleSubmit(onContinueHandler)}>
      <ControlledInput
        inputRef={emailRef}
        placeholderText="Entrez votre email"
        name="email"
        register={register}
        error={errors.email?.message}
        LeftAccessory={({ state }) => (
          <EtaSymbol
            width={20}
            height={20}
            stroke={state === "focused" ? Colors.seance400 : Colors.grey6}
          />
        )}
      />
    </OnboardingWrapper>
  );
};