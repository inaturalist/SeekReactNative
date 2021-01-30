// @flow
import Realm from "realm";

import realmConfig from "../models/index";

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

export {
  saveIdAndUploadStatus,
  saveUploadSucceeded,
  checkForIncompleteUploads
};
