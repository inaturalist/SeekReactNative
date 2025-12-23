import { PermissionsAndroid, Platform } from "react-native";

const checkLocationPermissions = async ( ): Promise<boolean> => {
  const location = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

  try {
    const granted = await PermissionsAndroid.request( location );
    if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
      return true;
    }
    return false;
  } catch ( err ) {
    return err;
  }
};

const checkCameraPermissions = async ( ): Promise<boolean | string> => {
  const { PERMISSIONS, RESULTS } = PermissionsAndroid;

  try {
    const granted = await PermissionsAndroid.request( PERMISSIONS.CAMERA );

    if ( granted === RESULTS.GRANTED ) {
      return true;
    }
    return "permissions";
  } catch ( e ) {
    return e;
  }
};

const checkSavePermissions = async ( ): Promise<boolean | string> => {
  const { PERMISSIONS, RESULTS } = PermissionsAndroid;

  const usesAndroid10Permissions = Platform.OS === "android" && Platform.Version <= 29;

  try {
    let granted;
    // Check for Android SDK version, if higher than 29, request READ_MEDIA_IMAGES instead
    if ( usesAndroid10Permissions ) {
      granted = await PermissionsAndroid.request( PERMISSIONS.WRITE_EXTERNAL_STORAGE );
    } else {
      granted = await PermissionsAndroid.request( PERMISSIONS.READ_MEDIA_IMAGES );
    }
    if ( granted === RESULTS.GRANTED ) {
      return true;
    }
    return "gallery";
  } catch ( e ) {
    return e;
  }
};

export {
  checkCameraPermissions,
  checkLocationPermissions,
  checkSavePermissions,
};
