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
      text = i18n.t( "challenges.no_location" );
    } else if ( error === "emptyList" ) {
      text = i18n.t( "challenges.no_species_nearby" );
    } else {
      text = i18n.t( "challenges.no_internet" );
    }

    return text;
  };

  return (
    <View style={viewStyles.loadingWheelContainer}>
      <Text style={textStyles.text}>{setErrorText( )}</Text>
    </View>
  );
};

export default SpeciesNearbyChallengeError;
