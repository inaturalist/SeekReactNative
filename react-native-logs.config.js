import * as RNFS from "@dr.pogodin/react-native-fs";
import {
  consoleTransport,
  fileAsyncTransport,
  logger,
} from "react-native-logs";

import { pathLogs } from "./utility/dirStorage";

// before introducing {date-today} rolling logs, we had a single logfile
// kept as a code reference so cleanup can delete leftover files on update
export const legacyLogfilePath = pathLogs;

export const logFileNamePrefix = "seek-log";
const logFileName = `${logFileNamePrefix}.{date-today}.txt`;

export const logFileDirectory = `${RNFS.DocumentDirectoryPath}/logs`;

RNFS.exists( logFileDirectory ).then( exists => ( exists
  ? Promise.resolve()
  : RNFS.mkdir( logFileDirectory ) ) );

// Configure without transport for test. If you want to write output during
// tests, use console.log
const transport = [];
if ( process?.env?.NODE_ENV !== "test" ) {
  transport.push( consoleTransport );
  transport.push( fileAsyncTransport );
}

const config = {
  transport,
  dateFormat: "iso",
  severity: __DEV__
    ? "debug"
    : "info",
  transportOptions: {
    FS: RNFS,
    fileName: logFileName,
    filePath: logFileDirectory,
    // logname.{date-today}.txt => logname.2026-3-11.txt (note, no padded 0)
    fileNameDateType: "iso",
  },
};

const log = logger.createLogger( config );

export { log };
