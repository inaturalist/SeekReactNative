// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/header";
import TaxonPicker from "./TaxonPicker";
import icons from "../../assets/icons";
import LocationPicker from "./LocationPicker";

type Props = {
  +location: ?string,
  +updateTaxaType: Function,
  +toggleLocationPicker: Function,
  +modalVisible: boolean,
  +latitude: ?number,
  +longitude: ?number,
  +updateLocation: Function
}

const SpeciesNearbyHeader = ( {
  location,
  updateTaxaType,
  toggleLocationPicker,
  modalVisible,
  latitude,
  longitude,
  updateLocation
}: Props ) => (
  <View style={styles.container}>
    <Modal visible={modalVisible}>
      <LocationPicker
        latitude={latitude}
        location={location}
        longitude={longitude}
        toggleLocationPicker={toggleLocationPicker}
        updateLocation={updateLocation}
      />
    </Modal>
    <Text style={[styles.headerText, styles.header]}>
      {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
    </Text>
    <TouchableOpacity
      onPress={() => toggleLocationPicker()}
      style={[styles.row, styles.marginLeft, styles.paddingBottom, styles.paddingTop]}
    >
      <Image source={icons.locationWhite} style={styles.image} />
      <View style={styles.whiteButton}>
        {location
          ? <Text style={styles.buttonText}>{location.toLocaleUpperCase()}</Text>
          : <Text style={styles.buttonText}>{i18n.t( "species_nearby.no_location" ).toLocaleUpperCase()}</Text>}
      </View>
    </TouchableOpacity>
    <TaxonPicker updateTaxaType={updateTaxaType} />
    <View style={styles.marginBottom} />
  </View>
);

export default SpeciesNearbyHeader;
