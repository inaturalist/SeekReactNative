// @flow
import Realm from "realm";
import inatjs, { FileUpload } from "inaturalistjs";
import faker from "faker";

import realmConfig from "../models/index";
import createUserAgent from "../utility/userAgent";
import { resizeImage } from "./photoHelpers";
import { createUUID } from "./observationHelpers";
import { fetchAccessToken } from "./loginHelpers";

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

const resizeImageForUpload = async ( uri: string ) => {
  return await resizeImage( uri, 2048 );
};

const fetchJSONWebToken = async ( loginToken: string ) => {
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
    return "";
  }
};

const appendPhotoToObservation = async ( photo: { id: number, uuid: string }, token: string, uri: string ) => {
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
    // await inatjs.observation_photos.create( photoParams, options );
    return true;
  } catch ( e ) {
    return false;
  }
};

const uploadPhoto = async ( photo: { uri: string, id: number, uuid: string }, token: string ) => {
  const { uri, id } = photo;
  const resizedPhoto = await resizeImageForUpload( uri );
  const photoUpload = await appendPhotoToObservation( photo, token, resizedPhoto );

  if ( photoUpload === true ) {
    saveUploadSucceeded( id );
    return true;
  }
  return false;
};

const checkForIncompleteUploads = async ( login: string ) => {
  const realm = await Realm.open( realmConfig );
  try {
    const uploads = realm.objects( "UploadPhotoRealm" );
    const unsuccessfulUploads = uploads.filtered( "uploadSucceeded == false" );

    if ( unsuccessfulUploads.length === 0 ) { return; }

    const token = await fetchJSONWebToken( login );
    if ( token === null ) { return; }

    unsuccessfulUploads.forEach( ( photo ) => {
      uploadPhoto( photo, token );
    } );
  } catch ( e ) {
    console.log( e, " : couldn't check for incomplete uploads" );
  }
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

const uploadObservation = async ( observation ) => {
  const login = await fetchAccessToken( );
  const params = {
    // realm doesn't let you use spread operator, apparently
    observation: {
      observed_on_string: observation.observed_on_string,
      taxon_id: observation.taxon_id,
      geoprivacy: observation.geoprivacy,
      captive_flag: observation.captive_flag,
      place_guess: observation.place_guess,
      latitude: observation.latitude,
      longitude: observation.longitude,
      positional_accuracy: observation.positional_accuracy,
      description: observation.description,
      // this shows that the id is recommended by computer vision
      owners_identification_from_vision_requested: true
    }
  };

  const token = await fetchJSONWebToken( login );
  const options = { api_token: token, user_agent: createUserAgent( ) };

  // const response = await inatjs.observations.create( params, options );
  // const { id } = response[0];
  const id = faker.random.number( );
  console.log( id, "fake id" );

  const photo: Object = await saveObservationId( id, observation.photo );
  await uploadPhoto( photo, token );
};

const saveObservationToRealm = async ( observation: {
  observed_on_string: string,
  taxon_id: ?number,
  geoprivacy: string,
  captive_flag: boolean,
  place_guess: ?string,
  latitude: ?number,
  longitude: ?number,
  positional_accuracy: ?number,
  description: ?string
}, uri: string ) => {
  const realm = await Realm.open( realmConfig );
  const uuid = await createUUID( );
  const photoUUID = await createUUID( );

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
    uploadObservation( latestObs );
  } catch ( e ) {
    console.log( "couldn't save observation to UploadObservationRealm", e );
  }
};

const checkForNewUploads = async ( ) => {
  const realm = await Realm.open( realmConfig );

  return realm.objects( "UploadPhotoRealm" )
    .filtered( "uploadSucceeded == true AND notificationShown == false" );

};

const markUploadsAsSeen = async ( ) => {
  const realm = await Realm.open( realmConfig );
  const uploads = realm.objects( "UploadPhotoRealm" ).filtered( "uploadSucceeded == true" );

  try {
    uploads.forEach( upload => {
      if ( upload.notificationShown === false ) {
        realm.write( ( ) => {
          upload.notificationShown = true;
        } );
      }
    } );
  } catch ( e ) {
    console.log( "couldn't mark uploads as seen in UploadPhotoRealm", e );
  }
};

const createFakeUploadData = ( ) => {
  return {
    "captive_flag": false,
    "description": null,
    "geoprivacy": "open",
    "latitude": 37.838835309609536,
    "longitude": -122.30571209495892,
    "observed_on_string": "2021-03-11T10:26:38-08:00",
    "place_guess": "Emeryville",
    "positional_accuracy": 65,
    "taxon_id": 366346
  };
};

export {
  saveUploadSucceeded,
  checkForIncompleteUploads,
  resizeImageForUpload,
  fetchJSONWebToken,
  saveObservationToRealm,
  checkForNewUploads,
  markUploadsAsSeen,
  createFakeUploadData
};
