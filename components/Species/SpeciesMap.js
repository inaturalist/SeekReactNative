// @flow
import React from "react";
import { View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import styles from "../../styles/species";

type Props = {
  region: Object
}

const LocationMap = ( { region }: Props ) => (
  <View style={styles.mapContainer}>
    <MapView
      region={region}
      provider={PROVIDER_DEFAULT}
      style={styles.map}
    />
  </View>
);

export default LocationMap;
