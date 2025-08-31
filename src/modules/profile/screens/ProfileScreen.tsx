import React from "react";
import { Screen } from "./../../../components/Screen";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileInfos } from "../components/ProfileInfos";
import { BadgesList } from "./../../../components/BadgesList";

export const ProfileScreen: React.FC = () => {
    return (
      <Screen
        noHorizontalPadding
      containerStyles={{ paddingTop: 0, paddingBottom: 16 }}
      // fullscreen
      // withoutBottomEdge
      >
        <ProfileHeader />
        {/* <BadgesList type="personal" /> */}
        <ProfileInfos />
      </Screen>
    );
  };
