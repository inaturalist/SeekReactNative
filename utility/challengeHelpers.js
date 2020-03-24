import AsyncStorage from "@react-native-community/async-storage";
import Realm from "realm";

import { createNotification } from "./notificationHelpers";
import taxonDict from "./dictionaries/taxonDictForMissions";
import missionsDict from "./dictionaries/missionsDict";
import realmConfig from "../models/index";
import challengesDict from "./dictionaries/challengesDict";
import { checkIfChallengeAvailable } from "./dateHelpers";

const calculatePercent = ( seen, total ) => ( seen / total ) * 100;

const setChallengeProgress = async ( index ) => {
  AsyncStorage.setItem( "challengeProgress", index.toString() );
};

const fetchIncompleteChallenges = ( realm ) => {
  const incompleteChallenges = realm.objects( "ChallengeRealm" )
    .filtered( "percentComplete != 100 AND startedDate != null" );

  return incompleteChallenges;
};

const fetchObservationsAfterChallengeStarted = ( realm, challenge ) => {
  const { startedDate } = challenge;

  const seenTaxa = [];
  const observations = realm.objects( "ObservationRealm" ).sorted( "date" );

  if ( startedDate ) {
    observations.forEach( ( observation ) => {
      if ( observation.date >= startedDate ) {
        seenTaxa.push( observation );
      }
    } );
  }
  return seenTaxa;
};

const checkForChallengeInProgress = ( percentComplete, prevPercent, challenge ) => {
  if ( percentComplete >= 75 && prevPercent < 75 ) {
    createNotification( "challengeProgress", challenge.index );
  }
};

const checkForChallengeComplete = ( percentComplete, challenge ) => {
  if ( percentComplete === 100 ) {
    challenge.completedDate = new Date();
    createNotification( "challengeCompleted", challenge.index );
  }
};

const updateChallengePercentages = ( challenge ) => {
  const prevPercent = challenge.percentComplete;
  const totalSeen = challenge.numbersObserved.reduce( ( acc, val ) => acc + val );

  const percentComplete = calculatePercent( totalSeen, challenge.totalSpecies );

  challenge.percentComplete = percentComplete;

  if ( prevPercent < percentComplete ) {
    setChallengeProgress( challenge.index );
  } else {
    setChallengeProgress( "none" );
  }

  checkForChallengeComplete( percentComplete, challenge );
  checkForChallengeInProgress( percentComplete, prevPercent, challenge );
};

const updateNumberObservedPerMission = ( challenge, count, number ) => {
  let totalSeen = 0;

  if ( count <= number ) {
    challenge.numbersObserved.push( count );
    totalSeen += count;
  } else {
    challenge.numbersObserved.push( number );
    totalSeen += number;
  }
  return totalSeen;
};

const checkForAncestors = ( seenTaxa, taxaId ) => {
  const taxaWithAncestors = seenTaxa.filter( ( t ) => (
    t.taxon && t.taxon.ancestorIds.length > 0
  ) );
  const matchingAncestors = [];

  taxaWithAncestors.forEach( ( taxon ) => {
    const { ancestorIds } = taxon.taxon;
    const ancestors = Object.keys( ancestorIds ).map( ( id ) => ancestorIds[id] );
    if ( ancestors.includes( taxaId ) ) {
      matchingAncestors.push( taxaId );
    }
  } );
  return matchingAncestors;
};

const calculateTaxaSeenPerMission = ( types, seenTaxa ) => {
  let count = 0;

  types.forEach( ( taxa ) => {
    let taxaPerMission;

    if ( taxa === "all" ) {
      taxaPerMission = seenTaxa.length;
    } else {
      const taxaId = taxonDict[taxa];
      const taxaTypeSeen = seenTaxa.filter( ( t ) => (
        t.taxon && t.taxon.iconicTaxonId === taxaId
      ) );
      const matchingAncestors = checkForAncestors( seenTaxa, taxaId );
      if ( taxaTypeSeen.length > 0 ) {
        taxaPerMission = taxaTypeSeen.length;
      } else if ( matchingAncestors.length > 0 ) {
        taxaPerMission = matchingAncestors.length;
      } else {
        taxaPerMission = 0;
      }
    }
    count += taxaPerMission;
  } );

  return count;
};

