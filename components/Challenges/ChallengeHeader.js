// @flow

import React from "react";

import {
  TouchableOpacity,
  Text,
  View
} from "react-native";


import styles from "../../styles/challenges";

type Props = {
  navigation: any,
  latitude: number,
  loading: boolean,
  longitude: number,
  location: string,
  setTaxonId: Function,
  taxaType: string,
  updateLocation: Function,
  reverseGeocodeLocation: Function
}

const ChallengeHeader = ( {
  navigation,
  latitude,
  loading,
  longitude,
  location,
  setTaxonId,
  taxaType,
  updateLocation
}: Props ) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Species you&apos;re most likely to see near: </Text>
    <TouchableOpacity
      style={styles.locationChooser}
      onPress={() => navigation.navigate( "Location", {
        location,
        latitude,
        longitude,
        updateLocation
      } )}
    >
      { loading ? (
        <Text style={styles.locationChooserText}>Loading...</Text>
      ) : (
        <Text style={styles.locationChooserText}>{location} &#9660;</Text>
      )}
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.taxonChooser}
      onPress={() => navigation.navigate( "Taxon", { setTaxonId } )}
    >
      <Text style={styles.taxonChooserText}>{taxaType} &#9660;</Text>
    </TouchableOpacity>
  </View>
);

export default ChallengeHeader;
