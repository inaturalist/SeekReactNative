// @flow
import { Platform, Alert } from "react-native";

import { writeToDebugLog } from "./photoHelpers";
import i18n from "../i18n";

const handleLog = ( event: { nativeEvent: { log: string } } ) => {
  if ( Platform.OS === "android" ) {
    writeToDebugLog( event.nativeEvent.log );
  }
};

const showCameraSaveFailureAlert = ( e: string ) => {
  Alert.alert(
    i18n.t( "social.error_title" ),
    `${i18n.t( "camera.error_save" )} ${e}`
  );
};

export {
  handleLog,
  showCameraSaveFailureAlert
};
