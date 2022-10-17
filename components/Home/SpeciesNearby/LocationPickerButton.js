// @flow

import React from "react";
import {
  View,
  TouchableOpacity,
  Image
} from "react-native";
import type { Node } from "react";

import { colors } from "../../../styles/global";
import { viewStyles, textStyles, imageStyles } from "../../../styles/home/speciesNearby";
import posting from "../../../assets/posting";
import i18n from "../../../i18n";
import StyledText from "../../UIComponents/StyledText";

type Props = {
  openLocationPicker: ( ) => void,
  disabled: boolean,
  location: string
}

const LocationPickerButton = ( {
  openLocationPicker,
  disabled,
  location
}: Props ): Node => {
  const locationText = location ? location : i18n.t( "species_nearby.no_location" );
  return (
    <TouchableOpacity
      onPress={openLocationPicker}
      style={[viewStyles.row, viewStyles.locationPickerButton]}
      disabled={disabled}
    >
      {/* $FlowFixMe */}
      <Image source={posting.location} tintColor={colors.white} style={imageStyles.image} />
      <View style={viewStyles.whiteButton}>
        <StyledText style={textStyles.buttonText}>
          {locationText.toLocaleUpperCase( )}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
};

export default LocationPickerButton;
