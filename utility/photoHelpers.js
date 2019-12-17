import ImageResizer from "react-native-image-resizer";
import moment from "moment";
import RNFS from "react-native-fs";

import { dirPictures } from "./dirStorage";
import i18n from "../i18n";
import { dimensions } from "../styles/global";

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

const resizeImage = ( imageUri, width, height ) => (
  new Promise( ( resolve ) => {
    ImageResizer.createResizedImage( imageUri, width, height || width, "JPEG", 100 )
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

const movePhotoToAppStorage = async ( filePath, newFilepath ) => (
  new Promise( ( resolve ) => {
    RNFS.mkdir( dirPictures )
      .then( () => {
        RNFS.moveFile( filePath, newFilepath )
          .then( () => {
            resolve( true );
          } )
          .catch( ( error ) => {
            console.log( error, "starts with error 1" );
            resolve( error );
          } );
      } ).catch( ( err ) => {
        console.log( err, "starts with error 2" );
        resolve( err );
      } );
  } )
);

const localizeAttributions = ( attribution, licenseCode, screen ) => {
  const userName = attribution.split( "," )[0];
  const name = userName.split( ") " )[1];

  let licenseText;

  if ( licenseCode === "cc0" ) {
    licenseText = i18n.t( "attributions.all" );
  } else {
    licenseText = i18n.t( "attributions.some" );
  }

  if ( screen === "iNatStats" ) {
    return `${name} · ${licenseText} (${licenseCode.toUpperCase()})`;
  }

  return `${userName} ${licenseText} (${licenseCode.toUpperCase()})`;
};

const createBackupUri = async ( uri ) => {
  try {
    const resizedImage = await resizeImage( uri, dimensions.width, 250 );

    if ( resizedImage ) {
      const newImageName = `${moment().format( "DDMMYY_HHmmSSS" )}.jpg`;
      const backupFilepath = `${dirPictures}/${newImageName}`;
      const imageMoved = await movePhotoToAppStorage( resizedImage, backupFilepath );
      if ( imageMoved ) {
        return backupFilepath;
      }
      return null;
    }
    return null;
  } catch ( e ) {
    console.log( e, "couldn't resize image" );
    return null;
  }
};

export {
  checkCameraRollPermissions,
  checkForPhotoMetaData,
  resizeImage,
  movePhotoToAppStorage,
  localizeAttributions,
  createBackupUri
};
