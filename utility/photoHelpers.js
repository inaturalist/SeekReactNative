import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";

const { PermissionsAndroid, Platform } = require( "react-native" );
// const Realm = require( "realm" );

// const realmConfig = require( "../models/index" );

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

const checkIfPhotoExistsOnDevice = uri => (
  new Promise( ( resolve ) => {
    RNFS.exists( uri ).then( ( exists ) => {
      resolve( exists );
    } ).catch( () => {
      resolve( null );
    } );
  } )
);

// const convertLocalIdentifierToAssetLibrary = ( localIdentifier, ext ) => {
//   const hash = localIdentifier.split( "/" )[0];
//   return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
// };

// const getLocalIdentifier = ( uri ) => {
//   const uriParts = uri.split( "://" );
//   const localId = uriParts[1].split( "/" );
//   return localId[0];
// };

// const checkIfTaxonPhotosExist = () => {
//   Realm.open( realmConfig.default )
//     .then( ( realm ) => {
//       const taxon = realm.objects( "TaxonRealm" );
//       taxon.forEach( ( species ) => {
//         const { defaultPhoto } = species;

//         if ( defaultPhoto.mediumUrl ) {
//           const localId = getLocalIdentifier( defaultPhoto.mediumUrl );
//           const uri = convertLocalIdentifierToAssetLibrary( localId, "jpeg" );
//           console.log( uri, "uri" );
//           checkIfPhotoExistsOnDevice( uri ).then( ( exists ) => {
//             console.log( exists, "exists 2" );
//           } );
//         }
//       } );
//     } ).catch( () => {
//       console.log( "can't check observation photos" );
//     } );
// };

export {
  checkCameraRollPermissions,
  checkForPhotoMetaData,
  resizeImage
  // checkIfPhotoExistsOnDevice,
  // checkIfTaxonPhotosExist
};
