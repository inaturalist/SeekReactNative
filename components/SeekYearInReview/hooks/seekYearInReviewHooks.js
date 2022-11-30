// @flow

import { useState, useEffect } from "react";
import Realm from "realm";
import { addMonths, isEqual } from "date-fns";

import realmConfig from "../../../models";

const useCountObservationsForYear = ( year ): any => {
  const [countObservationsThisYear, setCountObservationsThisYear] = useState( null );

  useEffect( () => {
    const fetchCount = async () => {
      try {
        const firstOfYear = () => new Date( year, 0, 1, 0, 0, 0, 0 );
        const lastOfYear = () => new Date( year, 11, 31, 23, 59, 59 );

        const realm = await Realm.open( realmConfig );
        const observations = realm.objects( "ObservationRealm" );
        const observationsThisYear = observations.filtered(
          "date >= $0 && date < $1",
          firstOfYear( year ),
          lastOfYear( year )
        );
        // TODO: Refactor this count out of this hook into seperate hook, because needed in home screen as well
        const count = observationsThisYear.length;
        setCountObservationsThisYear( count );
      } catch ( e ) {
        console.log( e, "couldn't open realm for counting observations for year" );
      }
    };
    fetchCount();
  }, [year] );

  return countObservationsThisYear;
};

const useObservationsForYear = ( year ): any => {
  const [observationsForYear, setObservationsThisYear] = useState( null );
  useEffect( () => {
    const fetchObservations = async () => {
      try {
        const firstOfYear = () => new Date( year, 0, 1, 0, 0, 0, 0 );
        const lastOfYear = () => new Date( year, 11, 31, 23, 59, 59 );

        const realm = await Realm.open( realmConfig );
        const observations = realm.objects( "ObservationRealm" );
        const observationsYear = observations.filtered(
          "date >= $0 && date < $1",
          firstOfYear( year ),
          lastOfYear( year )
        );
        setObservationsThisYear( observationsYear );
      } catch ( e ) {
        console.log( e, "couldn't open realm for fetching observations for year" );
      }
    };
    fetchObservations();
  }, [year] );

  return observationsForYear;
};

const useFetchStats = ( year ): any => {
  const [state, setState] = useState( {
    level: null,
    observationsThisYear: [],
    topThreeSpeciesBadges: [],
    randomObservations: [],
    histogram: [],
    // TODO: this is the same as in useFetchAchievements, refactor out
    speciesCount: null
  } );

  useEffect( () => {
    const fetchStatsFromRealm = async () => {
      try {
        const firstOfYear = () => new Date( year, 0, 1, 0, 0, 0, 0 );
        const lastOfYear = () => new Date( year, 11, 31, 23, 59, 59 );

        const realm = await Realm.open( realmConfig );

        const speciesCount = realm.objects( "TaxonRealm" ).length;

        // TODO: get observations from above useObservationsForYear hook
        const observations = realm.objects( "ObservationRealm" );
        const observationsThisYear = observations.filtered(
          "date >= $0 && date < $1",
          firstOfYear( year ),
          lastOfYear( year )
        );
        const countObservationsThisYear = observationsThisYear.length;

        function getRandom( arr, n ) {
          let len = arr.length;
          const result = new Array( n ),
            taken = new Array( len );
          if ( n > len )
            {throw new RangeError(
              "getRandom: more elements taken than available"
            );}
          while ( n-- ) {
            const x = Math.floor( Math.random() * len );
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
          }
          return result;
        }
        // Get ten random observations from this year
        let randomObservations = [];
        if ( countObservationsThisYear > 10 ) {
          randomObservations = getRandom( observationsThisYear, 10 );
        } else {
          randomObservations = observationsThisYear;
        }

        // Get the top three of iconicTaxa observed over the year
        const reduced = observationsThisYear.reduce(
          ( iconicTaxa, observation ) => {
            const iconicTaxonId = observation.taxon.iconicTaxonId;
            iconicTaxa[iconicTaxonId] = iconicTaxa[iconicTaxonId] + 1 || 1;
            return iconicTaxa;
          },
          {}
        );
        const topThreeIconicTaxonIds = Object.keys( reduced )
          .sort( ( a, b ) => reduced[b] - reduced[a] )
          .slice( 0, 3 );

        const topThreeSpeciesBadges = [];
        const badges = realm.objects( "BadgeRealm" );
        topThreeIconicTaxonIds.forEach( ( id ) => {
          if ( id === null ) {
            return;
          }
          const highestEarned = badges
            .filtered( `iconicTaxonName != null AND iconicTaxonId == ${id}` )
            .sorted( "index", true )
            .sorted( "earned", true );
          const highestEarnedBadge = highestEarned[0];
          // Add the number of observations for this year to the badge info
          highestEarnedBadge.observationsThisYear = reduced[id];
          topThreeSpeciesBadges.push( highestEarnedBadge );
        } );

        const levelsEarned = badges
          .filtered( "iconicTaxonName == null AND earned == true" )
          .sorted( "count", true );

        // Get histogram data
        const histogram = observationsThisYear.reduce( ( data, observation ) => {
          const month = observation.date.getMonth();
          data[month] = { count: data[month]?.count + 1 || 1, month: month + 1  };
          return data;
        }, [] );
        for ( let i = 0; i < 12; i++ ) {
          if ( histogram[i] === undefined ) {
            histogram[i] = { count: 0, month: i + 1 };
          }
        }

        setState( {
          level: levelsEarned[0],
          observationsThisYear,
          topThreeSpeciesBadges,
          randomObservations,
          histogram,
          speciesCount
        } );
      } catch ( e ) {
        console.log( e, "couldn't open realm for fetching year in review stats" );
      }
    };
    fetchStatsFromRealm();
  }, [year] );

  return state;
};

