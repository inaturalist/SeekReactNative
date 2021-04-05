// @flow

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import type { Node } from "react";

import { colors } from "../../../styles/global";
import styles from "../../../styles/home/speciesNearby";
import posting from "../../../assets/posting";
import LocationPicker from "./LocationPicker";

type Props = {
  latLng: { latitude: ?number, longitude: ?number },
  updateLatLng: Function,
  disabled: boolean,
  location: string
}

const LocationPickerButton = ( {
  latLng,
  updateLatLng,
  disabled,
  location
}: Props ): Node => {
  const { latitude, longitude } = latLng;
  const [showModal, setModal] = useState( false );

  const openLocationPicker = ( ) => setModal( true );
  const closeLocationPicker = ( ) => setModal( false );

  const renderModal = ( ) => (
    <Modal visible={showModal}>
      <LocationPicker
        latitude={latitude}
        location={location}
        longitude={longitude}
        closeLocationPicker={closeLocationPicker}
        updateLatLng={updateLatLng}
      />
    </Modal>
  );

  return (
    <>
      {showModal && renderModal( )}
      <TouchableOpacity
        onPress={openLocationPicker}
        style={[styles.row, styles.locationPickerButton]}
        disabled={disabled}
      >
        {/* $FlowFixMe */}
        <Image source={posting.location} tintColor={colors.white} style={styles.image} />
        <View style={styles.whiteButton}>
          <Text style={styles.buttonText}>
            {location.toLocaleUpperCase( )}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

LocationPickerButton.defaultProps = {
  error: null
};

export default LocationPickerButton;
