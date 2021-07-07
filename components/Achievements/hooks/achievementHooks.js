// @flow

import { useState, useEffect } from "react";
import Realm from "realm";
import { addMonths, isEqual } from "date-fns";

import realmConfig from "../../../models";
import taxonIds from "../../../utility/dictionaries/taxonDict";

const useFetchAchievements = ( ): any => {
  const [state, setState] = useState( {
    speciesBadges: [],
    level: null,
    nextLevelCount: 0,
    badgesEarned: null,
    speciesCount: null
  } );

  useEffect( ( ) => {
    const fetchAchievements = async ( ) => {
      try {
        const realm = await Realm.open( realmConfig );
        const speciesCount = realm.objects( "TaxonRealm" ).length;
        const badges = realm.objects( "BadgeRealm" );
        const badgesEarned = badges.filtered( "iconicTaxonName != null AND earned == true" ).length;
        const iconicTaxonIds = Object.keys( taxonIds ).map( id => taxonIds[id] );

        const speciesBadges = [];

        iconicTaxonIds.forEach( ( id ) => {
          if ( id === null ) { return; }
          const highestEarned = badges
            .filtered( `iconicTaxonName != null AND iconicTaxonId == ${id}` )
            .sorted( "index", true )
            .sorted( "earned", true );
          speciesBadges.push( highestEarned[0] );
        } );

        const levelsEarned = badges.filtered( "iconicTaxonName == null AND earned == true" ).sorted( "count", true );
        const nextLevel = badges.filtered( "iconicTaxonName == null AND earned == false" ).sorted( "index" );

        setState( {
          speciesBadges,
          level: levelsEarned[0],
          nextLevelCount: nextLevel[0] ? nextLevel[0].count : 0,
          badgesEarned,
          speciesCount
        } );
      } catch ( e ) {
        console.log( e, "couldn't open realm: achievements" );
      }
    };
    fetchAchievements( );
  }, [] );

  return state;
};

const useFetchChallenges = ( ): any => {
  const [challengeBadges, setChallengeBadges] = useState( [] );

  useEffect( ( ) => {
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

    const fetchChallenges = async ( ) => {
      try {
        const realm = await Realm.open( realmConfig );
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", false );
        const badges = challenges.map( ( challenge ) => challenge );
        const badgesWithPlaceholders = createPlaceholderBadges( badges );
        setChallengeBadges( badgesWithPlaceholders );
      } catch ( e ) {
        console.log( e, "couldn't open realm: achievements" );
      }
    };
    fetchChallenges( );
  }, [] );

  return challengeBadges;
};

export {
  useFetchAchievements,
  useFetchChallenges
};