const useFetchChallengesForYear = ( year ): any => {
  const [challengeBadges, setChallengeBadges] = useState( [] );
  const [challengeCount, setChallengeCount] = useState( undefined );

  useEffect( () => {
    const createBadge = ( latestBadge, numOfMonths ) => ( {
      name: "",
      availableDate: addMonths( latestBadge.availableDate, numOfMonths ),
      index: latestBadge.index + numOfMonths
    } );

    const createPlaceholderBadges = ( badges ) => {
      const remainderOfBadges = badges.length % 5;

      if ( remainderOfBadges === 0 || remainderOfBadges === 3 ) {
        // no placeholders needed
        return badges;
      }

      const badgePlaceholders = badges;
      const latestBadge = badges[badges.length - 1];

      let nextBadge = createBadge( latestBadge, 1 );

      // next challenge after June 2021 will be released Aug 2021
      if ( isEqual( new Date( 2021, 5, 1 ), new Date( latestBadge.availableDate ) ) ) {
        nextBadge = createBadge( latestBadge, 2 );
      }

      const badgeAfterNext = createBadge( nextBadge, 1 );

      if ( remainderOfBadges === 2 || remainderOfBadges === 4 ) {
        badgePlaceholders.push( nextBadge );
      }

      if ( remainderOfBadges === 1 ) {
        badgePlaceholders.push( nextBadge, badgeAfterNext );
      }

      return badgePlaceholders;
    };

    const fetchChallenges = async () => {
      try {
        // TODO: refactor into useCallbacks
        const firstOfYear = () => new Date( year, 0, 1, 0, 0, 0, 0 );
        const lastOfYear = () => new Date( year, 11, 31, 23, 59, 59 );

        const realm = await Realm.open( realmConfig );
        const challenges = realm
          .objects( "ChallengeRealm" )
          .filtered(
            "completedDate >= $0 && completedDate < $1",
            firstOfYear( year ),
            lastOfYear( year )
          )
          .sorted( "availableDate", false );
        const badges = challenges.map( ( challenge ) => challenge );
        setChallengeCount( badges.length );
        const badgesWithPlaceholders = createPlaceholderBadges( badges );
        setChallengeBadges( badgesWithPlaceholders );
      } catch ( e ) {
        console.log( e, "couldn't open realm: for fetching challenges for year in review" );
      }
    };
    fetchChallenges();
  }, [year] );

  return {challengeBadges, challengeCount};
};

export {
  useFetchStats,
  useCountObservationsForYear,
  useObservationsForYear,
  useFetchChallengesForYear
};
