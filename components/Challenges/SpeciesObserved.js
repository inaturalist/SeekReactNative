// @flow

import React from "react";
import { View } from "react-native";
import type { Node } from "react";

import { viewStyles } from "../../styles/challenges/challengeDetails";
import SpeciesNearbyList from "../UIComponents/SpeciesNearby/SpeciesNearbyList";
import GreenText from "../UIComponents/GreenText";
import { useFetchSpeciesObserved } from "./hooks/challengeHooks";

type Props = {
  +challenge: Object
}

const SpeciesObserved = ( { challenge }: Props ): Node => {
  const speciesObserved = useFetchSpeciesObserved( challenge );

  return (
    <>
      <View style={viewStyles.textContainer}>
        <GreenText text="challenges.species_observed" />
      </View>
      <SpeciesNearbyList taxa={speciesObserved} />
      <View style={viewStyles.marginSmall} />
    </>
  );
};

export default SpeciesObserved;
