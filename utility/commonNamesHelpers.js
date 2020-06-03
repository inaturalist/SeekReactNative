// @flow
import * as RNLocalize from "react-native-localize";

const Realm = require( "realm" );
const realmConfig = require( "../models/index" );

const addCommonNamesFromFile = ( realm, commonNamesDict, seekLocale ) => {
  commonNamesDict.forEach( ( commonNameRow ) => {
    if ( commonNameRow.l === seekLocale ) {
      // only create realm objects if language matches current locale
      realm.create( "CommonNamesRealm", {
        taxon_id: commonNameRow.i,
        locale: commonNameRow.l,
        name: commonNameRow.n
      }, true );
    }
  } );
};

const setupCommonNames = ( preferredLanguage ) => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        const { languageCode } = RNLocalize.getLocales()[0];
        const seekLocale = ( preferredLanguage && preferredLanguage !== "device" ) ? preferredLanguage : languageCode;
        const realmLocale = realm.objects( "CommonNamesRealm" ).filtered( `locale == "${seekLocale}"` );

        // if common names for desired locale already exist in realm, do nothing
        if ( realmLocale.length > 0 ) {
          return;
        }

        // otherwise, delete all existing common names from Realm and update with preferred language
        realm.delete( realm.objects( "CommonNamesRealm" ) );
        // load names from each file. React-native requires need to be strings
        // so each file is listed here instead of some kind of loop
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-0" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-1" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-2" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-3" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-4" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-5" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-6" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-7" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-8" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-9" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-10" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-11" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-12" ).default, seekLocale );
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
