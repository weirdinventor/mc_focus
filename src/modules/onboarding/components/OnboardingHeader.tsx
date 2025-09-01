import { CText } from "./../../../components/CText";
import { Colors } from "./../../../constants/Colors";
import {
  ForgotPassStackRoutes,
  OnboardingStackRoutes,
} from "./../../../navigators/routes";
import React from "react";
import { I18nKeyPath } from "./../../../../src/i18n/types";
import { Outlet, useLocation } from "react-router-dom";

export type OnboardingRouteName =
  | (typeof OnboardingStackRoutes)[keyof typeof OnboardingStackRoutes]
  | (typeof ForgotPassStackRoutes)[keyof typeof ForgotPassStackRoutes];

interface IndividualHeader {
  title: I18nKeyPath;
  description: I18nKeyPath;
}

type OnboardingHeaderData = {
  [K in OnboardingRouteName]?: IndividualHeader;
};

export const onboardingHeaderData: OnboardingHeaderData = {
  [OnboardingStackRoutes.LOGIN_SCREEN]: {
    title: "onboarding.header.title.login",
    description: "onboarding.header.description.1",
  },
  [OnboardingStackRoutes.EMAIL_SCREEN]: {
    title: "onboarding.header.title.1",
    description: "onboarding.header.description.6",
  },
  [OnboardingStackRoutes.PASSWORD_SCREEN]: {
    title: "onboarding.header.title.2",
    description: "onboarding.header.description.2",
  },
  [OnboardingStackRoutes.USER_INFO_SCREEN]: {
    title: "onboarding.header.title.3",
    description: "onboarding.header.description.3",
  },
  [OnboardingStackRoutes.USERNAME_SCREEN]: {
    title: "onboarding.header.title.4",
    description: "onboarding.header.description.4",
  },
  [OnboardingStackRoutes.GENDER_SCREEN]: {
    title: "onboarding.header.title.5",
    description: "onboarding.header.description.5",
  },
  [ForgotPassStackRoutes.FORGOT_PASS_EMAIL]: {
    title: "onboarding.header.title.forgotPass",
    description: "onboarding.header.description.7",
  },
  [ForgotPassStackRoutes.FORGOT_OTP_CHECK]: {
    title: "onboarding.header.title.checkEmail",
    description: "onboarding.header.description.8",
  },
  [ForgotPassStackRoutes.FORGOT_NEW_PASS]: {
    title: "onboarding.header.title.newPass",
    description: "onboarding.header.description.9",
  },
};

export const OnboardingHeader = () => {
  const location = useLocation();

  const currentRouteName = location.pathname.split('/').pop() as OnboardingRouteName;

  return (
    <div className="onboarding-header">
      <CText
        size="lg_extraBold"
        toUppercase
        isCentered
        mt={16}
        mb={16}
        text={
          currentRouteName === OnboardingStackRoutes.LOGIN_SCREEN
            ? "onboarding.header.subTitleLogin"
            : "onboarding.header.subTitle"
        }
        color="black"
      />
    </div>
  );
};

 const styles: { container: React.CSSProperties } = {
  container: {
    paddingTop: 20,
    backgroundColor: Colors.backgroundWhite,
    paddingLeft: 16,
    paddingRight: 16,
  },
};

export const OnboardingLayout = () => {
  const location = useLocation();

  const currentRouteName = location.pathname.split('/').pop() as OnboardingRouteName;

  const { title, description } = onboardingHeaderData[currentRouteName] || {};

  return (
    <div className="bg-[#F5F5F4]">
      <OnboardingHeader />
      <div className="flex flex-col  h-dvh">
          <div className="flex flex-col grow-2 justify-center">
            <CText
              mt={36}
              size="huge_bold"
              toUppercase
              isCentered
              text={title}
              color="black"
            />
            <CText
              mt={8}
              mb={24}
              size="md_medium"
              isCentered
              text={description}
              color="grey8"
            />
          </div>
          <div className="grow-1 max-w-4xl mx-auto">
            <Outlet />
          </div>
      </div>
    </div>
  );
};