const recalculateChallenges = () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const incompleteChallenges = fetchIncompleteChallenges( realm );

      incompleteChallenges.forEach( ( challenge ) => {
        realm.write( () => {
          const seenTaxa = fetchObservationsAfterChallengeStarted( realm, challenge );

          realm.delete( challenge.numbersObserved );
          // deleting numbers observed each time to update with fresh results
          const { index } = challenge;
          const challengeMonth = missionsDict[index];
          const challengeMonthMissionList = Object.keys( challengeMonth );

          challengeMonthMissionList.forEach( ( mission ) => {
            const { number, types } = challengeMonth[mission];
            const count = calculateTaxaSeenPerMission( types, seenTaxa );
            updateNumberObservedPerMission( challenge, count, number );
          } );
          updateChallengePercentages( challenge );
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to recalculate challenges: ", err );
    } );
};

const startChallenge = ( index ) => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${index}` );

      challenges.forEach( ( challenge ) => {
        realm.write( () => {
          challenge.startedDate = new Date();
          challenge.numbersObserved = [0, 0, 0, 0, 0];
        } );
      } );
    } ).catch( ( err ) => {
      console.log( "[DEBUG] Failed to start challenge: ", err );
    } );
};

const setupChallenges = () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      realm.write( () => {
        const dict = Object.keys( challengesDict );

        dict.forEach( ( challengesType ) => {
          const challenges = challengesDict[challengesType];
          const isAvailable = checkIfChallengeAvailable( challenges.availableDate );

          if ( isAvailable ) {
            realm.create( "ChallengeRealm", {
              name: challenges.name,
              description: challenges.description,
              totalSpecies: challenges.totalSpecies,
              homeBackgroundName: challenges.homeBackgroundName,
              backgroundName: challenges.backgroundName,
              unearnedIconName: "badge_empty",
              earnedIconName: challenges.earnedIconName,
              missions: challenges.missions,
              availableDate: challenges.availableDate,
              photographer: challenges.photographer || null,
              action: challenges.action,
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
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const challengesCompleted = realm.objects( "ChallengeRealm" ).filtered( "startedDate != null AND percentComplete == 100" ).length;

      setChallengesCompleted( challengesCompleted.toString() );
      recalculateChallenges();
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

const setChallengeIndex = ( index ) => {
  AsyncStorage.setItem( "index", index.toString() );
};

const getChallengeIndex = async () => {
  try {
    const index = await AsyncStorage.getItem( "index" );
    if ( index !== "none" ) {
      return Number( index );
    }
    return null;
  } catch ( error ) {
    return ( error );
  }
};

const getChallengeProgress = async () => {
  try {
    const index = await AsyncStorage.getItem( "challengeProgress" );
    if ( index !== "none" && index !== null ) {
      return Number( index );
    }
    return null;
  } catch ( error ) {
    return ( error );
  }
};

const checkForChallengesCompleted = async () => {
  const prevChallengesCompleted = await getChallengesCompleted();
  const challengeProgressIndex = await getChallengeProgress();

  return (
    new Promise( ( resolve ) => {
      Realm.open( realmConfig )
        .then( ( realm ) => {
          let challengeInProgress;
          let challengeComplete;

          const challenges = realm.objects( "ChallengeRealm" )
            .filtered( "startedDate != null AND percentComplete == 100" )
            .sorted( "completedDate", true );

          if ( challengeProgressIndex !== null ) {
            const incompleteChallenges = realm.objects( "ChallengeRealm" )
              .filtered( `index == ${Number( challengeProgressIndex )} AND percentComplete != 100` );

            [challengeInProgress] = incompleteChallenges;
          }

          if ( challenges.length > prevChallengesCompleted ) {
            [challengeComplete] = challenges;
          }

          resolve( {
            challengeInProgress,
            challengeComplete
          } );
        } ).catch( () => {
          resolve( null );
        } );
    } )
  );
};

export {
  recalculateChallenges,
  calculatePercent,
  startChallenge,
  setupChallenges,
  checkNumberOfChallengesCompleted,
  setChallengeIndex,
  getChallengeIndex,
  setChallengeProgress,
  checkForChallengesCompleted
};
