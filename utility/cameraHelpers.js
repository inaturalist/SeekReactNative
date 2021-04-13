// @flow
import { Platform, Alert } from "react-native";
import { getSystemVersion, getSystemAvailableFeatures } from "react-native-device-info";

import { writeToDebugLog, checkPhotoSize } from "./photoHelpers";
import i18n from "../i18n";

const handleLog = ( event: { nativeEvent: { log: string } } ) => {
  if ( Platform.OS === "android" ) {
    writeToDebugLog( event.nativeEvent.log );
  }
};

const showCameraSaveFailureAlert = async ( e: string, uri: string ) => {
  const size = await checkPhotoSize( uri );
  Alert.alert(
    i18n.t( "social.error_title" ),
    `${i18n.t( "camera.error_save" )} ${e}. \nPhoto size is: ${size}`
  );
};

const checkForSystemVersion = ( ): string => {
  if ( Platform.OS === "ios" ) {
    const OS = getSystemVersion( );
    return i18n.t( "camera.error_version", { OS } );
  }
  return "";
};

const checkForCameraAPIAndroid = async ( ): Promise<?string> => {
  if ( Platform.OS === "android" ) {
    const features = await getSystemAvailableFeatures( );
    if ( features.includes( "android.hardware.camera" ) ) {
      return "back";
    } else if ( features.includes( "android.hardware.camera.front" ) ) {
      return "front";
    } else {
      return null;
    }
  }
};

export {
  handleLog,
  showCameraSaveFailureAlert,
  checkForSystemVersion,
  checkForCameraAPIAndroid
};
