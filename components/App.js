// @flow

import React, { useEffect } from "react";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from "react-native-exception-handler";
import { getVersion, getBuildNumber } from "react-native-device-info";
import type { Node } from "react";

import RootStack from "./Navigation/RootStack";
import { hideLogs } from "../utility/helpers";
import { LanguageProvider } from "./Providers/LanguageContext";
import SpeciesNearbyProvider from "./Providers/SpeciesNearbyProvider";
import UserLoginProvider from "./Providers/UserLoginProvider";
import ObservationProvider from "./Providers/ObservationProvider";
import { AppOrientationProvider } from "./Providers/AppOrientationContext";
import ChallengeProvider from "./Providers/ChallengeProvider";
import SpeciesDetailProvider from "./Providers/SpeciesDetailProvider";
import { log } from "../react-native-logs.config";

const logger = log.extend( "App.js" );

const jsErrorHandler = ( e, isFatal ) => {
  // not 100% sure why jsErrorHandler logs e.name and e.message as undefined sometimes,
  // but I believe it relates to this issue, which reports an unnecessary console.error
  // under the hood: https://github.com/a7ul/react-native-exception-handler/issues/143

  // possibly also related to error boundaries in React 16+:
  // https://github.com/a7ul/react-native-exception-handler/issues/60
  if ( !e.name && !e.message ) {return;}
  logger.error( `JS Error: ${isFatal ? "Fatal:" : ""} ${e.stack}` );
};

// record JS exceptions
setJSExceptionHandler( jsErrorHandler, true );

// record native exceptions
// only works in bundled mode; will show red screen in dev mode
// tested this by raising an exception in RNGestureHandler.m
// https://stackoverflow.com/questions/63270492/how-to-raise-native-error-in-react-native-app
setNativeExceptionHandler( exceptionString => {
  logger.error( `Native Error: ${exceptionString}` );
} );

const App = ( ): Node => {
  useEffect( () => {
    hideLogs( );
    logger.info( `App start. Version: ${getVersion()} Build: ${getBuildNumber()}` );
  }, [] );

  return (
    <AppOrientationProvider>
      <UserLoginProvider>
        <LanguageProvider>
          <ObservationProvider>
            <SpeciesNearbyProvider>
              <ChallengeProvider>
                <SpeciesDetailProvider>
                  <RootStack />
                </SpeciesDetailProvider>
              </ChallengeProvider>
            </SpeciesNearbyProvider>
          </ObservationProvider>
        </LanguageProvider>
      </UserLoginProvider>
    </AppOrientationProvider>
  );
};

export default App;
