// @flow

import React, { useState, useCallback } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal
} from "react-native";
import type { Node } from "react";

import { colors } from "../../../styles/global";
import styles from "../../../styles/posting/postToiNat";
import i18n from "../../../i18n";
import posting from "../../../assets/posting";
import icons from "../../../assets/icons";
import LocationPicker from "./LocationPicker";
import { truncateCoordinates } from "../../../utility/locationHelpers";

type Props = {
  location: ?string,
  updateLocation: ( ) => void,
  observation: {
    observed_on_string: ?string,
    taxon_id: ?number,
    geoprivacy: string,
    captive_flag: boolean,
    place_guess: ?string,
    latitude: ?number,
    longitude: ?number,
    positional_accuracy: ?number,
    description: ?string,
    vision: boolean
  }
}

const LocationPickerCard = ( { location, updateLocation, observation }: Props ): Node => {
  const [showModal, setShowModal] = useState( false );

  const openModal = ( ) => setShowModal( true );
  const closeModal = useCallback( ( ) => setShowModal( false ), [] );

  const latString = observation.latitude && truncateCoordinates( observation.latitude );
  const longString = observation.longitude && truncateCoordinates( observation.longitude );

  const coordinateString = ( latString && longString )
    ? `${i18n.t( "posting.latitude_longitude", { latitude: latString, longitude: longString } )}`
    : null;

  return (
    <>
      <Modal
        onRequestClose={closeModal}
        visible={showModal}
      >
        <LocationPicker
          latitude={observation.latitude}
          longitude={observation.longitude}
          closeLocationPicker={closeModal}
          updateLocation={updateLocation}
        />
      </Modal>
      <TouchableOpacity
        onPress={openModal}
        style={styles.thinCard}
      >
        <Image source={posting.location} style={styles.extraMargin} />
        <View style={styles.row}>
          <Text style={styles.greenText}>
            {i18n.t( "posting.location" ).toLocaleUpperCase( )}
          </Text>
          <Text style={styles.text}>
            {location || i18n.t( "location_picker.undefined" )}
          </Text>
          {coordinateString && <Text style={styles.coordsText}>{coordinateString}</Text>}
        </View>
        {/* $FlowFixMe */}
        <Image
          source={icons.backButton}
          tintColor={colors.seekForestGreen}
          style={[styles.buttonIcon, styles.rotate]}
        />
      </TouchableOpacity>
    </>
  );
};

export default LocationPickerCard;
