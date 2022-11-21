// @flow

import React, { useContext, useState } from "react";
import { View, Platform } from "react-native";
import type { Node } from "react";
import LinearGradient from "react-native-linear-gradient";

import { viewStyles } from "../../styles/iNaturalist/iNatStats";
import { colors } from "../../styles/global";
import BulletedList from "./BulletedList";
import OpenINatButton from "../UIComponents/Buttons/OpenINatButton";
import ProfileImageAndLogin from "./ProfileImageAndLogin";
import { useFetchObservationCount } from "./hooks/inatHooks";
import { AppOrientationContext, UserContext } from "../UserContext";

const INatHeaderLoggedIn = ( ): Node => {
  const [triggerReload, setTriggerReload] = useState( false );
  const { userProfile, login } = useContext( UserContext );
  const { isTablet } = useContext( AppOrientationContext );
  const count = useFetchObservationCount(
    login,
    userProfile.login,
    triggerReload
  );

  const reload = () => { setTriggerReload( !triggerReload ); };

  return (
    <>
      <LinearGradient
        colors={[colors.greenGradientDark, colors.greenGradientLight]}
        style={[viewStyles.linearGradient]}
      >
        <ProfileImageAndLogin count={count} reload={reload} />
        {Platform.OS === "android" && <OpenINatButton />}
      </LinearGradient>
      <View style={viewStyles.loggedInHeaderMargin} />
      <View style={[viewStyles.textContainer, isTablet && viewStyles.tabletContainer]}>
        <BulletedList text="about_inat.logged_in_bullet_1" />
        <BulletedList text="about_inat.logged_in_bullet_2" />
        <BulletedList text="about_inat.logged_in_bullet_3" />
      </View>
    </>
  );
};

export default INatHeaderLoggedIn;
