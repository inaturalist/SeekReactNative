// @flow

import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../../styles/home/inatCard";
import GreenText from "../../UIComponents/GreenText";

import BulletedList from "../../iNaturalist/BulletedList";
import useLatestChallenge from "../Challenges/hooks/challengeCardHooks";
import OpenINatButton from "../../UIComponents/Buttons/OpenINatButton";
import ProfileImageAndLogin from "../../iNaturalist/ProfileImageAndLogin";

const INatCardLoggedIn = ( ): React.Node => {
  const challenge = useLatestChallenge( );

  return (
    <View style={[viewStyles.container, challenge && viewStyles.topMarginWithChallenge]}>
      <GreenText text="about_inat.inaturalist" />
      <ProfileImageAndLogin />
      <BulletedList text="about_inat.logged_in_bullet_1" />
      <BulletedList text="about_inat.logged_in_bullet_2" />
      <View style={viewStyles.marginOpenINat} />
      <OpenINatButton />
    </View>
  );
};

export default INatCardLoggedIn;
