// @flow strict-local

import React, { useState, useEffect } from "react";
import { I18nManager, Platform } from "react-native";
import * as RNLocalize from "react-native-localize";
import Geolocation from "@react-native-community/geolocation";

import i18n from "../i18n";
import RootStack from "./Navigation/RootStack";
import { setupChallenges } from "../utility/challengeHelpers";
import { setupCommonNames } from "../utility/commonNamesHelpers";
import { addARCameraFiles } from "../utility/helpers";
import { fetchAccessToken } from "../utility/loginHelpers";
import { UserContext, ScientificNamesContext } from "./UserContext";
import { getScientificNames } from "../utility/settingsHelpers";

const App = () => {
  const [login, setLogin] = useState( null );
  const [scientificNames, setScientificNames] = useState( false );

  const getLoggedIn = async () => setLogin( await fetchAccessToken() );
  const fetchScientificNames = async () => setScientificNames( await getScientificNames() );

  const toggleLogin = () => getLoggedIn();
  const toggleNames = () => fetchScientificNames();

  const userContextValue = { login, toggleLogin };
  const scientificNamesContextValue = { scientificNames, toggleNames };

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

  const handleLocalizationChange = () => {
    console.log( "handling localization change" );
    const fallback = { languageTag: "en" };
    const { languageTag } = RNLocalize.getLocales()[0] || fallback;

    i18n.locale = languageTag;
    console.log( "setting RTL in detect locale change", i18n.locale );
    setRTL();
  };

  useEffect( () => {
    RNLocalize.addEventListener( "change", handleLocalizationChange );
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

    console.log( "setting RTL in app start", i18n.locale );
    setRTL();
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
