import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/splash";
import logoImages from "../assets/logos";
import backgrounds from "../assets/backgrounds";
import { checkIfFirstLaunch, setCameraLaunched } from "../utility/helpers";
import { deleteDebugLogAfter7Days } from "../utility/photoHelpers";
import { setupBadges } from "../utility/badgeHelpers";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect( () => {
    const resetRouter = ( name ) => {
      setTimeout( () => navigation.reset( { routes: [{ name }] } ), 2000 );
    };

    const checkForNewUser = async () => {
      setCameraLaunched( false );
      if ( Platform.OS === "android" ) {
        deleteDebugLogAfter7Days(); // delete debug logs on Android
      }
      const isFirstLaunch = await checkIfFirstLaunch();

      if ( isFirstLaunch ) {
        setTimeout( setupBadges, 3000 );
        resetRouter( "Onboarding" );
      } else {
        resetRouter( "Drawer" );
      }
    };

    checkForNewUser();
  }, [navigation] );

  return (
    <ImageBackground source={backgrounds.splash} style={styles.backgroundImage}>
      <Image source={logoImages.seek} style={styles.logo} />
      <Image source={logoImages.joint} style={styles.joint} />
    </ImageBackground>
  );
};

export default SplashScreen;
