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
import { AppOrientationContext } from "./UserContext";

const SplashScreen = ( ): Node => {
  const { isTablet } = React.useContext( AppOrientationContext );
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

      // originally, I thought we could move AR camera files into the main bundle on first launch only,
      // but this breaks the camera for offloaded apps on iOS
      addARCameraFiles( );
      const isFirstLaunch = await checkIfFirstLaunch( );

      if ( isFirstLaunch ) {
        setTimeout( setupBadges, 3000 );
        setQuickActions( );
        resetRouter( "Onboarding" );
      } else {
        checkForQuickAction( );
      }
    };

    checkForNewUser( );
  }, [navigation, checkForQuickAction, resetRouter] );

  return (
    <ImageBackground
      source={isTablet ? backgrounds.splashiPad : backgrounds.splash}
      style={styles.backgroundImage}
    >
      <Image
        source={logos.seek}
        style={[styles.logo, isTablet && styles.logoTablet]}
      />
      {/* $FlowFixMe */}
      <Image
        source={logos.casNatGeo}
        tintColor={colors.white}
        style={[styles.joint, isTablet && styles.logoJoint]}
      />
    </ImageBackground>
  );
};

export default SplashScreen;
