// @flow

import React from "react";
import { View, Text } from "react-native";
import type { Node } from "react";

import { viewStyles, textStyles } from "../../../styles/challenges/challengeDetails";
import i18n from "../../../i18n";

type Props = {
  error: string
}

const SpeciesNearbyChallengeError = ( { error }: Props ): Node => {
  const setErrorText = ( ) => {
    let text = null;

    if ( error === "location" ) {
      text = i18n.t( "species_nearby.species_nearby_requires_location" );
    } else if ( error === "emptyList" ) {
      text = i18n.t( "challenges.no_species_nearby" );
    } else {
      text = i18n.t( "challenges.species_nearby_internet_error" );
    }

    return text;
  };

  return (
    <View style={viewStyles.loadingWheelContainer}>
      <Text style={textStyles.speciesNearbyErrorText}>{setErrorText( )}</Text>
    </View>
  );
};

export default SpeciesNearbyChallengeError;
