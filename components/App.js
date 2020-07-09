// @flow

import React, { useState, useEffect } from "react";
import { I18nManager, Platform, YellowBox } from "react-native";
import * as RNLocalize from "react-native-localize";
import QuickActions from "react-native-quick-actions";

import i18n from "../i18n";
import RootStack from "./Navigation/RootStack";
import { setupChallenges } from "../utility/challengeHelpers";
import { setupCommonNames } from "../utility/commonNamesHelpers";
import { addARCameraFiles } from "../utility/helpers";
import { fetchAccessToken } from "../utility/loginHelpers";
import { UserContext, CameraContext, LanguageContext } from "./UserContext";
import { getScientificNames, getLanguage, getAutoCapture } from "../utility/settingsHelpers";

const setRTL = ( locale ) => {
  if ( Platform.OS === "android" ) {
    return;
  }

  if ( locale === "he" || locale === "ar" ) {
    I18nManager.forceRTL( true );
  } else {
    I18nManager.forceRTL( false );
  }
};

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
  const [preferredLanguage, setLanguage] = useState( null );
  const [autoCapture, setAutoCapture] = useState( false );

  const getLoggedIn = async () => setLogin( await fetchAccessToken() );
  const fetchScientificNames = async () => setScientificNames( await getScientificNames() );
  const getLanguagePreference = async () => setLanguage( await getLanguage() );
  const fetchAutoCapture = async () => setAutoCapture( await getAutoCapture() );

  const toggleLogin = () => getLoggedIn();
  const toggleNames = () => fetchScientificNames();
  const toggleLanguagePreference = () => getLanguagePreference();
  const toggleAutoCapture = () => fetchAutoCapture();

  const userContextValue = { login, toggleLogin };
  const CameraContextValue = {
    scientificNames,
    toggleNames,
    autoCapture,
    toggleAutoCapture
  };
  const languageValue = { preferredLanguage, toggleLanguagePreference };

  const handleLocalizationChange = () => {
    const fallback = { languageTag: "en" };
    const { languageTag } = RNLocalize.getLocales()[0] || fallback;

    i18n.locale = languageTag;
    setRTL( languageTag );
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
    // wait until check for stored language is completed
    if ( !preferredLanguage ) {
      return;
    }

    // do not wait for commonNames setup to complete. It could take a while to
    // add all names to Realm and we don't want to hold up the UI as names
    // are not needed immediately
    if ( preferredLanguage !== "device" ) {
      i18n.locale = preferredLanguage;
      setRTL( preferredLanguage );
      setTimeout( () => setupCommonNames( preferredLanguage ), 5000 );
    } else {
      handleLocalizationChange();
      setTimeout( () => setupCommonNames( preferredLanguage ), 5000 );
    }
  }, [preferredLanguage] );

  useEffect( () => {
    hideYellowWarnings();
    if ( Platform.OS === "android" ) {
      setQuickActions();
    }
    // console.log( new Date().getTime(), "start time for realm" );
    getLoggedIn();
    fetchScientificNames();
    getLanguagePreference();
    fetchAutoCapture();
    setTimeout( setupChallenges, 3000 );
    setTimeout( addARCameraFiles, 3000 );

    RNLocalize.addEventListener( "change", handleLocalizationChange );
    // setTimeout( regenerateBackupUris, 3000 ); // this was a temporary fix, shouldn't need anymore

    // Geolocation.setRNConfiguration( { authorizationLevel: "whenInUse" } );
    // I don't think this line was doing anything anyway

    return () => RNLocalize.removeEventListener( "change", handleLocalizationChange );
  }, [] );

  return (
    <UserContext.Provider value={userContextValue}>
      <CameraContext.Provider value={CameraContextValue}>
        <LanguageContext.Provider value={languageValue}>
          <RootStack />
        </LanguageContext.Provider>
      </CameraContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
