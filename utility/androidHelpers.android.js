// @flow

import { PermissionsAndroid, Platform } from "react-native";

const checkLocationPermissions = async (): Promise<boolean> => {
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

const checkCameraRollPermissions = async ( ): Promise<boolean> => {
  const retrieve =
    Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  try {
    const granted = await PermissionsAndroid.request( retrieve );
    if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
      return true;
    }
    return false;
  } catch ( err ) {
    return err;
  }
};

const checkCameraPermissions = async ( ): Promise<any> => {
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

const checkSavePermissions = async ( ): Promise<any> => {
  const { PERMISSIONS, RESULTS } = PermissionsAndroid;

  try {
    const granted = await PermissionsAndroid.request( PERMISSIONS.WRITE_EXTERNAL_STORAGE );

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
  checkCameraRollPermissions
};
