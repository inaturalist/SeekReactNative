import i18n from "../i18n";

const Realm = require( "realm" );
const realmConfig = require( "../models/index" );


const addCommonNamesFromFile = ( realm, commonNamesDict ) => {
  commonNamesDict.forEach( ( commonNameRow ) => {
    if ( commonNameRow.l === i18n.currentLocale() ) {
      // only load common names with current locale, to address memory issues
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
        // check to see if names are already in Realm. There are about 61k names.
        const numberInserted = realm.objects( "CommonNamesRealm" ).length;
        let lastLocale;

        if ( numberInserted > 0 ) {
          lastLocale = realm.objects( "CommonNamesRealm" )[0].locale;
        }
        const { locale } = i18n;
        if ( numberInserted < 1500 || ( lastLocale && lastLocale !== locale ) ) {
          // check to see if user switched locale
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
        }
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to setup common names: ", err );
    } );
};

export {
  setupCommonNames
};
