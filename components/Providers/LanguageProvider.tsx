import * as React from "react";
import { AppState } from "react-native";

import { handleLocalizationChange, loadUserLanguagePreference } from "../../utility/languageHelpers";
import { getLanguage } from "../../utility/settingsHelpers";

const LanguageContext = React.createContext<
  {
    toggleLanguagePreference: () => void;
    preferredLanguage: string;
  } | undefined
>( undefined );

type LanguageProviderProps = {children: React.ReactNode}
const LanguageProvider = ( { children }: LanguageProviderProps ) => {
  const [preferredLanguage, setLanguage] = React.useState<string | null>( null );

  const getLanguagePreference = async ( ) => setLanguage( await getLanguage( ) );
  const toggleLanguagePreference = ( ) => getLanguagePreference( );

  React.useEffect( ( ) => {
    // wait until check for stored language is completed
    if ( !preferredLanguage ) { return; }
    loadUserLanguagePreference( preferredLanguage );
  }, [preferredLanguage] );

  React.useEffect( ( ) => {
    getLanguagePreference( );
    AppState.addEventListener( "change", handleLocalizationChange );

    return ( ) => AppState.removeEventListener( "change", handleLocalizationChange );
  }, [] );

  const value = {
    toggleLanguagePreference,
    preferredLanguage
  };
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

function useLanguage() {
  const context = React.useContext( LanguageContext );
  if ( context === undefined ) {
    throw new Error( "useLanguage must be used within a LanguageProvider" );
  }
  return context;
}

export {
  LanguageProvider,
  useLanguage
};
