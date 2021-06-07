// @flow
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import { Platform } from "react-native";
import Realm from "realm";
import { FileUpload } from "inaturalistjs";

import realmConfig from "../models/index";
import { dirPictures, dirDebugLogs } from "./dirStorage";
import i18n from "../i18n";
import { dimensions } from "../styles/global";
import {
  namePhotoByTime,
  isWithin7Days,
  formatYearMonthDay,
  formatHourMonthSecond,
  setISOTime
} from "./dateHelpers";
import { checkSavePermissions } from "./androidHelpers.android";

const writeToDebugLog = ( newLine: string ) => {
  let line = newLine;

  const date = newLine.split( " " );

  if ( date[0] !== formatYearMonthDay() ) {
    line = `${formatYearMonthDay()} ${formatHourMonthSecond()}: ${newLine}`;
  }

  RNFS.appendFile( dirDebugLogs, `\n${line}` ).then( () => {
    // console.log( result, "result of appending debug log" );
  } ).catch( ( e ) => {
    console.log( e, "error while appending debug log" );
  } );
};

const deleteDebugLogAfter7Days = () => {
  if ( Platform.OS === "android" ) {
    RNFS.stat( dirDebugLogs ).then( ( { ctime } ) => {
      if ( !isWithin7Days( ctime ) ) {
        RNFS.unlink( dirDebugLogs )
          .then( () => {
            console.log( "deleted debug logs that were 7 days old", dirDebugLogs );
          } ).catch( ( err ) => {
            console.log( err.message );
          } );
      }
    } ).catch( e => console.log( e, "debug log file does not exist" ) );
  }
};

const checkForPhotoMetaData = ( location: Object ): boolean => {
  if ( location ) {
    if ( Object.keys( location ).length !== 0 && location.latitude ) {
      return true;
    }
    return false;
  }
  return false;
};

const resizeImage = async ( path: string, width: number, height?: number, outputPath?: string ): Promise<string> => {
  try {
    const { uri } = await ImageResizer.createResizedImage(
      path,
      width,
      height || width, // height
      "JPEG", // compressFormat
      100, // quality
      0, // rotation
      // $FlowFixMe
      outputPath, // outputPath
      true // keep metadata
    );

    return uri;
  } catch ( e ) {
    return "";
  }
};

const flattenUploadParameters = async ( image: Object ): Object => {
  const {
    latitude,
    longitude,
    uri,
    time
  } = image;
  const userImage = await resizeImage( uri, 299 );

  const params = {
    image: new FileUpload( {
      uri: userImage,
      name: "photo.jpeg",
      type: "image/jpeg"
    } ),
    observed_on: new Date( time * 1000 ).toISOString(),
    latitude,
    longitude
  };
  return params;
};

const movePhotoToAppStorage = async ( filePath: string, newFilepath: string ): Promise<any> => (
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

const localizeAttributions = ( attribution: string, licenseCode: string, screen: string ): string => {
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

const createBackupUri = async ( uri: string, uuid?: ?string ): Promise<?string> => {
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

const moveFileAndUpdateRealm = async ( timestamp, photo, realm ) => {
  const oldAndroidDir = `${RNFS.ExternalStorageDirectoryPath}/Seek/Pictures`;
  const oldFile = `${oldAndroidDir}/${timestamp}`;
  const newFile = `${dirPictures}/${timestamp}`;

  const imageMoved = await movePhotoToAppStorage( oldFile, newFile );

  if ( imageMoved ) {
    realm.write( () => {
      photo.backupUri = newFile;
    } );
  }
};

const deleteFile = ( filepath: string ) => {
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
      // check out backup names in realm

      const duplicates = findDuplicates( backups );

      const filtered = databasePhotos.filtered( 'backupUri CONTAINS "/Pictures/"' ); // eslint-disable-line quotes

      filtered.forEach( ( photo ) => {
        const { backupUri } = photo;
        const thumbnail = backupUri.split( "/Pictures/" )[1];

        if ( !duplicates.includes( thumbnail ) ) {
          moveFileAndUpdateRealm( thumbnail, photo, realm );
        }
      } );
    } ).catch( ( e ) => console.log( e, "error checking for database photos" ) );
};

const checkForDirectory = async ( dir: string ): Promise<boolean> => {
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

  if ( dirExists ) {
    const permission = await checkSavePermissions();
    if ( permission === true ) {
      updateRealmThumbnails();
    }
  }
};

const replacePhoto = async ( id: number, image: Object ) => {
  const {
    latitude,
    longitude,
    uri,
    time
  } = image;
  const backupUri = await createBackupUri( uri );
  // edit realm photo object attached to observation
  // using id, create a new backup photo URI and save new cameraroll uri
  Realm.open( realmConfig ).then( ( realm ) => {
    realm.write( () => {
      const obsToEdit = realm.objects( "ObservationRealm" ).filtered( `taxon.id == ${id}` );
      const taxonToEdit = obsToEdit[0].taxon;
      const photoToEdit = taxonToEdit.defaultPhoto;

      obsToEdit.latitude = latitude || null;
      obsToEdit.longitude = longitude || null;

      photoToEdit.backupUri = backupUri;
      photoToEdit.mediumUrl = uri;
      photoToEdit.lastUpdated = time ? setISOTime( time ) : new Date();
    } );
  } ).catch( ( e ) => {
    console.log( e, "error editing photo object" );
  } );
};

const formatBytes = ( bytes: number, decimals: number = 2 ) => {
  // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
  if ( bytes === 0 ) {return "0 Bytes";}

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor( Math.log( bytes ) / Math.log( k ) );

  return parseFloat( ( bytes / Math.pow( k, i ) ).toFixed( dm ) ) + " " + sizes[i];
};

const checkPhotoSize = async ( file: string ): Promise<string> => {
  // this returns size in bytes
  const stats = await RNFS.stat( file );
  return formatBytes( Number( stats.size ) );
};

export {
  checkForPhotoMetaData,
  resizeImage,
  movePhotoToAppStorage,
  localizeAttributions,
  createBackupUri,
  moveAndroidFilesToInternalStorage,
  deleteFile,
  checkForDirectory,
  writeToDebugLog,
  deleteDebugLogAfter7Days,
  replacePhoto,
  flattenUploadParameters,
  checkPhotoSize
};
