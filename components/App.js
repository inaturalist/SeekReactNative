// @flow

import React, { useState, useEffect } from "react";
import * as RNLocalize from "react-native-localize";
import type { Node } from "react";

import RootStack from "./Navigation/RootStack";
import { checkINatAdminStatus, setupChallenges } from "../utility/challengeHelpers";
import { handleLocalizationChange, loadUserLanguagePreference } from "../utility/languageHelpers";
import { addARCameraFiles, hideLogs } from "../utility/helpers";
import { fetchAccessToken, savePostingSuccess } from "../utility/loginHelpers";
import { UserContext, LanguageContext } from "./UserContext";
import { getLanguage, setupUserSettings } from "../utility/settingsHelpers";
import { setQuickActions } from "../utility/navigationHelpers";

const App = ( ): Node => {
  const [login, setLogin] = useState( null );
  const [preferredLanguage, setLanguage] = useState( null );

  const getLoggedIn = async ( ) => {
    const token = await fetchAccessToken( );

    if ( !token ) {
      setupChallenges( false );
    } else {
      const isAdmin = await checkINatAdminStatus( token );
      setupChallenges( isAdmin );
    }
    setLogin( token );
  };
  const getLanguagePreference = async () => setLanguage( await getLanguage() );

  const toggleLogin = () => getLoggedIn();
  const toggleLanguagePreference = () => getLanguagePreference();

  const userContextValue = { login, toggleLogin };
  const languageValue = { preferredLanguage, toggleLanguagePreference };

  useEffect( () => {
    // wait until check for stored language is completed
    if ( !preferredLanguage ) { return; }
    loadUserLanguagePreference( preferredLanguage );
  }, [preferredLanguage] );

  useEffect( () => {
    hideLogs();
    setQuickActions();
    // testing
    setupUserSettings( );

    // Context
    getLoggedIn();
    getLanguagePreference();

    // reset posting to iNat
    savePostingSuccess( false );

    setTimeout( addARCameraFiles, 3000 );

    RNLocalize.addEventListener( "change", handleLocalizationChange );

    return () => RNLocalize.removeEventListener( "change", handleLocalizationChange );
  }, [] );

  return (
    <UserContext.Provider value={userContextValue}>
      <LanguageContext.Provider value={languageValue}>
        <RootStack />
      </LanguageContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
