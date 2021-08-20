// @flow
import Realm from "realm";
import inatjs, { FileUpload } from "inaturalistjs";

import realmConfig from "../models/index";
import createUserAgent from "../utility/userAgent";
import { resizeImage } from "./photoHelpers";
import { createUUID } from "./observationHelpers";
import { fetchAccessToken } from "./loginHelpers";
import { handleServerError } from "./helpers";
import i18n from "../i18n";

// this was causing some users to only see internet errors, so removing this for the moment
// const fetchWithTimeout = ( timeout, fetch ) => Promise.race( [
//   fetch,
//   new Promise( ( _, reject ) =>
//       setTimeout( ( ) => reject( new Error( "timeout" ) ), timeout )
//     )
// ] );

const saveUploadSucceeded = async ( id: number ) => {
  const realm = await Realm.open( realmConfig );
  const photo = realm.objects( "UploadPhotoRealm" ).filtered( `id == ${id}` )[0];

  try {
    realm.write( ( ) => {
      photo.uploadSucceeded = true;
    } );
  } catch ( e ) {
    console.log( "couldn't set succeeded status: ", e );
  }
};

const saveUploadFailed = async ( id: number ) => {
  const realm = await Realm.open( realmConfig );
  const photo = realm.objects( "UploadPhotoRealm" ).filtered( `id == ${id}` )[0];

  try {
    realm.write( ( ) => {
      photo.uploadFailed = true;
    } );
  } catch ( e ) {
    console.log( "couldn't set failed status: ", e );
  }
};

const resizeImageForUpload = async ( uri: string, outputPath?: string ): Promise<string> => {
  return await resizeImage( uri, 2048, 2048, outputPath );
};

const fetchJSONWebToken = async ( loginToken: string ): Promise<any> => {
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": createUserAgent( ),
    "Authorization": `Bearer ${loginToken}`
  };

  const site = "https://www.inaturalist.org";

  try {
    const r = await fetch( `${site}/users/api_token`, { headers } );
    const parsedResponse = await r.json( );
    return parsedResponse.api_token;
  } catch ( e ) {
    if ( e.response && e.response.status && e.response.status === 503 ) {
      // not 100% sure if this is working
      return {
        error: {
          type: "downtime",
          errorText: e.message,
          numOfHours: handleServerError( e )
        }
      };
    }
    if ( e.message === "timeout" ) {
      return {
        error: {
          type: "timeout"
        }
      };
    }
    return {
      error: {
        type: "login",
        errorText: e.message
      }
    };
  }
};

const appendPhotoToObservation = async ( photo: {
  id: number,
  uuid: string,
  uri: string
}, token: string, uri: string ) => {
  const { id, uuid } = photo;
  const photoParams = {
    "observation_photo[observation_id]": id,
    "observation_photo[uuid]": uuid,
    file: new FileUpload( {
      uri,
      name: "photo.jpeg",
      type: "image/jpeg"
    } )
  };

  const options = { api_token: token, user_agent: createUserAgent( ) };

  try {
    await inatjs.observation_photos.create( photoParams, options );
    return true;
  } catch ( e ) {
    if ( e.message === "timeout" ) {
      return {
        error: {
          type: "timeout"
        }
      };
    }

    // when there's no error message, this can be caused by upload starting when user first posts from posting screen
    // and then immediately going to home screen, where a second upload will start while first is still in progress
    if ( e.message ) {
      return {
        error: {
          type: "photo",
          errorText: e.message
        }
      };
    }
  }
};

const uploadPhoto = async ( photo: { uri: string, id: number, uuid: string }, token: string ) => {
  const { uri, id } = photo;

  // const alreadyResized = uri.includes( "/SeekUploads" );

  // now that we're resizing when creating the realm observation, this is unnecessary
  // except for photos that were already stored with the cameraroll uri
  const resizedPhoto = await resizeImageForUpload( uri );

  if ( !resizedPhoto ) {
    // if upload cannot complete because there is no longer a photo to upload
    // save this setting so Seek does not keep trying to upload it (and crashing each time)
    saveUploadFailed( id );
    return {
      error: {
        type: "photo",
        errorText: i18n.t( "post_to_inat_card.error_photo" )
      }
    };
  }
  const photoUpload = await appendPhotoToObservation( photo, token, resizedPhoto );

  if ( photoUpload === true ) {
    saveUploadSucceeded( id );
    return true;
  }
  return photoUpload;
};

