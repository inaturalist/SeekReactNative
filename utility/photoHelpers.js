import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";

const { PermissionsAndroid, Platform } = require( "react-native" );

const checkForPhotoMetaData = ( location ) => {
  if ( location ) {
    if ( Object.keys( location ).length !== 0 && location.latitude ) {
      return true;
    }
    return false;
  }
  return false;
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

const resizeImage = ( imageUri, size ) => (
  new Promise( ( resolve ) => {
    ImageResizer.createResizedImage( imageUri, size, size, "JPEG", 80 )
      .then( ( { uri } ) => {
        let userImage;
        if ( Platform.OS === "ios" ) {
          const uriParts = uri.split( "://" );
          userImage = uriParts[uriParts.length - 1];
          resolve( userImage );
        } else {
          resolve( uri );
        }
      } ).catch( () => {
        resolve( null );
      } );
  } )
);

export {
  checkCameraRollPermissions,
  checkForPhotoMetaData,
  resizeImage
};
