import { PermissionsAndroid, Platform } from "react-native";

const { ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION } = PermissionsAndroid.PERMISSIONS;

const onlyCheckLocationPermissions = async ( ): Promise<boolean> => {
  try {
    // On Android 12+ the user may grant only approximate (coarse) location,
    // leaving fine location denied. Either is sufficient for our use cases.
    const fine = await PermissionsAndroid.check( ACCESS_FINE_LOCATION );
    if ( fine ) return true;
    return await PermissionsAndroid.check( ACCESS_COARSE_LOCATION );
  } catch ( err ) {
    return err;
  }
};

const checkLocationPermissions = async ( ): Promise<boolean> => {
  try {
    const results = await PermissionsAndroid.requestMultiple( [
      ACCESS_FINE_LOCATION,
      ACCESS_COARSE_LOCATION,
    ] );
    const { GRANTED } = PermissionsAndroid.RESULTS;
    return (
      results[ACCESS_FINE_LOCATION] === GRANTED
      || results[ACCESS_COARSE_LOCATION] === GRANTED
    );
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
  onlyCheckLocationPermissions,
};