const saveObservationId = async ( id: number, photo: Object ) => {
  const realm = await Realm.open( realmConfig );
  try {
    realm.write( ( ) => {
      photo.id = id;
    } );
    return photo;
  } catch ( e ) {
    console.log( "couldn't save id to UploadPhotoRealm", e );
  }
};

const checkInactiveTaxonIds = async ( id ) => {
  const options = { user_agent: createUserAgent( ) };

  try {
    const { results } = await inatjs.taxa.fetch( id, options );
    const isActive = results[0].is_active;
    const synonymousTaxonIds = results[0].current_synonymous_taxon_ids;
    const ancestorIds = results[0].ancestor_ids;

    if ( isActive ) { return id; }

    // if taxon replaced by 1 taxon, swap in the new taxon id
    if ( synonymousTaxonIds.length === 1 ) {
      return synonymousTaxonIds[0];
    } else {
      // if no longer active or taxon replaced by 2 taxa, roll up to nearest common ancestor
      return ancestorIds[ancestorIds.length - 1];
    }
  } catch ( e ) {
    return id;
  }
};

const uploadObservation = async ( observation: {
  uuid: string,
  observed_on_string: ?string,
  taxon_id: ?number,
  geoprivacy: string,
  captive_flag: boolean,
  place_guess: ?string,
  latitude: ?number,
  longitude: ?number,
  positional_accuracy: ?number,
  description: ?string,
  photo: Object,
  vision: boolean
} ): Promise<any> => {
  const login = await fetchAccessToken( );
  const taxonId = await checkInactiveTaxonIds( observation.taxon_id );

  const params = {
    // realm doesn't let you use spread operator, apparently
    observation: {
      uuid: observation.uuid,
      observed_on_string: observation.observed_on_string,
      taxon_id: taxonId,
      geoprivacy: observation.geoprivacy,
      captive_flag: observation.captive_flag,
      place_guess: observation.place_guess,
      latitude: observation.latitude,
      longitude: observation.longitude,
      positional_accuracy: observation.positional_accuracy,
      description: observation.description,
      // this shows that the id is recommended by computer vision
      owners_identification_from_vision_requested: observation.vision
    }
  };

  const token = await fetchJSONWebToken( login );

  // catch server downtime or login token error
  if ( typeof token === "object" ) {
    return token;
  }
  const options = { api_token: token, user_agent: createUserAgent( ) };

  try {
    if ( !observation.photo.id ) {
      const response = await inatjs.observations.create( params, options );
      const { id } = response[0];

      const photo: Object = await saveObservationId( id, observation.photo );
      return await uploadPhoto( photo, token );
    } else {
      // don't try to create an observation which has already been uploaded to
      // iNat; this leads to limitless repeat identifications if a user suggests a different identification
      // than what's stored in observation.taxon_id via iNat web/apps
      return await uploadPhoto( observation.photo, token );
    }
  } catch ( e ) {
    if ( e.message === "timeout" ) {
      return {
        error: {
          type: "timeout"
        }
      };
    }
    return {
      error: {
        type: "observation",
        errorText: e.message
      }
    };
  }
};

const saveObservationToRealm = async ( observation: {
  observed_on_string: ?string,
  taxon_id: ?number,
  geoprivacy: string,
  captive_flag: boolean,
  place_guess: ?string,
  latitude: ?number,
  longitude: ?number,
  positional_accuracy: ?number,
  description: ?string,
  vision: boolean
}, uri: string ): Promise<any> => {
  const realm = await Realm.open( realmConfig );
  const uuid = await createUUID( );
  const photoUUID = await createUUID( );

  // I'm not sure how much hidden space this will take up on a user's device
  // but we probably need to delete photos from this directory regularly after they have been uploaded
  // const outputPath = Platform.OS === "ios"
    // ? `${dirPhotosForUpload}/${photoUUID}`
    // for whatever reason, the resize library doesn't return anything if I add the photoUUID
    // but we can at least store these uris in the SeekUploads folder on Android
    // : `${dirPhotosForUpload}`;
  // const resizedPhoto = await resizeImageForUpload( uri, outputPath );

  try {
    realm.write( ( ) => {
      const photo = realm.create( "UploadPhotoRealm", {
        uri,
        uploadSucceeded: false,
        uuid: photoUUID,
        notificationShown: false
      } );
      realm.create( "UploadObservationRealm", {
        ...observation,
        uuid,
        photo
      }, true );
    } );

    const latestObs = realm.objects( "UploadObservationRealm" ).filtered( `uuid == '${uuid}'` )[0];
    return uploadObservation( latestObs );
  } catch ( e ) {
    console.log( "couldn't save observation to UploadObservationRealm", e );
  }
};

