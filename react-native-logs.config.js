import {
  logger,
  fileAsyncTransport,
  consoleTransport
} from "react-native-logs";
import RNFS from "react-native-fs";
import { fileNameLogs } from "./utility/dirStorage";

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

export { log };
