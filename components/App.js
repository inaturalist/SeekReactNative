// @flow

import React, { useState, useEffect } from "react";
import * as RNLocalize from "react-native-localize";

import RootStack from "./Navigation/RootStack";
import { setupChallenges } from "../utility/challengeHelpers";
import { handleLocalizationChange, setSeekAndCommonNamesLanguage } from "../utility/languageHelpers";
import { addARCameraFiles, hideLogs, setQuickActions } from "../utility/helpers";
import { fetchAccessToken } from "../utility/loginHelpers";
import { UserContext, CameraContext, LanguageContext, SpeciesDetailContext } from "./UserContext";
import { getScientificNames, getLanguage, getAutoCapture, getSeasonality } from "../utility/settingsHelpers";

const App = () => {
  const [login, setLogin] = useState( null );
  const [scientificNames, setScientificNames] = useState( false );
  const [preferredLanguage, setLanguage] = useState( null );
  const [autoCapture, setAutoCapture] = useState( false );
  const [localSeasonality, setLocalSeasonality] = useState( false );

  const getLoggedIn = async () => setLogin( await fetchAccessToken() );
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
    setSeekAndCommonNamesLanguage( preferredLanguage );
  }, [preferredLanguage] );

  useEffect( () => {
    hideLogs();
    setQuickActions();

    // Context
    getLoggedIn();
    fetchScientificNames();
    getLanguagePreference();
    fetchAutoCapture();
    fetchLocalSeasonality();

    setTimeout( setupChallenges, 3000 );
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
