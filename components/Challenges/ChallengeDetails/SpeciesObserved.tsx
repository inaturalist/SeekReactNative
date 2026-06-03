import React from "react";
import { View } from "react-native";

import { viewStyles } from "../../../styles/challenges/challengeDetails";
import GreenText from "../../UIComponents/GreenText";
import SpeciesNearbyList from "../../UIComponents/SpeciesNearby/SpeciesNearbyList";
import { useFetchSpeciesObserved } from "../hooks/challengeHooks";

interface Props {
  challenge: object;
}

const SpeciesObserved = ( { challenge }: Props ) => {
  const speciesObserved = useFetchSpeciesObserved( challenge );

  return (
    <>
      <View style={viewStyles.textContainer}>
        <GreenText text="challenges.species_observed" />
      </View>
      <SpeciesNearbyList taxa={speciesObserved} observed />
      <View style={viewStyles.marginSmall} />
    </>
  );
};

export default SpeciesObserved;
