// @flow
import * as RNLocalize from "react-native-localize";

const Realm = require( "realm" );
const realmConfig = require( "../models/index" );

const addCommonNamesFromFile = ( realm, commonNamesDict ) => {
  const { languageCode } = RNLocalize.getLocales()[0];
  console.log( languageCode, "language code" );
  commonNamesDict.forEach( ( commonNameRow ) => {
    if ( commonNameRow.l === languageCode ) {
      // only create realm objects if language matches current locale
      realm.create( "CommonNamesRealm", {
        taxon_id: commonNameRow.i,
        locale: commonNameRow.l,
        name: commonNameRow.n
      }, true );
    }
  } );
};

const setupCommonNames = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        // check to see if names are already in Realm. There are about 96k names.
        const numberInserted = realm.objects( "CommonNamesRealm" ).length;

        if ( numberInserted < 96000 ) {
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
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-6" ).default );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-7" ).default );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-8" ).default );
          addCommonNamesFromFile( realm,
            require( "./commonNames/commonNamesDict-9" ).default );
        }
      } );
    // } ).then( () => {
    //   console.log( new Date().getTime(), "end time for realm" );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to setup common names: ", err );
    } );
};

export {
  setupCommonNames // eslint-disable-line import/prefer-default-export
};
