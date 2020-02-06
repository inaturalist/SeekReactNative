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
import { writeToDebugLog } from "./helpers";

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
    RNFS.mkdir( dirPictures ) // doesn't throw error if directory already exists
      .then( () => {
        RNFS.moveFile( filePath, newFilepath )
          .then( () => {
            resolve( true );
          } ).catch( ( error ) => {
            resolve( `${error} : error moving file from ${filePath} to: ${newFilepath}` );
          } );
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

const createBackupUri = async ( uri, uuid ) => {
  let newImageName;

  const timestamp = namePhotoByTime();

  if ( uuid ) {
    newImageName = `${uuid}.jpg`;
  } else {
    newImageName = `${timestamp}.jpg`;
  }

  try {
    const resizedImage = await resizeImage( uri, dimensions.width, 250 ); // stored in cache

    if ( resizedImage ) {
      const backupFilepath = `${dirPictures}/${newImageName}`; // stored in document directory
      const imageMoved = await movePhotoToAppStorage( resizedImage, backupFilepath );
      if ( imageMoved ) {
        console.log( imageMoved );
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

const moveFileAndUpdateRealm = async ( timestamp, photo, realm ) => {
  const oldAndroidDir = `${RNFS.ExternalStorageDirectoryPath}/Seek/Pictures`;
  const oldFile = `${oldAndroidDir}/${timestamp}`;
  const newFile = `${dirPictures}/${timestamp}`;

  const imageMoved = await movePhotoToAppStorage( oldFile, newFile );
  console.log( imageMoved, "image moved" );
  writeToDebugLog( `${imageMoved}: image moved to new location` );

  if ( imageMoved ) {
    realm.write( () => {
      photo.backupUri = newFile;
    } );
  }
};

const deleteFile = ( filepath ) => {
  RNFS.unlink( filepath ).then( () => {
    console.log( "unused backup filepath deleted: ", filepath );
  } ).catch( ( err ) => {
    console.log( err.message );
  } );
};

const getThumbnailName = ( thumbnail ) => {
  if ( thumbnail === null ) { // some photos were added before we started implementing backups
    return null;
  }
  const uri = thumbnail.split( "Pictures/" )[1]; // should work for both iOS and Android
  return uri;
};

const findDuplicates = ( list ) => {
  const sorted = list.slice().sort();

  const duplicates = [];
  for ( let i = 0; i < sorted.length - 1; i += 1 ) {
    if ( sorted[i + 1] === sorted[i] && sorted[i] !== null ) {
      if ( !duplicates.includes( sorted[i] ) ) {
        duplicates.push( sorted[i] );
      }
    }
  }
  return duplicates;
};

const updateRealmThumbnails = () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const databasePhotos = realm.objects( "PhotoRealm" );
      const backups = databasePhotos.map( photo => getThumbnailName( photo.backupUri ) );
      writeToDebugLog( `${databasePhotos.map( photo => photo.backupUri )}: all backups in realm` );
      // check out backup names in realm

      const duplicates = findDuplicates( backups );

      const filtered = databasePhotos.filtered( 'backupUri CONTAINS "/Pictures/"' );

      filtered.forEach( ( photo ) => {
        const { backupUri } = photo;
        const thumbnail = backupUri.split( "/Pictures/" )[1];

        if ( !duplicates.includes( thumbnail ) ) {
          moveFileAndUpdateRealm( thumbnail, photo, realm );
        }
      } );
    } ).catch( ( e ) => console.log( e, "error checking for database photos" ) );
};

const checkForDirectory = async ( dir ) => {
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
  const dirExists = await checkForDirectory( oldAndroidDir );
  writeToDebugLog( `${dirExists}: does /Seek/Pictures still exist` );

  if ( dirExists ) {
    const permission = await checkCameraRollPermissions();
    if ( permission === true ) {
      updateRealmThumbnails();
    }
  }
};

const createNewBackup = async ( realm, photo ) => {
  const { mediumUrl } = photo;
  let uuid;

  if ( Platform.OS === "ios" ) {
    const uriParts = mediumUrl.split( "/" );
    uuid = uriParts[2];
  } else {
    const uriParts = mediumUrl.split( "Pictures/" );
    const id = uriParts[1] ? uriParts[1].split( "." ) : null; // account for edge case where this doesn't exist
    uuid = id ? id[0] : null;
  }

  const newBackup = await createBackupUri( mediumUrl, uuid );

  if ( newBackup ) {
    realm.write( () => {
      photo.backupUri = newBackup;
    } );
  }
};

const regenerateBackupUris = async () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const databasePhotos = realm.objects( "PhotoRealm" );
      const backups = databasePhotos.map( photo => getThumbnailName( photo.backupUri ) );

      const duplicates = findDuplicates( backups );

      let filteredPhotoObjects;

      if ( duplicates.length > 0 ) {
        duplicates.forEach( ( duplicate ) => {
          filteredPhotoObjects = databasePhotos.filtered( `backupUri ENDSWITH "${duplicate}"` );

          filteredPhotoObjects.forEach( ( photo ) => {
            createNewBackup( realm, photo );
          } );
        } );
      }
    } ).then( () => {
      if ( Platform.OS === "android" ) {
        moveAndroidFilesToInternalStorage();
      }
    } ).catch( ( e ) => console.log( e, "couldn't check database photos for duplicates" ) );
};

export {
  checkForPhotoMetaData,
  resizeImage,
  movePhotoToAppStorage,
  localizeAttributions,
  createBackupUri,
  getAlbumNames,
  moveAndroidFilesToInternalStorage,
  deleteFile,
  regenerateBackupUris,
  checkForDirectory
};
