// @flow

import React, { useState, useCallback } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal
} from "react-native";

import { colors } from "../../../styles/global";
import styles from "../../../styles/posting/postToiNat";
import i18n from "../../../i18n";
import posting from "../../../assets/posting";
import icons from "../../../assets/icons";
import LocationPicker from "./LocationPicker";

type Props = {
  location: ?string,
  updateLocation: Function,
  image: Object
}

const LocationPickerCard = ( { location, updateLocation, image }: Props ) => {
  const [showModal, setShowModal] = useState( false );

  const openModal = () => setShowModal( true );
  const closeModal = useCallback( () => setShowModal( false ), [] );

  return (
    <>
      <Modal
        onRequestClose={() => closeModal()}
        visible={showModal}
      >
        <LocationPicker
          latitude={image.latitude}
          longitude={image.longitude}
          closeLocationPicker={closeModal}
          updateLocation={updateLocation}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => openModal()}
        style={styles.thinCard}
      >
        <Image source={posting.location} style={[styles.icon, styles.extraMargin]} />
        <View style={styles.row}>
          <Text style={styles.greenText}>
            {i18n.t( "posting.location" ).toLocaleUpperCase()}
          </Text>
          <Text style={styles.text}>
            {location || i18n.t( "location_picker.undefined" )}
          </Text>
        </View>
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
