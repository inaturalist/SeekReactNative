// @flow

import React, { useState, useEffect } from "react";
import * as RNLocalize from "react-native-localize";
import type { Node } from "react";

import RootStack from "./Navigation/RootStack";
import { handleLocalizationChange, loadUserLanguagePreference } from "../utility/languageHelpers";
import { hideLogs } from "../utility/helpers";
import { LanguageContext } from "./UserContext";
import { getLanguage } from "../utility/settingsHelpers";
import SpeciesNearbyProvider from "./Providers/SpeciesNearbyProvider";
import UserLoginProvider from "./Providers/UserLoginProvider";
import ObservationProvider from "./Providers/ObservationProvider";

const App = ( ): Node => {
  const [preferredLanguage, setLanguage] = useState( null );

  const getLanguagePreference = async ( ) => setLanguage( await getLanguage( ) );
  const toggleLanguagePreference = ( ) => getLanguagePreference( );

  const languageValue = { preferredLanguage, toggleLanguagePreference };

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
        <ObservationProvider>
          <SpeciesNearbyProvider>
            <RootStack />
          </SpeciesNearbyProvider>
        </ObservationProvider>
      </LanguageContext.Provider>
    </UserLoginProvider>
  );
};

export default App;
