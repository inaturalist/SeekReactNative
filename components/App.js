// @flow

import React, { useState, useEffect } from "react";
import * as RNLocalize from "react-native-localize";

import RootStack from "./Navigation/RootStack";
import { checkINatAdminStatus, setupChallenges } from "../utility/challengeHelpers";
import { handleLocalizationChange, loadUserLanguagePreference } from "../utility/languageHelpers";
import { addARCameraFiles, hideLogs } from "../utility/helpers";
import { fetchAccessToken, savePostingSuccess } from "../utility/loginHelpers";
import { UserContext, CameraContext, LanguageContext, SpeciesDetailContext } from "./UserContext";
import { getScientificNames, getLanguage, getAutoCapture, getSeasonality, setupUserSettings } from "../utility/settingsHelpers";
import { setQuickActions } from "../utility/navigationHelpers";

const App = ( ) => {
  const [login, setLogin] = useState( null );
  const [scientificNames, setScientificNames] = useState( false );
  const [preferredLanguage, setLanguage] = useState( null );
  const [autoCapture, setAutoCapture] = useState( false );
  const [localSeasonality, setLocalSeasonality] = useState( false );

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
  const fetchScientificNames = async () => setScientificNames( await getScientificNames() );
  const getLanguagePreference = async () => setLanguage( await getLanguage() );
  const fetchAutoCapture = async () => setAutoCapture( await getAutoCapture() );
  const fetchLocalSeasonality = async () => setLocalSeasonality( await getSeasonality() );

  const toggleLogin = () => getLoggedIn();
  const toggleNames = () => fetchScientificNames();
  const toggleLanguagePreference = () => getLanguagePreference();
  const toggleAutoCapture = () => fetchAutoCapture();
  const toggleLocalSeasonality = () => fetchLocalSeasonality();

  const userContextValue = { login, toggleLogin };
  const CameraContextValue = {
    scientificNames,
    toggleNames,
    autoCapture,
    toggleAutoCapture
  };
  const languageValue = { preferredLanguage, toggleLanguagePreference };
  const seasonalityValue = { localSeasonality, toggleLocalSeasonality };

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
    fetchScientificNames();
    getLanguagePreference();
    fetchAutoCapture();
    fetchLocalSeasonality();

    // reset posting to iNat
    savePostingSuccess( false );

    setTimeout( addARCameraFiles, 3000 );

    RNLocalize.addEventListener( "change", handleLocalizationChange );

    return () => RNLocalize.removeEventListener( "change", handleLocalizationChange );
  }, [] );

  return (
    <UserContext.Provider value={userContextValue}>
      <CameraContext.Provider value={CameraContextValue}>
        <LanguageContext.Provider value={languageValue}>
          <SpeciesDetailContext.Provider value={seasonalityValue}>
            <RootStack />
          </SpeciesDetailContext.Provider>
        </LanguageContext.Provider>
      </CameraContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
