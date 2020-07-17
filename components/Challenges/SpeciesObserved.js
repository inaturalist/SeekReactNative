import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Realm from "realm";

import { colors } from "../../styles/global";
import realmConfig from "../../models/index";
import SpeciesNearbyList from "../UIComponents/SpeciesNearby/SpeciesNearbyList";
import LoadingWheel from "../UIComponents/LoadingWheel";
import SpeciesDetailCard from "../UIComponents/SpeciesDetailCard";
import { fetchObservationsAfterChallengeStarted, checkForAncestors } from "../../utility/challengeHelpers";
import missionsDict from "../../utility/dictionaries/missionsDict";
import taxonDict from "../../utility/dictionaries/taxonDictForMissions";

type Props = {
  +challenge: Object
}

const SpeciesObserved = ( { challenge }: Props ) => {
  const [speciesObserved, setSpeciesObserved] = useState( [] );
  const [loading, setLoading] = useState( true );

  useEffect( () => {
    const fetchSpeciesObservedForChallenge = () => {
      Realm.open( realmConfig ).then( ( realm ) => {
        const seenTaxa = fetchObservationsAfterChallengeStarted( realm, challenge );

        console.log( seenTaxa, "seen taxa" );

        const challengeMonth = missionsDict[challenge.index];
        const challengeMissions = Object.keys( challengeMonth );

        let species = [];

        challengeMissions.forEach( ( mission ) => {
          const { types } = challengeMonth[mission];
          types.forEach( ( taxa ) => {
            // let taxaPerMission;

            if ( taxa === "all" ) {
              species = seenTaxa;
            } else {
              const taxaId = taxonDict[taxa];
              const taxaTypeSeen = seenTaxa.filter( ( t ) => (
                t.taxon && t.taxon.iconicTaxonId === taxaId
              ) );
              const matchingAncestors = checkForAncestors( seenTaxa, taxaId );
              if ( taxaTypeSeen.length > 0 ) {
                species.concat( taxaTypeSeen );
                // taxaPerMission = taxaTypeSeen.length;
              } else if ( matchingAncestors.length > 0 ) {
                species.concat( matchingAncestors );
                // taxaPerMission = matchingAncestors.length;
              // } else {
              //   taxaPerMission = 0;
              }
            }
          } );
        } );
        console.log( species, "species in set species" );
        setSpeciesObserved( species );
        setLoading( false );
      } );
    };

    fetchSpeciesObservedForChallenge();
    console.log( challenge, "challenge in use effect" );
  }, [challenge] );

  console.log( speciesObserved, "observed" );

  return (
    <SpeciesDetailCard text="challenges.species_observed">
      {/* <LoadingWheel color={colors.black} /> */}
      {loading
        ? <LoadingWheel color={colors.black} />
        : <SpeciesNearbyList taxa={speciesObserved} />}
    </SpeciesDetailCard>
  );
};

export default SpeciesObserved;
