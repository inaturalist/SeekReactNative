const { FileUpload } = require( "inaturalistjs" );
const Geocoder = require( "react-native-geocoder" );
const Realm = require( "realm" );
const uuid = require( "react-native-uuid" );

const badgesDict = require( "./badgesDict" );
const realmConfig = require( "../models/index" );

const capitalizeNames = ( name ) => {
  const titleCaseName = name.split( " " )
    .map( string => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
    .join( " " );
  return titleCaseName;
};

const truncateCoordinates = coordinate => Number( coordinate.toFixed( 2 ) );

const flattenUploadParameters = ( uri, time, latitude, longitude ) => {
  const params = {
    image: new FileUpload( {
      uri,
      name: "photo.jpeg",
      type: "image/jpeg"
    } ),
    observed_on: new Date( time * 1000 ).toISOString(),
    latitude,
    longitude
  };
  return params;
};

const reverseGeocodeLocation = ( latitude, longitude ) => {
  Geocoder.default.geocodePosition( { lat: latitude, lng: longitude } )
    .then( ( result ) => {
      const { locality, subAdminArea } = result[0];
      return locality || subAdminArea;
    } ).catch( ( err ) => {
      console.log( "Error reverse geocoding location: ", err.message );
    } );
};

const recalculateBadges = () => {
  let badgeEarned = false;

  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const collectedTaxa = realm.objects( "TaxonRealm" );
      const unearnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == false" );

      unearnedBadges.forEach( ( badge ) => {
        if ( badge.iconicTaxonId !== 0 && badge.count !== 0 ) {
          const filteredCollection = collectedTaxa.filtered( `iconicTaxonId == ${badge.iconicTaxonId}` );
          const collectionLength = Object.keys( filteredCollection );

          if ( collectionLength.length >= badge.count ) {
            realm.write( () => {
              badge.earned = true;
              badge.earnedDate = new Date();
            } );
            badgeEarned = true;
          }
        } else if ( badge.count !== 0 ) {
          if ( collectedTaxa.length >= badge.count ) {
            realm.write( () => {
              badge.earned = true;
              badge.earnedDate = new Date();
            } );
            badgeEarned = true;
          }
        }
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to open realm in recalculate badges, error: ", err );
    } );
  return badgeEarned;
};

const addToCollection = ( observation, latitude, longitude, image ) => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        let defaultPhoto;
        const p = observation.taxon.default_photo;
        if ( image ) {
          defaultPhoto = realm.create( "PhotoRealm", {
            squareUrl: p.medium_url,
            mediumUrl: image.uri
          } );
        }
        const taxon = realm.create( "TaxonRealm", {
          id: observation.taxon.id,
          name: capitalizeNames( observation.taxon.name ),
          preferredCommonName: capitalizeNames( observation.taxon.preferred_common_name ),
          iconicTaxonId: observation.taxon.iconic_taxon_id,
          defaultPhoto
        } );
        const species = realm.create( "ObservationRealm", {
          uuidString: uuid.v1(),
          date: new Date(),
          taxon,
          latitude: truncateCoordinates( latitude ),
          longitude: truncateCoordinates( longitude ),
          placeName: reverseGeocodeLocation( latitude, longitude )
        } );
      } );
      recalculateBadges();
    } ).catch( ( e ) => {
      console.log( "Error adding photos to collection: ", e );
    } );
};

const setupBadges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        const dict = Object.keys( badgesDict.default );
        dict.forEach( ( badgeType ) => {
          const badges = badgesDict.default[badgeType];

          const badge = realm.create( "BadgeRealm", {
            name: badges.name,
            iconicTaxonName: badges.iconicTaxonName,
            iconicTaxonId: badges.iconicTaxonId,
            count: badges.count,
            earnedIconName: badges.earnedIconName,
            unearnedIconName: badges.unearnedIconName,
            infoText: badges.infoText,
            index: badges.index
          }, true );
          // console.log( badge, "realm badges after writing to file" );
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to open realm in setup badges, error: ", err );
    } );
};

const getCurrentMonth = () => {
  const date = new Date();
  return date.getMonth() + 1;
};

const getPreviousAndNextMonth = () => {
  const month = getCurrentMonth();

  if ( month === 1 ) {
    return [12, 1, 2];
  }

  if ( month === 12 ) {
    return [11, 12, 1];
  }

  return [month - 1, month, month + 1];
};

export {
  addToCollection,
  capitalizeNames,
  flattenUploadParameters,
  recalculateBadges,
  reverseGeocodeLocation,
  setupBadges,
  truncateCoordinates,
  getPreviousAndNextMonth
};
