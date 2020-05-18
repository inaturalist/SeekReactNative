import React, { useEffect, useCallback } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  DeviceEventEmitter
} from "react-native";
import { useNavigation, useLinkTo } from "@react-navigation/native";
import QuickActions from "react-native-quick-actions";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "../styles/splash";
import logoImages from "../assets/logos";
import backgrounds from "../assets/backgrounds";
import { checkIfFirstLaunch, setCameraLaunched } from "../utility/helpers";
import { deleteDebugLogAfter7Days } from "../utility/photoHelpers";
import { setupBadges } from "../utility/badgeHelpers";

const SplashScreen = () => {
  const linkTo = useLinkTo();
  const navigation = useNavigation();

  const resetRouter = useCallback( ( name ) => {
    setTimeout( () => navigation.reset( { routes: [{ name }] } ), 2000 );
  }, [navigation] );

  const checkForQuickAction = useCallback( () => {
    // this addresses hot starts (i.e. app is already open)
    DeviceEventEmitter.addListener( "quickActionShortcut", ( { title } ) => {
      if ( title === "Seek AR Camera" ) {
        linkTo( "/Drawer/Main/Camera/ARCamera?showWarning=true" );
      }
    } );

    // this addresses cold starts (i.e. before the app launches)
    QuickActions.popInitialAction().then( ( { title } ) => {
      if ( title === "Seek AR Camera" ) {
        navigation.navigate( "Drawer", {
          screen: "Main",
          params: {
            screen: "Camera"
          }
        } );
      } else {
        resetRouter( "Drawer" );
      }
    } ).catch( () => resetRouter( "Drawer" ) );
  }, [resetRouter, navigation, linkTo] );


  const removeUnusedKeys = async () => {
    const keys = ["drawer", "regenerated_backups", "observations", "observers", "scientific_names", "has_seen_login"];
    try {
      await AsyncStorage.multiRemove( keys );
    } catch ( e ) {
      // console.log( e, "error removing unnecessary keys" );
    }
  };

  useEffect( () => {
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
        removeUnusedKeys();
        checkForQuickAction();
      }
    };

    checkForNewUser();
  }, [navigation, checkForQuickAction, resetRouter] );

  return (
    <ImageBackground source={backgrounds.splash} style={styles.backgroundImage}>
      <Image source={logoImages.seek} style={styles.logo} />
      <Image source={logoImages.joint} style={styles.joint} />
    </ImageBackground>
  );
};

export default SplashScreen;
