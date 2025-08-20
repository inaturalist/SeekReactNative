import React, { useEffect } from "react";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from "react-native-exception-handler";
import {
  getVersion,
  getBuildNumber
} from "react-native-device-info";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootStack from "./Navigation/RootStack";
import { hideLogs } from "../utility/helpers";
import { LanguageProvider } from "./Providers/LanguageProvider";
import { SpeciesNearbyProvider } from "./Providers/SpeciesNearbyProvider";
import UserLoginProvider from "./Providers/UserLoginProvider";
import { ObservationProvider } from "./Providers/ObservationProvider";
import { AppOrientationProvider } from "./Providers/AppOrientationProvider";
import { ChallengeProvider } from "./Providers/ChallengeProvider";
import { SpeciesDetailProvider } from "./Providers/SpeciesDetailProvider";
import { log } from "../react-native-logs.config";
import { LogLevels, logToApi } from "../utility/apiCalls";
import ErrorBoundary from "./ErrorBoundary";

const logger = log.extend( "App.tsx" );

const jsErrorHandler = ( e, isFatal ) => {
  // not 100% sure why jsErrorHandler logs e.name and e.message as undefined sometimes,
  // but I believe it relates to this issue, which reports an unnecessary console.error
  // under the hood: https://github.com/a7ul/react-native-exception-handler/issues/143

  // possibly also related to error boundaries in React 16+:
  // https://github.com/a7ul/react-native-exception-handler/issues/60
  // if ( !e.name && !e.message ) {return;}
    if ( isFatal ) {
      logger.error( "Fatal JS Error: ", e.stack );
      logToApi( {
        level: LogLevels.ERROR,
        context: "App.tsx",
        message: e.message,
        errorType: e.constructor?.name,
        backtrace: e.stack
      } );
    } else {
      // This should get logged by ErrorBoundary. For some reason this handler
      // gets called too, so we don't want to double-report errors
    }

};

// record JS exceptions
setJSExceptionHandler( jsErrorHandler, true );

// record native exceptions
// only works in bundled mode; will show red screen in dev mode
// tested this by raising an exception in RNGestureHandler.m
// https://stackoverflow.com/questions/63270492/how-to-raise-native-error-in-react-native-app
setNativeExceptionHandler(
  async ( exceptionString ) => {
    try {
      logToApi( {
        level: LogLevels.ERROR,
        message: exceptionString,
        context: "App.tsx",
        errorType: "native"
      } );
      logger.error( `Native Error: ${exceptionString}` );
    } catch ( e ) {
      // Last-ditch attempt to log something
      logger.error(
        `Native Error: ${exceptionString} (failed to save context)`,
        e
      );
    }
  },
  true, // Force quit the app to prevent zombie states
  true // Enable on iOS
);

const style = { flex: 1 } as const;

const App = ( ) => {
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
                  <GestureHandlerRootView style={style}>
                    <SafeAreaProvider>
                      <ErrorBoundary>
                        <RootStack />
                      </ErrorBoundary>
                    </SafeAreaProvider>
                  </GestureHandlerRootView>
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
