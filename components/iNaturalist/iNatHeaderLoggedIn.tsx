import React, { useContext, useState } from "react";
import { Platform, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { colors } from "../../styles/global";
import { viewStyles } from "../../styles/iNaturalist/iNatStats";
import { useUploadedObservationCount } from "../../utility/customHooks";
import { useAppOrientation } from "../Providers/AppOrientationProvider";
import OpenINatButton from "../UIComponents/Buttons/OpenINatButton";
import { UserContext } from "../UserContext";
import BulletedList from "./BulletedList";
import ProfileImageAndLogin from "./ProfileImageAndLogin";

const INatHeaderLoggedIn = ( ) => {
  const [triggerReload, setTriggerReload] = useState( false );
  const { userProfile, login } = useContext( UserContext );
  const { isTablet } = useAppOrientation( );
  const count = useUploadedObservationCount( {
    login,
    username: userProfile.login,
    triggerReload,
  } );

  const reload = () => { setTriggerReload( !triggerReload ); };

  return (
    <>
      <LinearGradient
        colors={[colors.greenGradientDark, colors.greenGradientLight]}
        style={viewStyles.linearGradient}
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
