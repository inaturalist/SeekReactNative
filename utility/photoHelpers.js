import ImageResizer from "react-native-image-resizer"; // eslint-disable-line import/no-unresolved
import RNFS from "react-native-fs";
import { Platform } from "react-native";
import GalleryManager from "react-native-gallery-manager";
import Realm from "realm";

import realmConfig from "../models/index";
import { dirPictures } from "./dirStorage";
import i18n from "../i18n";
import { dimensions } from "../styles/global";
import { namePhotoByTime } from "./dateHelpers";
import { checkCameraRollPermissions } from "./androidHelpers.android";

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
  const timestamp = namePhotoByTime();
  const newImageName = `${timestamp}.jpg`;

  try {
    const resizedImage = await resizeImage( uri, dimensions.width, 250 );

    if ( resizedImage ) {
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

  try {
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
  } catch ( e ) {
    return albumNames;
  }
};

const moveFileAndUpdateRealm = ( uriString, photo, realm ) => {
  // how can I test that this is working???
  // if it doesn't I will accidentally delete all the thumbnails...
  const oldAndroidDir = `${RNFS.ExternalStorageDirectoryPath}/Seek/Pictures`;
  const oldFile = `${oldAndroidDir}/${uriString}`;
  const newFile = `${dirPictures}/${uriString}`;

  RNFS.moveFile( oldFile, newFile ).then( () => {
    realm.write( () => {
      photo.backupUri = newFile;
    } );
  } ).catch( ( e ) => console.log( e, "couldn't move backup uri to new filepath" ) );
};

const deleteFile = ( filepath ) => {
  RNFS.unlink( filepath ).then( () => {
    console.log( "unused backup filepath deleted: ", filepath );
  } ).catch( ( err ) => {
    console.log( err.message );
  } );
};

const updateDatabasePhotoUris = ( fileNames ) => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const databasePhotos = realm.objects( "PhotoRealm" );

      databasePhotos.forEach( ( photo ) => {
        const { backupUri } = photo;
        const uri = backupUri.split( "/Pictures/" ); // this will only move old external photos

        if ( uri.length === 1 ) { // this means backup can't be split by old directory
          return;
        }

        const uriString = uri[1].toString();

        if ( uriString && fileNames.includes( uriString ) ) {
          moveFileAndUpdateRealm( uriString, photo, realm );
        }
      } );
    } ).then( () => {
      const oldAndroidDir = `${RNFS.ExternalStorageDirectoryPath}/Seek/Pictures`;

      fileNames.forEach( ( file ) => {
        const oldFile = `${oldAndroidDir}/${file}`;
        deleteFile( oldFile );
      } );
    } ).catch( ( e ) => console.log( e, "error checking for database photos" ) );
};

const checkForExternalSeekDirectory = async ( dir ) => {
  try {
    const exists = await RNFS.stat( dir );
    if ( exists ) {
      return true;
    }
    return false;
  } catch ( e ) {
    console.log( e, "directory does not exist: ", dir );
    return false;
  }
};

const moveAndroidFilesToInternalStorage = async () => {
  const oldAndroidDir = `${RNFS.ExternalStorageDirectoryPath}/Seek/Pictures`;

  if ( Platform.OS === "android" ) {
    const dirExists = await checkForExternalSeekDirectory( oldAndroidDir );

    if ( dirExists ) {
      const permission = await checkCameraRollPermissions();
      if ( permission === true ) {
        RNFS.readDir( oldAndroidDir ).then( ( files ) => { // requires storage permissions
          const fileNames = files.map( file => file.name );
          updateDatabasePhotoUris( fileNames );
        } ).catch( ( e ) => console.log( "couldn't read external storage directory android", e ) );
      }
    }
  }
};

export {
  checkForPhotoMetaData,
  resizeImage,
  movePhotoToAppStorage,
  localizeAttributions,
  createBackupUri,
  getAlbumNames,
  moveAndroidFilesToInternalStorage,
  deleteFile
};
