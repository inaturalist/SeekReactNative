// @flow
import { Platform } from "react-native";

import { writeToDebugLog } from "./photoHelpers";

const handleLog = ( event: { nativeEvent: { log: string } } ) => {
  if ( Platform.OS === "android" ) {
    writeToDebugLog( event.nativeEvent.log );
  }
};

export {
  handleLog
};
