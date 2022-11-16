// @flow

import { useState, useEffect } from "react";
import inatjs from "inaturalistjs";
import Realm from "realm";

import createUserAgent from "../../../utility/userAgent";
import realmConfig from "../../../models";

const useFetchObservationCount = ( login: ?string, username: string ): any => {
  const [observationCount, setObservationCount] = useState( null );

  useEffect( () => {
    let isCurrent = true;

    const fetchObservationsMadeViaSeekThisYear = async () => {
      // TODO: rewrite to not use API request but local data only, otherwise data from other phones (but same login) would also show here
      const params = {
        oauth_application_id: 333,
        user_id: username,
        // TODO: replace with current year, but make sure if phone is opened in January 2023 it still shows 2022
        year: 2022
      };
      const options = { user_agent: createUserAgent() };
      const response = await inatjs.observations.search( params, options );
      const count = response.total_results;

      if ( isCurrent ) {
        setObservationCount( count );
      }
    };

    if ( login ) {
      fetchObservationsMadeViaSeekThisYear();
    }

    return () => {
      isCurrent = false;
    };
  }, [login, username] );

  return observationCount;
};

const useFetchStats = ( year ): any => {
  const [state, setState] = useState( {
    level: null,
    nextLevelCount: 0,
    countBadgesThisYear: null,
    speciesCount: null,
    countObservationsThisYear: undefined,
    observationsThisYear: [],
    topThreeIconicTaxonIds: [],
    topThreeSpeciesBadges: [],
    randomObservations: []
  } );

  useEffect( () => {
    const fetchStatsFromRealm = async () => {
      try {
        const firstOfYear = () => new Date( year, 0, 1, 0, 0, 0, 0 );
        const lastOfYear = () => new Date( year, 11, 31, 23, 59, 59 );

        const realm = await Realm.open( realmConfig );
        // TODO: TaxonRealm has no observedTime property so we have to check observations Realm instead
        const speciesCount = realm.objects( "TaxonRealm" ).length;
        const observations = realm.objects( "ObservationRealm" );
        const observationsThisYear = observations.filtered(
          "date >= $0 && date < $1",
          firstOfYear( year ),
          lastOfYear( year )
        );
        // TODO: Refactor this count out of this hook into seperate hook, because needed in home screen as well
        const countObservationsThisYear = observationsThisYear.length;
        console.log( "observationsThisYear", observationsThisYear );

        console.log( "observations", observations );
        console.log( "observations[0].taxon", observations[0].taxon );

        // Get ten random observations from this year
        // TODO: observations do not have photos in realm, so we have to take it from taxon, but that could lead to doublettes if multiple observations are saved per taxon
        const randomObservations = [];
        if ( countObservationsThisYear > 10 ) {
          for ( let i = 0; i < 10; i += 1 ) {
            // TODO?: There is a tiny chance that the same observation is picked twice
            const randomIndex = Math.floor(
              Math.random() * observationsThisYear.length
            );
            randomObservations.push( observationsThisYear[randomIndex] );
          }
        } else {
          randomObservations.push( ...observationsThisYear );
        }

        // Get the top three of iconicTaxa observed over the year
        const reduced = observationsThisYear.reduce( ( iconicTaxa, observation ) => {
          const iconicTaxonId = observation.taxon.iconicTaxonId;
          iconicTaxa[iconicTaxonId] = iconicTaxa[iconicTaxonId] + 1 || 1;
          return iconicTaxa;
        }, {} );
        const topThreeIconicTaxonIds = Object.keys( reduced ).sort( ( a, b ) => reduced[b] - reduced[a] ).slice( 0, 3 );
        console.log( "topThreeIconicTaxonIds", topThreeIconicTaxonIds );


        const badges = realm.objects( "BadgeRealm" );
        const badgesThisYear = badges.filtered(
          "earnedDate >= $0 && earnedDate < $1",
          firstOfYear( year ),
          lastOfYear( year )
          );
        console.log( "badgesThisYear", badgesThisYear );
        const countBadgesThisYear = badges.filtered(
          "iconicTaxonName != null AND earned == true"
        ).length;

        const topThreeSpeciesBadges = [];

        topThreeIconicTaxonIds.forEach( ( id ) => {
          if ( id === null ) {
            return;
          }
          const highestEarned = badges
            .filtered( `iconicTaxonName != null AND iconicTaxonId == ${id}` )
            .sorted( "index", true )
            .sorted( "earned", true );
          topThreeSpeciesBadges.push( highestEarned[0] );
        } );

        const levelsEarned = badges
          .filtered( "iconicTaxonName == null AND earned == true" )
          .sorted( "count", true );
        const nextLevel = badges
          .filtered( "iconicTaxonName == null AND earned == false" )
          .sorted( "index" );

        setState( {
          level: levelsEarned[0],
          nextLevelCount: nextLevel[0] ? nextLevel[0].count : 0,
          countBadgesThisYear,
          speciesCount,
          countObservationsThisYear,
          observationsThisYear,
          topThreeIconicTaxonIds,
          topThreeSpeciesBadges,
          randomObservations
        } );
      } catch ( e ) {
        console.log( e, "couldn't open realm: achievements" );
      }
    };
    fetchStatsFromRealm();
  }, [year] );

  return state;
};


export { useFetchObservationCount, useFetchStats };
