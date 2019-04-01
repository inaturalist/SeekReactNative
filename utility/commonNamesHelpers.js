const Realm = require( "realm" );
const realmConfig = require( "../models/index" );

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
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        // check to see if names are already in Realm. There are about 51k names.
        const numberInserted = realm.objects( "CommonNamesRealm" ).length;
        if ( numberInserted < 50000 ) {
          // delete all existing common names from Realm
          realm.delete( realm.objects( "CommonNamesRealm" ) );
          // load names from each file. React-native requires need to be strings
          // so each file is listed here instead of some kind of loop
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-0" ).default );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-1" ).default );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-2" ).default );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-3" ).default );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-4" ).default );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-5" ).default );
        }
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to setup common names: ", err );
    } );
};

export {
  setupCommonNames
};
