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
import { useLocationName } from "../../../utility/customHooks";

type Props = {
  latitude: ?number,
  longitude: ?number,
  updateLocation: Function,
  error?: ?string
}

const LocationPickerButton = ( {
  latitude,
  longitude,
  updateLocation,
  error
}: Props ) => {
  const [showModal, setModal] = useState( false );
  const location = useLocationName( latitude, longitude );

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
          updateLocation={updateLocation}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => openLocationPicker()}
        style={[styles.row, styles.marginLeft, styles.paddingBottom, styles.paddingTop]}
        disabled={error !== null}
      >
        <Image source={icons.locationWhite} style={styles.image} />
        <View style={styles.whiteButton}>
          <Text style={styles.buttonText}>
            {location
              ? location.toLocaleUpperCase()
              : i18n.t( "species_nearby.no_location" ).toLocaleUpperCase()}
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