const checkForNumSuccessfulUploads = async ( ): Promise<number> => {
  const realm = await Realm.open( realmConfig );

  return realm.objects( "UploadPhotoRealm" )
    .filtered( "uploadSucceeded == true AND notificationShown == false" ).length;
};

const markUploadsAsSeen = async ( ) => {
  const realm = await Realm.open( realmConfig );
  const uploads = realm.objects( "UploadPhotoRealm" );

  try {
    uploads.forEach( upload => {
      if ( upload.uploadSucceeded === true && upload.notificationShown === false ) {
        realm.write( ( ) => {
          upload.notificationShown = true;
        } );
      }
    } );
  } catch ( e ) {
    console.log( "couldn't mark uploads as seen in UploadPhotoRealm", e );
  }
};

const markCurrentUploadAsSeen = async ( upload: {
  photo: {
    notificationShown: boolean
  }
} ) => {
  const realm = await Realm.open( realmConfig );

  try {
    if ( upload.photo.notificationShown === false ) {
      realm.write( ( ) => {
        upload.photo.notificationShown = true;
      } );
    }
  } catch ( e ) {
    console.log( "couldn't mark current upload as seen", e );
  }
};

const checkForUploads = async ( ): Promise<any> => {
  const realm = await Realm.open( realmConfig );
  return realm.objects( "UploadObservationRealm" );
};

// const clearSeekUploadsFolderEvery7Days = ( ) => {
//   RNFS.readDir( dirPhotosForUpload ).then( photos => {
//     photos.forEach( ( { ctime, name, path, size } ) => {
//       // on android, these are 1.1 MB after resizing
//       console.log( ctime, name, path, size, "items in seek uploads folder" );
//       if ( !isWithin7Days( ctime ) ) {
//         console.log( "is older than 7 days" );
//       }
//     } );
//       // RNFS.unlink( dirDebugLogs )
//       //   .then( () => {
//       //     console.log( "deleted debug logs that were 7 days old", dirDebugLogs );
//       //   } ).catch( ( err ) => {
//       //     console.log( err.message );
//       //   } );
//     // }
//   } ).catch( e => console.log( e, "directory does not exist" ) );
// };

// const createFakeUploadData = ( ): Object => {
//   return {
//     "captive_flag": false,
//     "description": null,
//     "geoprivacy": "open",
//     "latitude": 37.838835309609536,
//     "longitude": -122.30571209495892,
//     "observed_on_string": "2021-03-11T10:26:38-08:00",
//     "place_guess": "Emeryville",
//     "positional_accuracy": 65,
//     "taxon_id": 366346
//   };
// };

// const createAndroidSeekUploadsDirectory = ( ) => {
//   if ( Platform.OS === "ios" ) { return; }
//   // on Android, we need to create this before saving a resized URL to this directory
//   RNFS.mkdir( dirPhotosForUpload )
//     .then( ( ) => { } )
//     .catch( e => console.log( e, "couldn't create SeekUploads directory" ) );
// };

export {
  resizeImageForUpload,
  fetchJSONWebToken,
  saveObservationToRealm,
  checkForNumSuccessfulUploads,
  markUploadsAsSeen,
  // createFakeUploadData,
  checkForUploads,
  uploadObservation,
  markCurrentUploadAsSeen
  // createAndroidSeekUploadsDirectory,
  // clearSeekUploadsFolderEvery7Days
};
