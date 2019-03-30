const Realm = require( "realm" );
const realmConfig = require( "../models/index" );
const commonNames = require( "./common-names.json" );

const setupCommonNames = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        // check to see if names are already in Realm. There are about 51k names.
        const numberInserted = realm.objects( "CommonNamesRealm" ).length;
        if ( numberInserted < 50000 ) {
          // delete all existing
          realm.delete( realm.objects( "CommonNamesRealm" ) );
          // add names from file
          commonNames.forEach( ( commonNameRow ) => {
            realm.create( "CommonNamesRealm", {
              taxon_id: commonNameRow.i,
              locale: commonNameRow.l,
              name: commonNameRow.n
            }, true );
          } );
        }
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to setup common names: ", err );
    } );
};

export {
  setupCommonNames
};
