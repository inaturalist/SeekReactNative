import AsyncStorage from "@react-native-async-storage/async-storage";
import Realm from "realm";
import { getYear, getMonth } from "date-fns";
import { Alert } from "react-native";

import { createNotification, isDuplicateNotification } from "./notificationHelpers";
import { taxonDictForMissions } from "./dictionaries/taxonomyDicts";
import missionsDict from "./dictionaries/missionsDict";
import realmConfig from "../models/index";
import challengesDict from "./dictionaries/challengesDict";
import { checkIfChallengeAvailable, isWithinCurrentMonth, isDateInFuture } from "./dateHelpers";
import i18n from "../i18n";

const calculatePercent = ( seen: number, total: number ): number => Math.round( ( seen / total ) * 100 );

const setChallengeProgress = async ( index: number ): Promise<void> => AsyncStorage.setItem( "challengeProgress", index.toString() );

const fetchIncompleteChallenges = ( realm: Realm ): any => {
  const incomplete = realm.objects( "ChallengeRealm" ).filtered( "percentComplete != 100 AND startedDate != null" );
  return incomplete;
};

const fetchObservationsAfterChallengeStarted = ( realm: Realm, challenge: { startedDate: Date } ): any[] => {
  const { startedDate } = challenge;

  const seenTaxa: any[] = [];
  const observations = realm.objects( "ObservationRealm" ).sorted( "date" );

  if ( startedDate ) {
    observations.forEach( ( observation: any ) => {
      if ( observation.date >= startedDate ) {
        seenTaxa.push( observation );
      }
    } );
  }
  return seenTaxa;
};

interface Challenge {
  index: number;
  percentComplete: number;
  numbersObserved: number[];
  totalSpecies: number;
  completedDate: Date;
}

const checkForChallengeInProgress = ( percentComplete: number, prevPercent: number, challenge: Challenge ): void => {
  if ( percentComplete >= 75 && prevPercent < 75 ) {
    createNotification( "challengeProgress", challenge.index );
  }
};

const checkForChallengeComplete = ( percentComplete: number, challenge: Challenge ): void => {
  if ( percentComplete === 100 ) {
    challenge.completedDate = new Date();
    createNotification( "challengeCompleted", challenge.index );
  }
};

const updateChallengePercentages = ( challenge: Challenge ): void => {
  const prevPercent = challenge.percentComplete;
  const totalSeen = challenge.numbersObserved.reduce( ( acc, val ) => acc + val, 0 );
  const newPercent = calculatePercent( totalSeen, challenge.totalSpecies );

  // need to round this or Realm will decide how to round to integer
  challenge.percentComplete = newPercent;

  if ( prevPercent < newPercent ) {
    setChallengeProgress( challenge.index );
  }

  checkForChallengeComplete( newPercent, challenge );
  checkForChallengeInProgress( newPercent, prevPercent, challenge );
};

