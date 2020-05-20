// @flow strict-local

import React, { useState, useEffect } from "react";
import { I18nManager, Platform, YellowBox } from "react-native";
import * as RNLocalize from "react-native-localize";
import Geolocation from "@react-native-community/geolocation";
import QuickActions from "react-native-quick-actions";

import i18n from "../i18n";
import RootStack from "./Navigation/RootStack";
import { setupChallenges } from "../utility/challengeHelpers";
import { setupCommonNames } from "../utility/commonNamesHelpers";
import { addARCameraFiles } from "../utility/helpers";
import { fetchAccessToken } from "../utility/loginHelpers";
import { UserContext, ScientificNamesContext } from "./UserContext";
import { getScientificNames } from "../utility/settingsHelpers";

const setRTL = () => {
  if ( Platform.OS === "android" ) {
    return;
  }

  if ( i18n.locale === "he" ) {
    I18nManager.forceRTL( true );
  } else {
    I18nManager.forceRTL( false );
  }
};

setRTL();

const hideYellowWarnings = () => {
  YellowBox.ignoreWarnings( [
    "Picker has been extracted",
    "Failed prop type: Invalid prop `confidenceThreshold`",
    "Failed prop type: Invalid prop `taxaDetectionInterval`"
  ] );
};

const App = () => {
  const [login, setLogin] = useState( null );
  const [scientificNames, setScientificNames] = useState( false );

  const getLoggedIn = async () => setLogin( await fetchAccessToken() );
  const fetchScientificNames = async () => setScientificNames( await getScientificNames() );

  const toggleLogin = () => getLoggedIn();
  const toggleNames = () => fetchScientificNames();

  const userContextValue = { login, toggleLogin };
  const scientificNamesContextValue = { scientificNames, toggleNames };

  const handleLocalizationChange = () => {
    const fallback = { languageTag: "en" };
    const { languageTag } = RNLocalize.getLocales()[0] || fallback;

    i18n.locale = languageTag;
  };

  const setQuickActions = () => {
    QuickActions.setShortcutItems( [
      {
        type: "Seek AR Camera", // Required
        title: "Seek AR Camera", // Optional, if empty, `type` will be used instead
        subtitle: "For quick identifications",
        icon: "camerabutton", // Icons instructions below
        userInfo: {
          url: "app://Drawer/Main/Camera" // Provide any custom data like deep linking URL
        }
      }
    ] );
  };

  useEffect( () => {
    hideYellowWarnings();
    if ( Platform.OS === "android" ) {
      setQuickActions();
    }
    // do not wait for commonNames setup to complete. It could take a while to
    // add all names to Realm and we don't want to hold up the UI as names
    // are not needed immediately
    // console.log( new Date().getTime(), "start time for realm" );
    if ( global && global.location && global.location.pathname ) {
      if ( !global.location.pathname.includes( "debugger-ui" ) ) {
        // detect whether Chrome Debugger is open -- it can't run with so many Realm requests
        setTimeout( setupCommonNames, 5000 );
      }
    } else {
      setTimeout( setupCommonNames, 5000 );
    }
    getLoggedIn();
    fetchScientificNames();
    setTimeout( setupChallenges, 3000 );
    setTimeout( addARCameraFiles, 3000 );
    // setTimeout( regenerateBackupUris, 3000 ); // this was a temporary fix, shouldn't need anymore
    RNLocalize.addEventListener( "change", handleLocalizationChange );

    Geolocation.setRNConfiguration( { authorizationLevel: "whenInUse" } );

    return () => RNLocalize.removeEventListener( "change", handleLocalizationChange );
  }, [] );

  return (
    <UserContext.Provider value={userContextValue}>
      <ScientificNamesContext.Provider value={scientificNamesContextValue}>
        <RootStack />
      </ScientificNamesContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
