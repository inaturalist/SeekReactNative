import Realm from "realm";

import realmConfig from "../models/index";

const addCommonNamesFromFile = ( realm, commonNamesDict ) => {
  commonNamesDict.forEach( ( commonNameRow ) => {
    realm.create( "CommonNamesRealm", {
      taxon_id: commonNameRow.i,
      locale: commonNameRow.l,
      name: commonNameRow.n
    }, true );
  } );
};

const setupCommonNames = () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      realm.write( () => {
        // check to see if names are already in Realm. There are about 70k names.
        const numberInserted = realm.objects( "CommonNamesRealm" ).length;
        if ( numberInserted < 71000 ) {
          // delete all existing common names from Realm
          realm.delete( realm.objects( "CommonNamesRealm" ) );
          // load names from each file. React-native requires need to be strings
          // so each file is listed here instead of some kind of loop
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-0" ) );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-1" ) );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-2" ) );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-3" ) );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-4" ) );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-5" ) );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-6" ) );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-7" ) );
        }
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to setup common names: ", err );
    } );
};

export {
  setupCommonNames // eslint-disable-line import/prefer-default-export
};
