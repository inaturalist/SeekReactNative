// @flow

import { useState, useEffect } from "react";
import Realm from "realm";

import realmConfig from "../../../models";
import { recalculateChallenges, fetchObservationsAfterChallengeStarted } from "../../../utility/challengeHelpers";
import missionsDict from "../../../utility/dictionaries/missionsDict";
import taxonDict from "../../../utility/dictionaries/taxonDictForMissions";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";

const useFetchChallenges = ( ): any => {
  const [list, setList] = useState( [] );

  useEffect( ( ) => {
    const fetchChallenges = ( ) => {
      Realm.open( realmConfig ).then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", true );
        const challengesStarted = challenges.filtered( "startedDate != null AND percentComplete != 100" );
        const challengesNotStarted = challenges.filtered( "startedDate == null" );
        const challengesCompleted = challenges.filtered( "startedDate != null AND percentComplete == 100" );

        const noChallenges = challengesNotStarted.length === 0 && challengesStarted.length === 0;

        if ( noChallenges ) {
          setList( [{
            id: 0,
            data: [],
            header: "",
            empty: ""
          }, {
            id: 1,
            data: challengesCompleted,
            header: "challenges.completed",
            empty: "no_completed_challenges"
          }] );
        } else {
          setList( [{
            id: 0,
            data: challengesStarted,
            header: "challenges.in_progress",
            empty: "no_challenges_in_progress"
          }, {
            id: 1,
            data: challengesNotStarted,
            header: "challenges.not_started",
            empty: "no_new_challenges_header"
          }, {
            id: 2,
            data: challengesCompleted,
            header: "challenges.completed",
            empty: "no_completed_challenges"
          }] );
        }
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
    };
    recalculateChallenges( );
    fetchChallenges( );
  }, [] );

  return list;
};

const useFetchMissions = ( challenge: Object ): any => {
  const [missions, setMissions] = useState( [] );

  useEffect( ( ) => {
    const { numbersObserved } = challenge;
    const missionList = Object.keys( challenge.missions ).map( mission => challenge.missions[mission] );
    const observationsList = Object.keys( numbersObserved ).map( number => numbersObserved[number] );

    const newMissions = missionList.map( ( mission, i ) => ( {
      mission,
      observations: observationsList[i]
    } ) );

    setMissions( newMissions );
  }, [challenge] );

  return missions;
};

const fetchMatchingAncestors = ( seenTaxa, taxaForMission ) => {
  const matchingAncestors = [];

  const taxaWithAncestors = seenTaxa.filter( ( t ) => (
    t.taxon && t.taxon.ancestorIds.length > 0
  ) );

  taxaForMission.forEach( ( taxon ) => {
    taxaWithAncestors.forEach( ( t ) => {
      const { ancestorIds } = t.taxon;
      const ancestors = Object.keys( ancestorIds ).map( ( id ) => ancestorIds[id] );
      if ( ancestors.includes( taxon ) ) {
        matchingAncestors.push( t );
      }
    } );
  } );

  return matchingAncestors;
};

const findSpeciesObserved = ( seenTaxa, challenge ) => {
  const challengeMonth = missionsDict[challenge.index];
  const challengeMissions = Object.keys( challengeMonth );

  let species = [];
  let ancestors = [];
  let taxaForMission = [];

  challengeMissions.forEach( ( mission ) => {
    const { types, number } = challengeMonth[mission];

    // show seenTaxa up to the total required to complete the challenge
    // this applies to the April challenges for 2019 and 2020
    if ( types[0] === "all" ) {
      species = seenTaxa.splice( 0, number );
    } else {
      // show species or iconic taxa
      types.forEach( ( taxa ) => {
        const taxaId = taxonDict[taxa];
        const moreThanOneTaxa = Object.keys( types ).length > 1;
        const taxaTypeSeen = seenTaxa.filter( ( t ) => (
          t.taxon && t.taxon.iconicTaxonId === taxaId
        ) );

        if ( taxaTypeSeen.length > 0 ) {
          if ( !moreThanOneTaxa ) {
            species = species.concat( taxaTypeSeen.splice( 0, number ) );
          } else {
            taxaForMission.push( taxaId );

            if ( taxaForMission.length === Object.keys( types ).length ) {
              // make sure to show the appropriate number of taxa for missions with more than one taxa
              const taxaSeen = seenTaxa.filter( ( t ) => t.taxon && taxaForMission.includes( t.taxon.iconicTaxonId ) );
              species = species.concat( taxaSeen.splice( 0, number ) );

              // reset taxaForMission
              taxaForMission = [];
            }
          }
        } else {
          // look for species within order, family, etc.
          taxaForMission.push( taxaId );

          if ( taxaForMission.length === Object.keys( types ).length ) {
            const matchingAncestors = fetchMatchingAncestors( seenTaxa, taxaForMission );
            ancestors = ancestors.concat( matchingAncestors.splice( 0, number ) );
            species = species.concat( ancestors.splice( 0, number ) );

            // reset taxaForMission
            taxaForMission = [];
          }
        }
      } );
    }
  } );
  return species;
};

const useFetchSpeciesObserved = ( challenge: Object ): Array<Object> => {
  const [speciesObserved, setSpeciesObserved] = useState( [] );

  useEffect( ( ) => {
    const fetchSpeciesObservedForChallenge = ( ) => {
      Realm.open( realmConfig ).then( ( realm ) => {
        const seenTaxa = fetchObservationsAfterChallengeStarted( realm, challenge );
        const species = findSpeciesObserved( seenTaxa, challenge );

        setSpeciesObserved( species );
      } );
    };

    fetchSpeciesObservedForChallenge( );
  }, [challenge] );

  return speciesObserved;
};

const useFetchTruncatedUserCoords = ( ): any => {
  const [coords, setCoords] = useState( {
    latitude: null,
    longitude: null
  } );

  useEffect( ( ) => {
    const fetchTruncatedUserCoords = async ( ) => {
      try {
        const userCoords = await fetchTruncatedUserLocation( );
        setCoords( userCoords );
      } catch ( e ) {
        console.log( e, "error fetching truncated user coords" );
        // do nothing
      }
    };
    fetchTruncatedUserCoords( );
  }, [] );

  return coords;
};


export {
  useFetchChallenges,
  useFetchMissions,
  useFetchSpeciesObserved,
  useFetchTruncatedUserCoords
};
