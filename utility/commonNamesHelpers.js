// @flow
import { setDisplayLanguage, localeNoHyphens } from "./languageHelpers";
import { capitalizeNames } from "./helpers";
import i18n from "../i18n";

const Realm = require( "realm" );
const realmConfig = require( "../models/index" );

const getTaxonCommonName = ( taxonID: number ): any => (
  new Promise<any>( ( resolve ) => {
    Realm.open( realmConfig.default ).then( ( realm ) => {
      // need this because realm isn't guaranteed to only contain
      // one locale; we could solve this by deleting the realm database each time
      // the app loads or including this searchLocale parameter
      const searchLocale = localeNoHyphens( ( i18n.locale ) );
        // look up common names for predicted taxon in the current locale
        const commonNames = realm.objects( "CommonNamesRealm" )
          .filtered( `taxon_id == ${taxonID} and locale == '${searchLocale}'` );
      resolve( commonNames.length > 0 ? capitalizeNames( commonNames[0].name ) : null );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to open realm, error: ", err );
      resolve( );
    } );
  } )
);

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

const setupCommonNames = ( preferredLanguage: string ) => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        const locale = setDisplayLanguage( preferredLanguage );
        // need to remove hyphens for pt-BR and es-MX
        const seekLocale = localeNoHyphens( locale );
        const realmLocale = realm.objects( "CommonNamesRealm" ).filtered( `locale == "${seekLocale}"` );

        // if common names for desired locale already exist in realm, do nothing
        // note: early Seek adopters will have multiple languages stored in their realm
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
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-13" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-14" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-15" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-16" ).default, seekLocale );
        addCommonNamesFromFile( realm,
          require( "./commonNames/commonNamesDict-17" ).default, seekLocale );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to setup common names: ", err );
    } );
};

export {
  getTaxonCommonName,
  setupCommonNames
};
