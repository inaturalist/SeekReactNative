// @flow

import { useState, useEffect } from "react";
import Realm from "realm";

import realmConfig from "../../../models";
import taxonIds from "../../../utility/dictionaries/taxonDict";
import { fetchNumberSpeciesSeen } from "../../../utility/helpers";

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

        const allLevels = badges.filtered( "iconicTaxonName == null" ).sorted( "index" );
        const levelsEarned = badges.filtered( "iconicTaxonName == null AND earned == true" ).sorted( "count", true );
        const nextLevel = badges.filtered( "iconicTaxonName == null AND earned == false" ).sorted( "index" );

        fetchNumberSpeciesSeen( ).then( ( species ) => {
          setState( {
            speciesBadges,
            level: levelsEarned.length > 0 ? levelsEarned[0] : allLevels[0],
            nextLevelCount: nextLevel[0] ? nextLevel[0].count : 0,
            badgesEarned,
            speciesCount: species
          } );
        } );
      } catch ( e ) {
        console.log( e, "couldn't open realm: achievements" );
      }
    };
    fetchAchievements( );
  }, [] );

  return state;
};

export default useFetchAchievements;
