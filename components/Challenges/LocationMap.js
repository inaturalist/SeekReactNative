import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import styles from "../../styles/locationPicker";

const LocationMap = ( { latitude, longitude } ) => (
  <MapView
    provider={PROVIDER_DEFAULT}
    style={styles.map}
    initialRegion={{
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }}
  />
);

export default LocationMap;
