// @flow

import React from "react";
import { Image, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import styles from "../../styles/locationPicker";
import marker from "../../assets/marker.png";

type Props = {
  region: Object,
  onRegionChange: Function
}


const LocationMap = ( { region, onRegionChange }: Props ) => (
  <View style={{ flex: 1 }}>
    <MapView
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      region={region}
      onRegionChangeComplete={region => onRegionChange( region )}
    />
    <View pointerEvents="none" style={styles.markerFixed}>
      <Image style={styles.marker} source={marker} />
    </View>
  </View>
);

export default LocationMap;
