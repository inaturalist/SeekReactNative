import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import Realm from "realm";

import { LogLevels, logToApi } from "../../../utility/apiCalls";
import taxonIds from "../../../utility/dictionaries/taxonDict";
import realmConfig from "../../../models/index";

const executeInNewMonth = async ( callback: () => void, keySubstring: string ) => {
  const storageKeyBase = "lastRunMonth";
  const storageKey = storageKeyBase + keySubstring;
  try {
    const lastRun = await AsyncStorage.getItem( storageKey );
    const currentMonth = new Date().getMonth();

    if ( lastRun === null || parseInt( lastRun, 10 ) !== currentMonth ) {
      // Run the function as the month has changed
      callback();

      // Update the last run month
      await AsyncStorage.setItem( storageKey, currentMonth.toString() );
    }
  } catch ( error ) {
    console.error( "Error checking or updating last run month:", error );
  }
};

// Custom hook to send the achievements and badge state to the API once per month
function useAppLog() {
  useEffect( ( ) => {
    // For every badge the user has earned, we log the index, and earned date
    const logBadgesAppState = async () => {
      const realm = await Realm.open( realmConfig );
      const badges = realm.objects( "BadgeRealm" );

      const iconicTaxonIds = Object.keys( taxonIds ).map( id => taxonIds[id] );
      const speciesBadges = [];
      iconicTaxonIds.forEach( ( id ) => {
        if ( id === null ) { return; }
        const highestEarned = badges
          .filtered( `iconicTaxonName != null AND iconicTaxonId == ${id} and earned == true` )
          .sorted( "index", true );
        if ( highestEarned.length <= 0 ) { return; }
        const badge = highestEarned[0];
        speciesBadges.push( { index: badge.index, earnedDate: badge.earnedDate } );
      } );

      const levelsEarned = badges.filtered( "iconicTaxonName == null AND earned == true" ).sorted( "count", true );
      const level = {
        earnedDate: levelsEarned[0]?.earnedDate,
        index: levelsEarned[0]?.index
      };

      const achievementsLogState = {
        level,
        speciesBadges
      };
      await logToApi( {
        level: LogLevels.INFO,
        message: JSON.stringify( achievementsLogState ),
        context: "RootStack achievementsState v1",
        errorType: "0"
      } );
    };

    executeInNewMonth( logBadgesAppState, "1" );
  }, [] );

  useEffect( ( ) => {
    // For every challenge that has been started, we log the name, started date, percent complete, and completed date
    const logChallengesAppState = async () => {
      const realm = await Realm.open( realmConfig );

      // Challenges that have been started
      const challenges = realm.objects( "ChallengeRealm" ).filtered( "startedDate != null" );
      const challengesLogState = challenges.map( challenge => ( {
        name: challenge.name,
        startedDate: challenge.startedDate,
        percentComplete: challenge.percentComplete,
        completedDate: challenge.completedDate
      } ) );

      await logToApi( {
        level: LogLevels.INFO,
        message: JSON.stringify( challengesLogState ),
        context: "RootStack challengesState v1",
        errorType: "0"
      } );
    };

    executeInNewMonth( logChallengesAppState, "2" );
  }, [] );

  useEffect( ( ) => {
    // For every observation the user has, we log the date and the taxonID
    const logChallengesAppState = async () => {
      const realm = await Realm.open( realmConfig );

      const observations = realm.objects( "ObservationRealm" );
      const observationsLogState = observations.map( observation => ( {
        date: observation.date,
        taxonID: observation.taxon.id,
        iconicTaxonId: observation.taxon.iconicTaxonId
      } ) );

      await logToApi( {
        level: LogLevels.INFO,
        message: JSON.stringify( observationsLogState ),
        context: "RootStack observationsState v1",
        errorType: "0"
      } );
    };

    executeInNewMonth( logChallengesAppState, "3" );
  }, [] );
}

export default useAppLog;
