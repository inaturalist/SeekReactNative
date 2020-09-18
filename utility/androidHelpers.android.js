import { PermissionsAndroid } from "react-native";

const checkLocationPermissions = async () => {
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

const checkCameraRollPermissions = async () => {
  const save = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const retrieve = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  try {
    const granted = await PermissionsAndroid.requestMultiple( [
      save,
      retrieve
    ] );
    if ( granted[retrieve] === PermissionsAndroid.RESULTS.GRANTED ) {
      return true;
    }
    return JSON.stringify( granted );
  } catch ( err ) {
    return err;
  }
};

const requestAllCameraPermissions = async () => {
  const { PERMISSIONS, RESULTS } = PermissionsAndroid;

  const camera = PERMISSIONS.CAMERA;
  const cameraRollSave = PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const cameraRollRetrieve = PERMISSIONS.READ_EXTERNAL_STORAGE;

  try {
    const granted = await PermissionsAndroid.requestMultiple( [
      camera,
      cameraRollSave,
      cameraRollRetrieve
    ] );

    if ( granted[camera] !== RESULTS.GRANTED ) {
      return "permissions";
    } else if ( ( granted[cameraRollRetrieve] || granted[cameraRollSave] ) !== RESULTS.GRANTED ) {
      return "gallery";
    }
    return true;
  } catch ( e ) {
    return e;
  }
};

export {
  checkLocationPermissions,
  checkCameraRollPermissions,
  requestAllCameraPermissions
};
