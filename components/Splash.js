// @flow

import React, { useEffect, useCallback } from "react";
import { Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import { colors } from "../styles/global";
import styles from "../styles/splash";
import logos from "../assets/logos";
import backgrounds from "../assets/backgrounds";
import { addARCameraFiles, checkIfFirstLaunch, setCameraLaunched } from "../utility/helpers";
import { setupBadges } from "../utility/badgeHelpers";
import { checkForHotStarts, checkForColdStarts, setQuickActions } from "../utility/navigationHelpers";
import { deleteFromAsyncStorage, setupUserSettings } from "../utility/settingsHelpers";

const SplashScreen = ( ): Node => {
  const navigation = useNavigation( );
  const navToCamera = useCallback( ( ) => navigation.navigate( "Camera" ), [navigation] );

  const resetRouter = useCallback( ( name ) => {
    setTimeout( ( ) => navigation.reset( { routes: [{ name }] } ), 2000 );
  }, [navigation] );

  const checkForQuickAction = useCallback( ( ) => {
    checkForHotStarts( navToCamera );
    checkForColdStarts( navToCamera, resetRouter );
  }, [resetRouter, navToCamera] );

  useEffect( ( ) => {
    const checkForNewUser = async ( ) => {
      setCameraLaunched( false );
      await deleteFromAsyncStorage( "speciesNearbyLocation" );
      setupUserSettings( );
      const isFirstLaunch = await checkIfFirstLaunch( );

      if ( isFirstLaunch ) {
        setTimeout( setupBadges, 3000 );
        setQuickActions( );
        addARCameraFiles( );
        resetRouter( "Onboarding" );
      } else {
        checkForQuickAction( );
      }
    };

    checkForNewUser( );
  }, [navigation, checkForQuickAction, resetRouter] );

  return (
    <ImageBackground source={backgrounds.splash} style={styles.backgroundImage}>
      <Image source={logos.seek} style={styles.logo} />
      {/* $FlowFixMe */}
      <Image source={logos.casNatGeo} tintColor={colors.white} style={styles.joint} />
    </ImageBackground>
  );
};

export default SplashScreen;
