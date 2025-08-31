import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EtaSymbol from "./../../../assets/svg/etaSymbol.svg?react";
import { Colors } from "./../../../constants/Colors";
import { OnboardingWrapper } from "../components/OnboardingWrapper";
import { useAppDispatch } from "./../../../store";
import { OnboardingActions } from "./../../../store/onboardingSlice";
import { useGeneratePasswordCodeMutation } from "./../../../react-query/queries/auth/authMutations";
import { useNavigate } from "react-router-dom";
import { ForgotPassStackRoutes, OnboardingStackRoutes, RootStackRoutes } from "../../../navigators/routes";

const emailScheme = z.object({
  email: z.string().email("Adresse email invalide"),
});
type EmailScheme = z.infer<typeof emailScheme>;


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
  name: string;
  register: any; // From react-hook-form
  error?: string;
  LeftAccessory?: React.FC<{ state: 'focused' | 'default' }>;
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <div className="input-container" style={{ position: 'relative', marginBottom: '1rem' }}>
      {LeftAccessory && (
        <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            <LeftAccessory state={focused ? "focused" : "default"} />
        </div>
      )}
      <input
        ref={inputRef}
        placeholder={placeholderText}
        type="email"
        {...register(name)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ paddingLeft: LeftAccessory ? '35px' : '10px', width: '100%', height: '40px' }}
        className="input"
      />
      {error && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }} className="error">{error}</p>}
    </div>
  );
};

export const ForgotPassEmailScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutate } = useGeneratePasswordCodeMutation();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
    setError,
  } = useForm<EmailScheme>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailScheme),
    mode: "onChange",
  });

  const emailInputRef = useRef<HTMLInputElement>(null);

  const onContinueHandler = ({ email }: EmailScheme) => {
    emailInputRef.current?.blur();

    mutate(
      { email },
      {
        onSuccess: () => {
          dispatch(OnboardingActions.setResetPasswordInfo({ email }));
          navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.FORGOT_PASS_STACK}/${ForgotPassStackRoutes.FORGOT_OTP_CHECK}`)
        },
        onError: (err: any) => {
          console.log(err.message);
          if (err.message === "USER_NOT_FOUND") {
            setError("email", {
              message:
                "Aucun compte ne porte cette adresse email. Veuillez vérifier et réessayer.",
            });
          } else {
            setError("email", {
              message:
                "Une erreur s'est produite. Veuillez réessayer ultérieurement.",
            });
          }
        },
      }
    );
  };

  return (
    <OnboardingWrapper
      step={1}
      maxSteps={3}
      disabled={!isValid || !isDirty}
      onContinue={handleSubmit(onContinueHandler)}
    >
      <ControlledInput
        inputRef={emailInputRef}
        placeholderText="Entrez votre email"
        name="email"
        register={register}
        error={errors.email?.message}
        LeftAccessory={({ state }) => (
          <EtaSymbol
            strokeWidth={2}
            stroke={state === "focused" ? Colors.seance400 : Colors.grey6}
          />
        )}
      />
    </OnboardingWrapper>
  );
};