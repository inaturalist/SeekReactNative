// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import type { Node } from "react";

import { colors } from "../../../styles/global";
import styles from "../../../styles/home/speciesNearby";
import posting from "../../../assets/posting";
import i18n from "../../../i18n";

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
      style={[styles.row, styles.locationPickerButton]}
      disabled={disabled}
    >
      {/* $FlowFixMe */}
      <Image source={posting.location} tintColor={colors.white} style={styles.image} />
      <View style={styles.whiteButton}>
        <Text style={styles.buttonText}>
          {locationText.toLocaleUpperCase( )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LocationPickerButton;
