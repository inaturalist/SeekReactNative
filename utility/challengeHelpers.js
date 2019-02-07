const { AsyncStorage } = require( "react-native" );
const Realm = require( "realm" );

const { createNotification } = require( "./notificationHelpers" );
const taxonDict = require( "./taxonDict" );
const missionsDict = require( "./missionsDict" );
const realmConfig = require( "../models/index" );
const challengesDict = require( "./challengesDict" );

const calculatePercent = ( seen, total ) => ( seen / total ) * 100;

const recalculateChallenges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const collectedTaxa = realm.objects( "TaxonRealm" );
      const totalCollectedTaxa = collectedTaxa.length;
      const incompleteChallenges = realm.objects( "ChallengeRealm" ).filtered( "percentComplete != 100 AND started == true" );

      incompleteChallenges.forEach( ( challenge ) => {
        realm.write( () => {
          realm.delete( challenge.numbersObserved );
          // deleting numbers observed each time to update with fresh results
          let totalSeen = 0;
          const { index } = challenge;
          const totalPerMission = missionsDict.default[index];

          Object.keys( totalPerMission ).forEach( ( taxa ) => {
            if ( taxa === "all" ) {
              if ( totalCollectedTaxa <= totalPerMission[taxa] ) {
                challenge.numbersObserved.push( totalCollectedTaxa );
                totalSeen += totalCollectedTaxa;
              } else {
                challenge.numbersObserved.push( totalPerMission[taxa] );
                totalSeen += totalPerMission[taxa];
              }
            } else {
              const taxaId = taxonDict.default[taxa];
              const collectedIconicTaxa = collectedTaxa.filtered( `iconicTaxonId == ${taxaId}` );
              const collectionLength = Object.keys( collectedIconicTaxa ).length;
              if ( collectionLength <= totalPerMission[taxa] ) {
                challenge.numbersObserved.push( collectionLength );
                totalSeen += collectionLength;
              } else {
                challenge.numbersObserved.push( totalPerMission[taxa] );
                totalSeen += totalPerMission[taxa];
              }
            }
            const percentComplete = calculatePercent( totalSeen, challenge.totalSpecies );
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
      console.log( challenges, "start challenge date" );

      challenges.forEach( ( challenge ) => {
        realm.write( () => {
          challenge.started = true;
          challenge.numbersObserved = [0, 0, 0, 0, 0];
        } );
      } );
    } ).catch( ( err ) => {
      // console.log( "[DEBUG] Failed to start challenge: ", err );
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
