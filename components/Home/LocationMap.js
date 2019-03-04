// @flow

import React from "react";
import { View, Image, TouchableHighlight } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import styles from "../../styles/home/locationPicker";
import icons from "../../assets/icons";

type Props = {
  region: Object,
  onRegionChange: Function,
  returnToUserLocation: Function
}

const LocationMap = ( {
  region,
  onRegionChange,
  returnToUserLocation
}: Props ) => (
  <View style={{ flex: 1 }}>
    <MapView
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      region={region}
      onRegionChangeComplete={region => onRegionChange( region )}
    />
    <View pointerEvents="none" style={styles.markerFixed}>
      <View style={styles.greenCircle} />
      <Image style={styles.markerPin} source={icons.locationPin} />
    </View>
    <View style={styles.userLocation}>
      <TouchableHighlight
        onPress={() => returnToUserLocation()}
        style={styles.locationIcon}
      >
        <Image source={icons.indicator} />
      </TouchableHighlight>
    </View>
  </View>
);

export default LocationMap;
