// @flow

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";

import styles from "../../../styles/home/speciesNearby";
import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import LocationPicker from "./LocationPicker";

type Props = {
  latitude: ?number,
  longitude: ?number,
  updateLatLng: Function,
  error?: ?string,
  location: ?string
}

const LocationPickerButton = ( {
  latitude,
  longitude,
  updateLatLng,
  error,
  location
}: Props ) => {
  const [showModal, setModal] = useState( false );

  const openLocationPicker = () => setModal( true );
  const closeLocationPicker = () => setModal( false );

  return (
    <>
      <Modal visible={showModal}>
        <LocationPicker
          latitude={latitude}
          location={location}
          longitude={longitude}
          closeLocationPicker={closeLocationPicker}
          updateLatLng={updateLatLng}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => openLocationPicker()}
        style={[styles.row, styles.marginLeft, styles.paddingBottom]}
        disabled={error !== null}
      >
        <Image source={icons.locationWhite} style={styles.image} />
        <Text style={[styles.buttonText, styles.whiteButton]}>
          {location
            ? location.toLocaleUpperCase()
            : i18n.t( "species_nearby.no_location" ).toLocaleUpperCase()}
        </Text>
      </TouchableOpacity>
    </>
  );
};

LocationPickerButton.defaultProps = {
  error: null
};

export default LocationPickerButton;