const updateNumberObservedPerMission = ( challenge: Challenge, count: number, number: number ): number => {
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

const checkForAncestors = ( seenTaxa: any[], taxaId: number ): number[] => {
  const taxaWithAncestors = seenTaxa.filter( ( t ) => (
    t.taxon && t.taxon.ancestorIds.length > 0
  ) );
  const matchingAncestors: number[] = [];

  taxaWithAncestors.forEach( ( taxon ) => {
    const { ancestorIds } = taxon.taxon;
    const ancestors = Object.keys( ancestorIds ).map( ( id ) => ancestorIds[id] );
    if ( ancestors.includes( taxaId ) ) {
      matchingAncestors.push( taxaId );
    }
  } );
  return matchingAncestors;
};

interface SeenTaxon {
  taxon: {
    iconicTaxonId: number
  }
}
const calculateTaxaSeenPerMission = ( types: string[], seenTaxa: SeenTaxon[] ): number => {
  let count = 0;

  types.forEach( ( taxa ) => {
    let taxaPerMission: number;

    if ( taxa === "all" ) {
      taxaPerMission = seenTaxa.length;
    } else {
      const taxaId = taxonDictForMissions[taxa];
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

const recalculateChallenges = (): void => {
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

const startChallenge = ( index: number ): void => {
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

const setChallengeDetails = ( date: Date ): {
  logo: string;
  secondLogo: string;
  sponsorName: string;
} => {
  const year = getYear( date );
  const month = getMonth( date );

  if ( year === 2019 ) {
    return {
      logo: "op",
      secondLogo: "wwfop",
      sponsorName: "Our Planet",
    };
  } else if ( year === 2021 && month < 6 ) {
    return {
      logo: "natGeo",
      secondLogo: "natGeoBlack",
      sponsorName: "NatGeo",
    };
  } else if ( year === 2022 && ( month === 4 || month === 5 ) ) {
    return {
      logo: "BeesChallengeTopLogo",
      secondLogo: "BeesChallengeChallengeDetail",
      sponsorName: "My Garden",
    };
  } else {
    return {
      logo: "iNatWhite",
      secondLogo: "iNat",
      sponsorName: "Seek",
    };
  }
};

const showAdminAlert = ( ): void => {
  // this lets admins know that they should expect to see the
  // newest challenge before the start of the month
  Alert.alert(
    null,
    i18n.t( "challenges_card.inat_admin" )
  );
};

const setupChallenges = async ( isAdmin: boolean ): Promise<void> => {
  try {
    const realm = await Realm.open( realmConfig );
    const dict = Object.keys( challengesDict );
    // Used to show the admin alert only once
    let adminAlertShown = false;

    realm.write( ( ) => {
      dict.forEach( ( challengesType: string, i: number ) => {
        const challenge = challengesDict[challengesType];
        const isAvailable = checkIfChallengeAvailable( challenge.availableDate );
        const isCurrent = isWithinCurrentMonth( challenge.availableDate );

        // start showing the latest challenge in developer mode for testing
        if ( isAvailable || process.env.NODE_ENV === "development" || isAdmin ) {
          const { logo, secondLogo, sponsorName } = setChallengeDetails( challenge.availableDate );

          if ( isAdmin && isDateInFuture( challenge.availableDate ) && !adminAlertShown ) {
            showAdminAlert( );
            adminAlertShown = true;
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
            index: i,
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

const setChallengesCompleted = ( challenges: string ): void => {
  AsyncStorage.setItem( "challengesCompleted", challenges );
};

const checkNumberOfChallengesCompleted = (): void => {
  Realm.open( realmConfig )
    .then( ( realm: Realm ) => {
      const challengesCompleted = realm.objects( "ChallengeRealm" ).filtered( "startedDate != null AND percentComplete == 100" ).length;

      setChallengesCompleted( challengesCompleted.toString() );
      recalculateChallenges();
    } ).catch( ( e ) => {
      console.log( e, "error checking number of badges earned" );
    } );
};

const getChallengesCompleted = async (): Promise<string | unknown> => {
  try {
    const earned = await AsyncStorage.getItem( "challengesCompleted" );
    return earned;
  } catch ( error ) {
    return ( error );
  }
};

const getChallengeProgress = async (): Promise<number | null | unknown> => {
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

const checkForChallengesCompleted = async ( ): Promise<{
  challengeInProgress: any | null;
  challengeComplete: any | null;
}> => {
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
          challengeComplete: challengeComplete || null,
        } );
      } ).catch( () => {
        resolve( {
          challengeInProgress: null,
          challengeComplete: null,
        } );
      } );
    } )
  );
};

interface Mission {
  observations: number;
}

const fetchUnobservedChallengeTaxaIds = ( missions: Mission[], index: number ): number[] => {
  const unobservedTaxaIds: number[] = [];
  const missionDetails = Object.keys( missionsDict[index] ).map( ( mission ) => missionsDict[index][mission] );

  const fetchUnobservedMissionTaxaIds = ( taxaTypes: string[] ) => {
    taxaTypes.forEach( ( type ) => {
      const taxaId = taxonDictForMissions[type];
      unobservedTaxaIds.push( taxaId );
    } );
  };

  missions.map( ( mission, i ) => {
    const missionCompleted: boolean = missionDetails[i] && missionDetails[i].number === mission.observations;

    if ( missionCompleted ) { return; }
    fetchUnobservedMissionTaxaIds( missionDetails[i].types );
  } );

  return unobservedTaxaIds;
};

const fetchAllObservedTaxaIds = async ( ): Promise<number[]> => {
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
  setChallengeProgress,
  checkForChallengesCompleted,
  fetchObservationsAfterChallengeStarted,
  checkForAncestors,
  fetchUnobservedChallengeTaxaIds,
  fetchAllObservedTaxaIds,
};
