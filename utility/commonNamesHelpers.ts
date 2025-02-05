import { getVersion } from "react-native-device-info";

import { setDisplayLanguage, localeNoHyphens } from "./languageHelpers";
import { capitalizeNames } from "./helpers";
import i18n from "../i18n";
import commonNames from "../utility/commonNames";

const Realm = require( "realm" );
const realmConfig = require( "../models/index" );

const getTaxonCommonName = ( taxonID?: number ) => (
  new Promise<string | null>( ( resolve, reject ) => {
    if ( !taxonID ) { return; }
    Realm.open( realmConfig.default ).then( ( realm ) => {
      // need this because realm isn't guaranteed to only contain
      // one locale; we could solve this by deleting the realm database each time
      // the app loads or including this searchLocale parameter
      const searchLocale = localeNoHyphens( ( i18n.locale ) );
      // look up common names for predicted taxon in the current locale
      const commonNamesRealm = realm.objects( "CommonNamesRealm" )
        .filtered( `taxon_id == ${taxonID} and locale == '${searchLocale}'` );
      resolve( commonNamesRealm.length > 0 ? capitalizeNames( commonNamesRealm[0].name ) : null );
    } ).catch( ( err: Error ) => {
      console.log( "[DEBUG] Failed to open realm, error: ", err );
      reject( );
    } );
  } )
);

const addCommonNamesFromFile = ( realm, commonNamesDict: { i: number; l: string; n: string; }[], seekLocale: string ) => {
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
        // need to remove hyphens for pt-BR, es-MX, zh-CN, zh-TW
        const seekLocale = localeNoHyphens( locale );
        const realmLocale = realm.objects( "CommonNamesRealm" ).filtered( `locale == "${seekLocale}"` );

        const userSettings = realm.objects( "UserSettingsRealm" )[0];
        const prevAppVersion = userSettings?.appVersion;
        const currentAppVersion = getVersion( );

        // only reload common names when the app version changes or when the
        // user's desired locale changes, not on each app launch
        if ( prevAppVersion === currentAppVersion && realmLocale.length > 0 ) {
          return;
        } else {
          userSettings.appVersion = currentAppVersion;
        }

        // otherwise, delete all existing common names from Realm and update with preferred language
        realm.delete( realm.objects( "CommonNamesRealm" ) );
        // load names from each file. React-native requires need to be strings
        // so each file is listed here instead of some kind of loop
        Object.keys( commonNames ).forEach( ( key ) => {
          const commonNamesArray = commonNames[key];
          addCommonNamesFromFile( realm, commonNamesArray, seekLocale );
        } );
      } );
    } ).catch( ( err: Error ) => {
      console.log( "[DEBUG] Failed to setup common names: ", err );
    } );
};

export {
  getTaxonCommonName,
  setupCommonNames
};
