// @flow

import { Platform } from "react-native";
import { logger, fileAsyncTransport, consoleTransport } from "react-native-logs";
import RNFS from "react-native-fs";
import { dirDebugLogs } from "./dirStorage";

// using this to help me see what's actually going into the log file

// RNFS.readDir( RNFS.DocumentDirectoryPath ).then( ( results => {
//   results.forEach( result => {
//     if ( result.name === "log.txt" ) {
//       // console.log( result.name, "result" );
//       RNFS.readFile( `${dirDebugLogs}/log` ).then( fileContent => {
//         console.log( fileContent, "content" );
//       } );
//     }
//   } );
// } ) );

const config = {
  severity: "debug",
  transport: __DEV__ ? consoleTransport : fileAsyncTransport,
  transportOptions: {
    colors: "ansi",
    FS: RNFS,
    filePath: dirDebugLogs,
    fileName: "log.txt"
  }
};

// This will block all the logs in production, but not the errors, so the app performance will not be affected.
// This will also change the transport: print to console in development and save to file in production.
// Since we're not using LOG.error anywhere this shouldn't log anything on Android
const androidConfig = {
  transport: __DEV__ ? consoleTransport : fileAsyncTransport,
  severity: __DEV__ ? "debug" : "error",
  transportOptions: {
    colors: "ansi",
    FS: RNFS
  }
};

// $FlowFixMe
const LOG = Platform.OS === "ios" ? logger.createLogger( config ) : logger.createLogger( androidConfig );

export { LOG };
