import React, { useState } from "react";
import { SocialProviderButton } from "./SocialProviderButton";

// ⚠️ Remplace par tes vrais hooks et logique web
import { useProviderAuth } from "./../../../hooks/useProviderAuth";
import { Providers } from "./../../../core/domain/entities/Providers";
import { useNavigate } from "react-router-dom";

export const ProvidersChoices: React.FC = () => {
  const { googleAuthHandler, appleAuthHandler } = useProviderAuth();

  const [googlePending, setGooglePending] = useState(false);
  const [applePending, setApplePending] = useState(false);

  const navigate = useNavigate();

  const onProviderPress = async (provider: Exclude<Providers, "email">) => {
    if (provider === "google") {
      try {
        setGooglePending(true);
        await googleAuthHandler({ isRegistration: true });
      } catch (error) {
        console.error(error);
      } finally {
        setGooglePending(false);
      }
    }
    if (provider === "apple") {
      try {
        setApplePending(true);
        await appleAuthHandler({ isRegistration: true });
      } catch (error) {
        console.error(error);
      } finally {
        setApplePending(false);
      }
    }
  };

  const onPressHandler = async () => {
    // ⚠️ Remplace par ta logique (navigation, redux, etc.)
    console.log("Go to Email signup screen");
    navigate("/onboarding/email");
  };

  return (
    <div className="flex flex-col gap-3 relative w-full max-w-md mx-auto">
      <SocialProviderButton
        type="signup"
        onPress={() => onProviderPress("google")}
        provider="google"
        hasBorder
      />

      <SocialProviderButton
        type="signup"
        onPress={() => onProviderPress("apple")}
        provider="apple"
        hasBorder
      />

      <SocialProviderButton
        type="signup"
        onPress={onPressHandler}
        provider="email"
        hasBorder
      />

      {(googlePending || applePending) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-black border-t-transparent" />
        </div>
      )}
    </div>
  );
};
