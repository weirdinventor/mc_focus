import EtaSymbol from "./../../../assets/svg/etaSymbol.svg?react";
import { CButton } from "./../../../components/Buttons/CButton";
import { EmailTextInput } from "./../../../components/EmailTextInput";
import { PassTextInput } from "./../../../components/PassTextInput";
import { Wrapper } from "./../../../components/Wrapper";
import { Colors } from "./../../../constants/Colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProviderAuth } from "./../../../hooks/useProviderAuth";

import { useLoginWithEmailMutation } from "./../../../react-query/queries/auth/authMutations";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginScheme, loginScheme } from "../../../schemes/login.scheme";
import { SocialProviderButton } from "../components/SocialProviderButton";
import { openLink } from "./../../../utils/openLink";
import { CText } from "./../../../components/CText";
import { useNavigate } from "react-router-dom";
import { OnboardingStackRoutes, RootStackRoutes } from "../../../navigators/routes";

export const LoginScreen: React.FC = () => {
  const { googleAuthHandler } = useProviderAuth();
  const { mutate: loginWithEmailMutate } = useLoginWithEmailMutation();
  const [loginError, setLoginError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginScheme>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginScheme),
  });

  const onPressHandler = (formData: LoginScheme) => {
    setLoginError(false);
    loginWithEmailMutate(formData, {
      onError: () => {
        setLoginError(true);
      },
    });
  };


  return (
    <Wrapper style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {loginError && (
          <div
            style={{
              backgroundColor: "#F5F5F4",
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              borderLeft: `4px solid ${Colors.deepRed}`,
            }}
          >
            <CText style={{ color: Colors.deepRed, fontSize: 14, marginLeft: 8, flexShrink: 1 }}>
              {"Email ou mot de passe incorrect. Veuillez réessayer"}
            </CText>
          </div>
        )}

        <EmailTextInput name="email" control={control} placeHolder="Email" />
        <PassTextInput name="password" control={control} placeHolder="Mot de passe" />

        <CButton style={{background: "linear-gradient(135deg, #000000 0%, #405c57ff 25%, #E79C1C 50%, #E79C1C 75%, #6BE1DF 100%)", color: "#FFFFFF"}} className="text-white" text="common.connect" onClick={handleSubmit(onPressHandler)} />

        <CButton
          onClick={() => navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.FORGOT_PASS_STACK}`)}
          mt={12}
          buttonType="secondary"
          text="onboarding.forgotPass"
          small
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SocialProviderButton
          type="login"
          hasBorder
          onPress={() => googleAuthHandler({ isRegistration: false })}
          provider="google"
        />
        {/* Tu peux ajouter Apple login web plus tard si tu veux */}
      </div>

      <CButton
        buttonType="primary"
        text="onboarding.dontHaveAccount"
        small
        style={{ backgroundColor: Colors.white }}
        onClick={() => navigate(`${RootStackRoutes.ONBOARDING_STACK}/${OnboardingStackRoutes.TUTORIAL_SCREEN}`)}
      />

      <CText isCentered>
        <CText text="onboarding.terms&conditions.agreementText" />{" "}
        <CText
          text="onboarding.terms&conditions.terms"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => openLink("https://moulaclub.com/app/mobile/politics/cgu")}
        />{" "}
        <CText text="onboarding.terms&conditions.and" />{" "}
        <CText
          text="onboarding.terms&conditions.privacyPolicy"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => openLink("https://moulaclub.com/app/mobile/politics/privacy")}
        />
      </CText>
    </Wrapper>
  );
};
