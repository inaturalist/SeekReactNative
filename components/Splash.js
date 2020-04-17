// @flow

import React, { useEffect } from "react";
import {
  Image,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/splash";
import logoImages from "../assets/logos";
import backgrounds from "../assets/backgrounds";
import { checkIfFirstLaunch, setCameraLaunched } from "../utility/helpers";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect( () => {
    const resetRouter = ( name ) => {
      setTimeout( () => navigation.reset( { routes: [{ name }] } ), 2000 );
    };

    const checkForNewUser = async () => {
      setCameraLaunched( false );
      const isFirstLaunch = await checkIfFirstLaunch();

      if ( isFirstLaunch ) {
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
