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

const checkForIncompleteUploads = async ( ) => {
  const realm = await Realm.open( realmConfig );
  try {
    const uploads = realm.objects( "UploadPhotoRealm" );
    const unsuccessfulUploads = uploads.filtered( "uploadSucceeded == false" );
    console.log( Array.from( unsuccessfulUploads ), "unsuccessful uploads" );
    saveUploadSucceeded( 3 );
    console.log( Array.from( uploads.filtered( "id == 3" ) ) );
  } catch ( e ) {
    console.log( e, " : couldn't check for incomplete uploads" );
  }
};

const resizeImageForUpload = async ( uri: string ) => {
  return await resizeImage( uri, 2048 );
};

const fetchJSONWebToken = ( loginToken: string ) => {
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": createUserAgent( ),
    "Authorization": `Bearer ${loginToken}`
  };

  const site = "https://www.inaturalist.org";

  fetch( `${site}/users/api_token`, { headers } )
    .then( r => r.json( ) )
    .then( ( parsedResponse ) => {
      const token = parsedResponse.api_token;
      // next step - resize image for uploading
    } ).catch( ( e ) => {
      console.log( e, "couldn't create json web token" );
  } );
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

export {
  saveIdAndUploadStatus,
  saveUploadSucceeded,
  checkForIncompleteUploads
};
