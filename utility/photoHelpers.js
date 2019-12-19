import ImageResizer from "react-native-image-resizer"; // eslint-disable-line import/no-unresolved
import moment from "moment";
import RNFS from "react-native-fs";
import { Platform } from "react-native";
import GalleryManager from "react-native-gallery-manager";

import { dirPictures } from "./dirStorage";
import i18n from "../i18n";
import { dimensions } from "../styles/global";

const checkForPhotoMetaData = ( location ) => {
  if ( location ) {
    if ( Object.keys( location ).length !== 0 && location.latitude ) {
      return true;
    }
    return false;
  }
  return false;
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

const getAlbumNames = async () => {
  const albumNames = [{
    label: i18n.t( "gallery.camera_roll" ),
    value: "All"
  }];

  const { albums } = await GalleryManager.getAlbums();

  if ( albums && albums.length > 0 ) { // attempt to fix error on android
    albums.forEach( ( album ) => {
      const { assetCount, title } = album;

      if ( assetCount > 0 && title !== "Screenshots" ) { // remove screenshots from gallery
        albumNames.push( {
          label: title,
          value: title
        } );
      }
    } );
  }

  return albumNames;
};

export {
  checkForPhotoMetaData,
  resizeImage,
  movePhotoToAppStorage,
  localizeAttributions,
  createBackupUri,
  getAlbumNames
};
