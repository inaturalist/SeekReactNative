const { AsyncStorage } = require( "react-native" );
const Realm = require( "realm" );

const { createNotification } = require( "./notificationHelpers" );
const taxonDict = require( "./taxonDictForMissions" );
const missionsDict = require( "./missionsDict" );
const realmConfig = require( "../models/index" );
const challengesDict = require( "./challengesDict" );
const { checkIfChallengeAvailable } = require( "./dateHelpers" );

const calculatePercent = ( seen, total ) => ( seen / total ) * 100;

const getSum = ( total, currentValue ) => total + currentValue;

const recalculateChallenges = () => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      const incompleteChallenges = realm.objects( "ChallengeRealm" )
        .filtered( "percentComplete != 100 AND started == true" );

      incompleteChallenges.forEach( ( challenge ) => {
        const { startedDate } = challenge;

        if ( !startedDate ) {
          challenge.startedDate = new Date();
        }

        const seenTaxa = [];
        const observations = realm.objects( "ObservationRealm" ).sorted( "date" );

        observations.forEach( ( observation ) => {
          if ( observation.date >= startedDate ) {
            seenTaxa.push( observation );
          }
        } );

        const obsList = Object.keys( challenge.numbersObserved )
          .map( number => challenge.numbersObserved[number] );

        const prevNumberSeen = obsList.length > 0 ? obsList.reduce( getSum ) : 0;
        const prevPercent = calculatePercent( prevNumberSeen, challenge.totalSpecies );

        realm.write( () => {
          realm.delete( challenge.numbersObserved );
          // deleting numbers observed each time to update with fresh results
          let totalSeen = 0;
          const { index } = challenge;
          const challengeMonth = missionsDict.default[index];

          Object.keys( challengeMonth ).forEach( ( mission ) => {
            const { number, types } = challengeMonth[mission];

            let count = 0;

            types.forEach( ( taxa ) => {
              let taxaPerMission;

              if ( taxa === "all" ) {
                taxaPerMission = seenTaxa.length;
              } else {
                const taxaId = taxonDict.default[taxa];
                const taxaTypeSeen = seenTaxa.filter( t => t.taxon.iconicTaxonId === taxaId );
                taxaPerMission = taxaTypeSeen.length;
              }
              count += taxaPerMission;
            } );

            if ( count <= number ) {
              challenge.numbersObserved.push( count );
              totalSeen += count;
            } else {
              challenge.numbersObserved.push( number );
              totalSeen += number;
            }
          } );

          const percentComplete = calculatePercent( totalSeen, challenge.totalSpecies );

          if ( percentComplete === 100 ) {
            challenge.completedDate = new Date();
            createNotification( "challengeCompleted", challenge.index );
          } else if ( percentComplete >= 75 && prevPercent < 75 ) {
            createNotification( "challengeProgress", challenge.index );
          }
          challenge.percentComplete = percentComplete;
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
              homeBackgroundName: challenges.homeBackgroundName,
              backgroundName: challenges.backgroundName,
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

const setChallengeIndex = ( index ) => {
  AsyncStorage.setItem( "index", index.toString() );
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

const getChallengeIndex = async () => {
  try {
    const index = await AsyncStorage.getItem( "index" );
    return Number( index );
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
  getChallengesCompleted,
  setChallengeIndex,
  getChallengeIndex
};
