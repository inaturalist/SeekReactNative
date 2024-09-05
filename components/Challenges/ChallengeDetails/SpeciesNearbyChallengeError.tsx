import React from "react";
import { View } from "react-native";

import { viewStyles, textStyles } from "../../../styles/challenges/challengeDetails";
import i18n from "../../../i18n";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props {
  error: string;
}

const SpeciesNearbyChallengeError = ( { error }: Props ) => {
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
    <>
      <View style={viewStyles.marginMedium} />
      <View style={[
        viewStyles.center,
        viewStyles.speciesNearbyErrorContainer
      ]}>
        <StyledText style={[baseTextStyles.body, textStyles.speciesNearbyErrorText]}>{setErrorText( )}</StyledText>
      </View>
    </>
  );
};

export default SpeciesNearbyChallengeError;
