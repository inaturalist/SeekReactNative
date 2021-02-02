// @flow
import Realm from "realm";
import inatjs, { FileUpload } from "inaturalistjs";

import realmConfig from "../models/index";
import createUserAgent from "../utility/userAgent";
import { resizeImage } from "./photoHelpers";

const saveIdAndUploadStatus = async ( id: number, uri: string ) => {
  const realm = await Realm.open( realmConfig );
  try {
    realm.write( ( ) => {
      realm.create( "UploadPhotoRealm", {
        id,
        uri,
        uploadSucceeded: false
      }, true );
      checkForIncompleteUploads( );
    } );
  } catch ( e ) {
    console.log( "couldn't save id and upload status to UploadPhotoRealm", e );
  }
};

const saveUploadSucceeded = async ( id: number ) => {
  const realm = await Realm.open( realmConfig );
  const observation = realm.objects( "UploadPhotoRealm" ).filtered( `id == ${id}` )[0];

  try {
    realm.write( ( ) => {
      observation.uploadSucceeded = true;
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
    console.log( e, "couldn't create json web token" );
  }
};

const appendPhotoToObservation = async ( id: number, token: string, uri: string ) => {
  const photoParams = {
    "observation_photo[observation_id]": id,
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
    console.log( e, "photo could not be added to image" );
  }
};

const tryUpload = async ( uri: string, id: number, token: string ) => {
  const resizedPhoto = await resizeImageForUpload( uri );
  const reUpload = await appendPhotoToObservation( id, token, resizedPhoto );

  if ( reUpload === true ) {
    saveUploadSucceeded( id );
  }
};

const checkForIncompleteUploads = async ( login: string ) => {
  const realm = await Realm.open( realmConfig );
  try {
    const uploads = realm.objects( "UploadPhotoRealm" );
    const unsuccessfulUploads = uploads.filtered( "uploadSucceeded == false" );

    if ( unsuccessfulUploads.length === 0 ) { return; }

    const token = await fetchJSONWebToken( login );

    unsuccessfulUploads.forEach( ( photo ) => {
      tryUpload( photo.uri, photo.id, token );
    } );
  } catch ( e ) {
    console.log( e, " : couldn't check for incomplete uploads" );
  }
};

export {
  saveIdAndUploadStatus,
  saveUploadSucceeded,
  checkForIncompleteUploads
};
