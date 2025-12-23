import Realm from "realm";
import inatjs, { FileUpload } from "inaturalistjs";
import * as createUUID from "uuid";

import realmConfig from "../models/index";
import { resizeImage } from "./photoHelpers";
import { fetchAccessToken } from "./loginHelpers";
import { fetchJSONWebToken } from "./tokenHelpers";
import i18n from "../i18n";
import { log } from "../react-native-logs.config";

const logger = log.extend( "uploadHelpers.js" );

// this was causing some users to only see internet errors, so removing this for the moment
// const fetchWithTimeout = ( timeout, fetch ) => Promise.race( [
//   fetch,
//   new Promise( ( _, reject ) =>
//       setTimeout( ( ) => reject( new Error( "timeout" ) ), timeout )
//     )
// ] );

const saveUploadSucceeded = async ( id: number ): Promise<void> => {
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

const saveUploadFailed = async ( id: number ): Promise<void> => {
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

interface ErrorType {
  error: {
    type: string;
    errorText?: string;
  }
}

const appendPhotoToObservation = async ( photo: {
  id: number,
  uuid: string,
  uri: string
}, token: string, uri: string ): Promise<boolean | ErrorType | undefined> => {
  const { id, uuid } = photo;
  const photoParams = {
    "observation_photo[observation_id]": id,
    "observation_photo[uuid]": uuid,
    file: new FileUpload( {
      uri,
      name: "photo.jpeg",
      type: "image/jpeg",
    } ),
  };

  const options = { api_token: token };

  try {
    await inatjs.observation_photos.create( photoParams, options );
    return true;
  } catch ( e ) {
    if ( e.message === "timeout" ) {
      return {
        error: {
          type: "timeout",
        },
      };
    }

    // when there's no error message, this can be caused by upload starting when user first posts from posting screen
    // and then immediately going to home screen, where a second upload will start while first is still in progress
    if ( e.message ) {
      return {
        error: {
          type: "photo",
          errorText: e.message,
        },
      };
    }
  }
};

const uploadPhoto = async ( photo: Photo, token: string ): Promise<boolean | ErrorType | undefined> => {
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
        errorText: i18n.t( "post_to_inat_card.error_photo" ),
      },
    };
  }
  const photoUpload = await appendPhotoToObservation( photo, token, resizedPhoto );

  if ( photoUpload === true ) {
    saveUploadSucceeded( id );
    return true;
  }
  return photoUpload;
};

const saveObservationId = async ( id: number, photo: Photo ): Promise<Photo | undefined> => {
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
  try {
    const { results } = await inatjs.taxa.fetch( id );
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

interface Photo {
  id: number;
  uri: string;
  uuid: string;
}

interface Observation {
  uuid: string;
  observed_on_string: string | null;
  taxon_id: number | null;
  geoprivacy: string;
  captive_flag: boolean;
  place_guess: string | null;
  latitude: number | null;
  longitude: number | null;
  positional_accuracy: number | null;
  description: string | null;
  photo: Photo;
  vision: boolean;
}

const uploadObservation = async ( observation: Observation ): Promise<boolean | ErrorType | undefined> => {
  const login = await fetchAccessToken( );
  logger.debug( `login: ${login}` );
  const taxonId = await checkInactiveTaxonIds( observation.taxon_id );
  logger.debug( `taxonId: ${taxonId}` );


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
      owners_identification_from_vision_requested: observation.vision,
    },
  };

  const token = await fetchJSONWebToken( login );

  // catch server downtime or login token error
  if ( typeof token === "object" ) {
    logger.debug( "token is an object that indicates a server downtime or login token error" );
    return token;
  }
  const options = { api_token: token };
  logger.debug( `options.api_token: ${options.api_token}` );

  try {
    if ( !observation.photo.id ) {
      const response = await inatjs.observations.create( params, options );
      const { id } = response[0];
      logger.debug( `id: ${id}` );

      const photo = await saveObservationId( id, observation.photo );
      return await uploadPhoto( photo, token );
    } else {
      // don't try to create an observation which has already been uploaded to
      // iNat; this leads to limitless repeat identifications if a user suggests a different identification
      // than what's stored in observation.taxon_id via iNat web/apps
      return await uploadPhoto( observation.photo, token );
    }
  } catch ( e ) {
    logger.debug( `error: ${e}` );
    if ( e.message === "timeout" ) {
      return {
        error: {
          type: "timeout",
        },
      };
    }
    return {
      error: {
        type: "observation",
        errorText: e.message,
      },
    };
  }
};

const saveObservationToRealm = async ( observation: Observation, uri: string ): Promise<boolean | ErrorType | undefined> => {
  const realm = await Realm.open( realmConfig );
  const obsUUID = createUUID.v4();
  const photoUUID = createUUID.v4();

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
        notificationShown: false,
      } );
      realm.create( "UploadObservationRealm", {
        ...observation,
        uuid: obsUUID,
        photo,
      }, true );
    } );

    const latestObs = realm.objects( "UploadObservationRealm" ).filtered( `uuid == '${obsUUID}'` )[0];
    return uploadObservation( latestObs );
  } catch ( e ) {
    console.log( "couldn't save observation to UploadObservationRealm", e );
    logger.debug( `saveObservationToRealm error: ${e}` );
  }
};

const checkForNumSuccessfulUploads = async ( ): Promise<number> => {
  const realm = await Realm.open( realmConfig );

  return realm.objects( "UploadPhotoRealm" )
    .filtered( "uploadSucceeded == true AND notificationShown == false" ).length;
};

const markUploadsAsSeen = async ( ): Promise<void> => {
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
} ): Promise<void> => {
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

const checkForUploads = async ( ) => {
  const realm = await Realm.open( realmConfig );
  return realm.objects( "UploadObservationRealm" );
};

export {
  resizeImageForUpload,
  saveObservationToRealm,
  checkForNumSuccessfulUploads,
  markUploadsAsSeen,
  checkForUploads,
  uploadObservation,
  markCurrentUploadAsSeen,
};
