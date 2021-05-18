// @flow

import React, { useState, useEffect } from "react";
import * as RNLocalize from "react-native-localize";
import type { Node } from "react";

import RootStack from "./Navigation/RootStack";
import { handleLocalizationChange, loadUserLanguagePreference } from "../utility/languageHelpers";
import { hideLogs } from "../utility/helpers";
import { LanguageContext, ObservationContext } from "./UserContext";
import { getLanguage } from "../utility/settingsHelpers";
import SpeciesNearbyProvider from "./SpeciesNearbyProvider";
import UserLoginProvider from "./UserLoginProvider";

const App = ( ): Node => {
  const [preferredLanguage, setLanguage] = useState( null );
  const [observation, setObservation] = useState( null );

  const getLanguagePreference = async ( ) => setLanguage( await getLanguage( ) );
  const toggleLanguagePreference = ( ) => getLanguagePreference( );

  const languageValue = { preferredLanguage, toggleLanguagePreference };
  const observationValue = { observation, setObservation };

  useEffect( ( ) => {
    // wait until check for stored language is completed
    if ( !preferredLanguage ) { return; }
    loadUserLanguagePreference( preferredLanguage );
  }, [preferredLanguage] );

  useEffect( ( ) => {
    hideLogs( );

    // Context
    getLanguagePreference( );

    RNLocalize.addEventListener( "change", handleLocalizationChange );

    return ( ) => RNLocalize.removeEventListener( "change", handleLocalizationChange );
  }, [] );

  return (
    <UserLoginProvider>
      <LanguageContext.Provider value={languageValue}>
        <ObservationContext.Provider value={observationValue}>
          <SpeciesNearbyProvider>
            <RootStack />
          </SpeciesNearbyProvider>
        </ObservationContext.Provider>
      </LanguageContext.Provider>
    </UserLoginProvider>
  );
};

export default App;
