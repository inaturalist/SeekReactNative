// @flow
import AsyncStorage from "@react-native-async-storage/async-storage";
import Realm from "realm";
import { getYear } from "date-fns";
import { Alert } from "react-native";

import { createNotification, isDuplicateNotification } from "./notificationHelpers";
import taxonDict from "./dictionaries/taxonDictForMissions";
import missionsDict from "./dictionaries/missionsDict";
import realmConfig from "../models/index";
import challengesDict from "./dictionaries/challengesDict";
import { checkIfChallengeAvailable, isWithinCurrentMonth, isDateInFuture } from "./dateHelpers";
import i18n from "../i18n";
// import { LOG } from "./debugHelpers";

const calculatePercent = ( seen: number, total: number ): number => Math.round( ( seen / total ) * 100 );

const setChallengeProgress = async ( index: any ): any => AsyncStorage.setItem( "challengeProgress", index.toString() );

const fetchIncompleteChallenges = ( realm ) => {
  const incomplete = realm.objects( "ChallengeRealm" ).filtered( "percentComplete != 100 AND startedDate != null" );
  return incomplete;
};

const fetchObservationsAfterChallengeStarted = ( realm: any, challenge: Object ): Array<Object> => {
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
  const newPercent = calculatePercent( totalSeen, challenge.totalSpecies );

  // need to round this or Realm will decide how to round to integer
  challenge.percentComplete = newPercent;

  if ( prevPercent < newPercent ) {
    setChallengeProgress( challenge.index );
  }

  checkForChallengeComplete( newPercent, challenge );
  checkForChallengeInProgress( newPercent, prevPercent, challenge );
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

const checkForAncestors = ( seenTaxa: Array<Object>, taxaId: number ): Array<number> => {
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
  Realm.open( realmConfig ).then( ( realm ) => {
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

const startChallenge = ( index: number ) => {
  Realm.open( realmConfig ).then( ( realm ) => {
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

const setChallengeDetails = ( date: Date ) => {
  const year = getYear( date );

  if ( year === 2019 ) {
    return {
      logo: "op",
      secondLogo: "wwfop",
      sponsorName: "Our Planet"
    };
  } else if ( year === 2020 ) {
    return {
      logo: "iNatWhite",
      secondLogo: "iNat",
      sponsorName: "Seek"
    };
  } else {
    return {
      logo: "natGeo",
      secondLogo: "natGeoBlack",
      sponsorName: "NatGeo"
    };
  }
};

const showAdminAlert = ( ) => {
  // this lets admins know that they should expect to see the
  // newest challenge before the start of the month
  Alert.alert(
    null,
    i18n.t( "challenges_card.inat_admin" )
  );
};

const setupChallenges = async ( isAdmin: boolean ): Promise<any> => {
  try {
    const realm = await Realm.open( realmConfig );
    const dict = Object.keys( challengesDict );

    realm.write( ( ) => {
      dict.forEach( ( challengesType, i ) => {
        const challenge = challengesDict[challengesType];
        const isAvailable = checkIfChallengeAvailable( challenge.availableDate );
        const isCurrent = isWithinCurrentMonth( challenge.availableDate );

        // start showing the latest challenge in developer mode for testing
        if ( isAvailable || process.env.NODE_ENV === "development" || isAdmin ) {
          const { logo, secondLogo, sponsorName } = setChallengeDetails( challenge.availableDate );

          if ( isAdmin && isDateInFuture( challenge.availableDate ) ) {
            showAdminAlert( );
          }

          realm.create( "ChallengeRealm", {
            name: challenge.name,
            description: challenge.description,
            totalSpecies: challenge.totalSpecies,
            backgroundName: challenge.backgroundName,
            earnedIconName: challenge.earnedIconName,
            missions: challenge.missions,
            availableDate: challenge.availableDate,
            photographer: challenge.photographer || null,
            action: challenge.action,
            logo,
            secondLogo,
            sponsorName,
            badgeName: challenge.badgeName || "seek_challenges.badge",
            index: i
          }, true );

          // need to check if challenge is available within this month,
          // otherwise new users will get notifications for all past challenges

          // also checking for existing notification with the same title and challenge index
          // so we can overwrite the march challenge without duplicating this notification
          if ( isCurrent && !isDuplicateNotification( realm, i ) ) {
            createNotification( "newChallenge", i );
          }
        }
      } );
    } );
  } catch ( e ) {
    console.log( "[DEBUG] Failed to setup challenges: ", e );
  }
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

const setChallengeIndex = ( index: number ) => {
  AsyncStorage.setItem( "index", index.toString() );
};

const getChallengeIndex = async (): any => {
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

const checkForChallengesCompleted = async ( ): Promise<Object> => {
  const prevChallengesCompleted = await getChallengesCompleted();
  const challengeProgressIndex = await getChallengeProgress();

  return (
    new Promise( ( resolve ) => {
      Realm.open( realmConfig ).then( ( realm ) => {
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
          challengeInProgress: challengeInProgress || null,
          challengeComplete: challengeComplete || null
        } );
      } ).catch( () => {
        resolve( {
          challengeInProgress: null,
          challengeComplete: null
        } );
      } );
    } )
  );
};

const fetchUnobservedChallengeTaxaIds = ( missions: Array<Object>, index: number ): Array<Object> => {
  const unobservedTaxaIds = [];
  const missionDetails = Object.keys( missionsDict[index] ).map( mission => missionsDict[index][mission] );

  const fetchUnobservedMissionTaxaIds = ( taxaTypes ) => {
    taxaTypes.forEach( type => {
      const taxaId = taxonDict[type];
      unobservedTaxaIds.push( taxaId );
    } );
  };

  missions.map( ( mission, i ) => {
    const missionCompleted = missionDetails[i] && missionDetails[i].number === mission.observations;

    if ( missionCompleted ) { return; }
    fetchUnobservedMissionTaxaIds( missionDetails[i].types );
  } );

  return unobservedTaxaIds;
};

const fetchAllObservedTaxaIds = async ( ): Promise<Array<Object>> => {
  try {
    const realm = await Realm.open( realmConfig );
    const observations = realm.objects( "TaxonRealm" );
    const ids = observations.map( obs => obs.id );
    return ids;
  } catch ( e ) {
    console.log( e, "couldn't fetch all observed taxa ids" );
    return [];
  }
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
  checkForChallengesCompleted,
  fetchObservationsAfterChallengeStarted,
  checkForAncestors,
  fetchUnobservedChallengeTaxaIds,
  fetchAllObservedTaxaIds
};
