import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Realm from "realm";

import { colors } from "../../styles/global";
import styles from "../../styles/challenges/challengeDetails";
import realmConfig from "../../models/index";
import SpeciesNearbyList from "../UIComponents/SpeciesNearby/SpeciesNearbyList";
import LoadingWheel from "../UIComponents/LoadingWheel";
import GreenText from "../UIComponents/GreenText";
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

        // console.log( seenTaxa, "seen taxa" );

        const challengeMonth = missionsDict[challenge.index];
        const challengeMissions = Object.keys( challengeMonth );

        let species = [];

        challengeMissions.forEach( ( mission ) => {
          console.log( challengeMonth[mission], "mission" );
          const { types, number } = challengeMonth[mission];
          types.forEach( ( taxa ) => {
            if ( taxa === "all" ) {
              // show seenTaxa up to the total required to complete the challenge
              species = seenTaxa.splice( 0, number );
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
        // console.log( species, "species in set species" );
        setSpeciesObserved( species );
        setLoading( false );
      } );
    };

    fetchSpeciesObservedForChallenge();
    console.log( challenge, "challenge in use effect" );
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
