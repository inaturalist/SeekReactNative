import React from "react";
import { Image, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import styles from "../../styles/locationPicker";
import marker from "../../assets/marker.png";


const LocationMap = ( { region, onRegionChange } ) => (
  <View style={{ flex: 1 }}>
    <MapView
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      region={region}
    />
    <View pointerEvents="none" style={styles.markerFixed}>
      <Image style={styles.marker} source={marker} />
    </View>
  </View>
);

export default LocationMap;
