import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import posting from "../../../assets/posting";
import i18n from "../../../i18n";
import { imageStyles, viewStyles } from "../../../styles/home/speciesNearby";
import { baseTextStyles } from "../../../styles/textStyles";
import StyledText from "../../UIComponents/StyledText";

interface Props {
  readonly openLocationPicker: ( ) => void;
  readonly disabled: boolean;
  readonly location: string;
}

const LocationPickerButton = ( {
  openLocationPicker,
  disabled,
  location,
}: Props ) => {
  const locationText = location ? location : i18n.t( "species_nearby.no_location" );
  return (
    <TouchableOpacity
      onPress={openLocationPicker}
      style={[viewStyles.row, viewStyles.locationPickerButton]}
      disabled={disabled}
    >
      <Image source={posting.location} style={imageStyles.image} />
      <View style={viewStyles.whiteButton}>
        <StyledText style={baseTextStyles.buttonGreen}>
          {locationText.toLocaleUpperCase( )}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
};

export default LocationPickerButton;
