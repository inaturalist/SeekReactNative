// @flow
import * as RNLocalize from "react-native-localize";

const Realm = require( "realm" );
const realmConfig = require( "../models/index" );

const addCommonNamesFromFile = ( realm, commonNamesDict, seekLocale ) => {
  // const { languageCode } = RNLocalize.getLocales()[0];
  // const seekLocale = ( preferredLanguage && preferredLanguage !== "device" ) ? preferredLanguage : languageCode;
  // // need to switch this to preferred code if there is a preferred preference
  // console.log( languageCode, "language code when preferred switches", preferredLanguage, seekLocale );
  commonNamesDict.forEach( ( commonNameRow ) => {
    if ( commonNameRow.l === seekLocale ) {
      console.log( commonNameRow.l, "matches seek locale" );
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
        // check to see if names are already in Realm. There are about 96k names.
        const realmLocale = realm.objects( "CommonNamesRealm" ).filtered( `locale == "${seekLocale}"` );

        // if common names for desired locale already exist in realm, do nothing
        if ( realmLocale.length > 0 ) {
          console.log( realmLocale.length, "length of common names with same locale as desired locale" );
          return;
        }

        // const numberInserted = realm.objects( "CommonNamesRealm" ).length;
        // if ( numberInserted < 96000 ) {
        // delete all existing common names from Realm
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
        // }
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
