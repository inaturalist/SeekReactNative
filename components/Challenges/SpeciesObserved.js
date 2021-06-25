// @flow

import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Realm from "realm";
import type { Node } from "react";

import { colors } from "../../styles/global";
import styles from "../../styles/challenges/challengeDetails";
import realmConfig from "../../models/index";
import SpeciesNearbyList from "../UIComponents/SpeciesNearby/SpeciesNearbyList";
import LoadingWheel from "../UIComponents/LoadingWheel";
import GreenText from "../UIComponents/GreenText";
import { fetchObservationsAfterChallengeStarted } from "../../utility/challengeHelpers";
import missionsDict from "../../utility/dictionaries/missionsDict";
import taxonDict from "../../utility/dictionaries/taxonDictForMissions";

type Props = {
  +challenge: Object
}

const SpeciesObserved = ( { challenge }: Props ): Node => {
  const [speciesObserved, setSpeciesObserved] = useState( [] );
  const [loading, setLoading] = useState( true );

  useEffect( () => {
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

    const fetchSpeciesObservedForChallenge = () => {
      Realm.open( realmConfig ).then( ( realm ) => {
        const seenTaxa = fetchObservationsAfterChallengeStarted( realm, challenge );

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

        setSpeciesObserved( species );
        setLoading( false );
      } );
    };

    fetchSpeciesObservedForChallenge();
  }, [challenge] );

  return (
    <>
      <View style={styles.textContainer}>
        <GreenText text="challenges.species_observed" />
      </View>
      {loading
        ? <LoadingWheel color={colors.black} />
        : <SpeciesNearbyList taxa={speciesObserved} />}
      <View style={styles.marginSmall} />
    </>
  );
};

export default SpeciesObserved;
