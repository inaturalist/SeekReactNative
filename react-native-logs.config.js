import { Platform } from "react-native";
import {
  logger,
  fileAsyncTransport,
  consoleTransport
} from "react-native-logs";
import RNFS from "react-native-fs";
import { dirDebugLogs, fileNameLogs } from "./utility/dirStorage";

// Configure without transport for test. If you want to write output during
// tests, use console.log
const transport = [];
if ( process?.env?.NODE_ENV !== "test" ) {
  transport.push( consoleTransport );
  transport.push( fileAsyncTransport );
}

const config = {
  transport,
  transportOptions: {
    FS: RNFS,
    fileName: fileNameLogs
  }
};

const log = logger.createLogger( config );

const configIOS = {
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
const LOG =
  Platform.OS === "ios"
    ? logger.createLogger( configIOS )
    : logger.createLogger( androidConfig );

export { LOG, log };
