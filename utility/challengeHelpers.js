const { AsyncStorage } = require( "react-native" );
const Realm = require( "realm" );

const { createNotification } = require( "./notificationHelpers" );
const taxonDict = require( "./taxonDict" );
const missionsDict = require( "./missionsDict" );
const realmConfig = require( "../models/index" );
const challengesDict = require( "./challengesDict" );
const { checkIfChallengeAvailable } = require( "./dateHelpers" );

const calculatePercent = ( seen, total ) => ( seen / total ) * 100;

const recalculateChallenges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "percentComplete != 100 AND started == true" );

      incompleteChallenges.forEach( ( challenge ) => {
        const { startedDate } = challenge;
        const seenAfterChallengeStart = [];
        const observations = realm.objects( "ObservationRealm" ).sorted( "date" );
        observations.forEach( ( observation ) => {
          if ( observation.date >= startedDate ) {
            seenAfterChallengeStart.push( observation );
          }
        } );
        realm.write( () => {
          realm.delete( challenge.numbersObserved );
          // deleting numbers observed each time to update with fresh results
          let numberSeen = 0;
          const { index } = challenge;
          const mission = missionsDict.default[index];

          Object.keys( mission ).forEach( ( taxa ) => {
            if ( taxa === "all" ) {
              if ( seenAfterChallengeStart.length <= mission[taxa] ) {
                challenge.numbersObserved.push( seenAfterChallengeStart.length );
                numberSeen += seenAfterChallengeStart.length;
              } else {
                challenge.numbersObserved.push( mission[taxa] );
                numberSeen += mission[taxa];
              }
            } else {
              const taxaId = taxonDict.default[taxa];
              const taxaSeenAfterChallengeStart = seenAfterChallengeStart.filter( t => t.taxon.iconicTaxonId === taxaId );
              if ( taxaSeenAfterChallengeStart.length <= mission[taxa] ) {
                challenge.numbersObserved.push( taxaSeenAfterChallengeStart.length );
                numberSeen += taxaSeenAfterChallengeStart.length;
              } else {
                challenge.numbersObserved.push( mission[taxa] );
                numberSeen += mission[taxa];
              }
            }
            const percentComplete = calculatePercent( numberSeen, challenge.totalSpecies );
            if ( percentComplete === 100 ) {
              challenge.completedDate = new Date();
            } else if ( percentComplete > 50 ) { // change this to 50% later
              createNotification( "challengeProgress", index );
            }
            challenge.percentComplete = percentComplete;
          } );
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to recalculate challenges: ", err );
    } );
};

const startChallenge = ( index ) => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${index}` );

      challenges.forEach( ( challenge ) => {
        realm.write( () => {
          challenge.started = true;
          challenge.startedDate = new Date();
          challenge.numbersObserved = [0, 0, 0, 0, 0];
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to start challenge: ", err );
    } );
};

const setupChallenges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        const dict = Object.keys( challengesDict.default );

        dict.forEach( ( challengesType ) => {
          const challenges = challengesDict.default[challengesType];
          const isAvailable = checkIfChallengeAvailable( challenges.availableDate );

          if ( isAvailable ) {
            const challenge = realm.create( "ChallengeRealm", {
              name: challenges.name,
              month: challenges.month,
              description: challenges.description,
              totalSpecies: challenges.totalSpecies,
              unearnedIconName: challenges.unearnedIconName,
              earnedIconName: challenges.earnedIconName,
              missions: challenges.missions,
              availableDate: challenges.availableDate,
              index: challenges.index
            }, true );
          }
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to setup challenges: ", err );
    } );
};

const setChallengesCompleted = ( challenges ) => {
  AsyncStorage.setItem( "challengesCompleted", challenges );
};

const checkNumberOfChallengesCompleted = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const challengesCompleted = realm.objects( "ChallengeRealm" ).filtered( "started == true AND percentComplete == 100" ).length;

      setChallengesCompleted( challengesCompleted.toString() );
    } ).catch( ( e ) => {
      console.log( e, "error checking number of badges earned" );
    } );
};

const getChallengesCompleted = async () => {
  try {
    const earned = await AsyncStorage.getItem( "challengesCompleted" );
    return earned;
  } catch ( error ) {
    return ( error );
  }
};

export {
  recalculateChallenges,
  calculatePercent,
  startChallenge,
  setupChallenges,
  checkNumberOfChallengesCompleted,
  getChallengesCompleted
};
