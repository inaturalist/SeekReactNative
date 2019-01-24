const { FileUpload } = require( "inaturalistjs" );
const Geocoder = require( "react-native-geocoder" );
const Realm = require( "realm" );
const uuid = require( "react-native-uuid" );
const moment = require( "moment" );
const { AsyncStorage } = require( "react-native" );

const taxonDict = require( "./taxonDict" );
const missionsDict = require( "./missionsDict" );
const badgesDict = require( "./badgesDict" );
const challengesDict = require( "./challengesDict" );
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
      // console.log( "Error reverse geocoding location: ", err.message );
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
      // console.log( "[DEBUG] Failed to open realm in recalculate badges, error: ", err );
    } );
  return badgeEarned;
};

const recalculateChallenges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const collectedTaxa = realm.objects( "TaxonRealm" );
      const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "completed == false AND started == true" );

      incompleteChallenges.forEach( ( challenge ) => {
        const { index } = challenge;
        const numbersPerMission = missionsDict.default[index];
        const missionLength = Object.keys( numbersPerMission ).length;
        const numbersObserved = [];
        Object.keys( numbersPerMission ).forEach( ( taxa ) => {
          if ( taxa === "all" ) {
            numbersObserved.push( collectedTaxa.length );
          } else {
            const taxaId = taxonDict.default[taxa];
            console.log( taxaId, "taxa id" );
            const filteredCollection = collectedTaxa.filtered( `iconicTaxonId == ${taxaId}` );
            console.log( filteredCollection, "collection by id" );
            const collectionLength = Object.keys( filteredCollection );
            numbersObserved.push( collectionLength.length );
          }
          if ( numbersObserved.length === missionLength ) {
            console.log( "writing to realm", numbersObserved );
            realm.write( () => {
              challenge.numbersObserved = numbersObserved;
            } );
          }
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to recalculate badges: ", err );
    } );
};

const addToCollection = ( observation, latitude, longitude, image ) => {
  console.log( "adding photos to collection" );
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
        } );
      } );
    } ).catch( ( err ) => {
      // console.log( "[DEBUG] Failed to open realm in setup badges, error: ", err );
    } );
};

const setupChallenges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        const dict = Object.keys( challengesDict.default );
        dict.forEach( ( challengesType ) => {
          const challenges = challengesDict.default[challengesType];

          const challenge = realm.create( "ChallengeRealm", {
            name: challenges.name,
            month: challenges.month,
            description: challenges.description,
            totalSpecies: challenges.totalSpecies,
            unearnedIconName: challenges.unearnedIconName,
            earnedIconName: challenges.earnedIconName,
            missions: challenges.missions,
            index: challenges.index
          }, true );
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to setup challenges: ", err );
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

const requiresParent = ( birthday ) => {
  const today = moment().format( "YYYY-MM-DD" );
  const thirteen = moment( today ).subtract( 13, "year" ).format( "YYYY-MM-DD" );
  if ( moment( birthday ).isAfter( thirteen ) ) {
    return true;
  }
  return false;
};

const HAS_LAUNCHED = "has_launched";

const setAppLaunched = () => {
  AsyncStorage.setItem( HAS_LAUNCHED, "true" );
};

const checkIfFirstLaunch = async () => {
  try {
    const hasLaunched = await AsyncStorage.getItem( HAS_LAUNCHED );
    if ( hasLaunched === null ) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch ( error ) {
    return false;
  }
};

const CARD_SHOWN = "card_shown";

const setCardShown = () => {
  AsyncStorage.setItem( CARD_SHOWN, "true" );
};

const checkIfCardShown = async () => {
  try {
    const hasShown = await AsyncStorage.getItem( CARD_SHOWN );
    if ( hasShown === null ) {
      setCardShown();
      return true;
    }
    return false;
  } catch ( error ) {
    return false;
  }
};

const setLatAndLng = ( lat, lng ) => {
  AsyncStorage.setItem( "latitude", lat );
  AsyncStorage.setItem( "longitude", lng );
};

const getLatAndLng = async () => {
  try {
    const latitude = await AsyncStorage.getItem( "latitude" );
    const longitude = await AsyncStorage.getItem( "longitude" );
    return {
      latitude: Number( latitude ),
      longitude: Number( longitude )
    };
  } catch ( error ) {
    return ( error );
  }
};

const calculatePercent = ( number, total ) => ( number / total ) * 100;

const startChallenge = ( index ) => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${index}` );

      challenges.forEach( ( challenge ) => {
        realm.write( () => {
          challenge.started = true;
        } );
      } );
    } ).catch( ( err ) => {
      // console.log( "[DEBUG] Failed to start challenge: ", err );
    } );
};

export {
  addToCollection,
  capitalizeNames,
  flattenUploadParameters,
  recalculateBadges,
  recalculateChallenges,
  reverseGeocodeLocation,
  setupBadges,
  setupChallenges,
  truncateCoordinates,
  getPreviousAndNextMonth,
  requiresParent,
  checkIfFirstLaunch,
  checkIfCardShown,
  setLatAndLng,
  getLatAndLng,
  calculatePercent,
  startChallenge
};
