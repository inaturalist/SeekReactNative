// @flow
import React from "react";
import { View } from "react-native";
import MapView, { PROVIDER_DEFAULT, UrlTile } from "react-native-maps";

import styles from "../../styles/species";

type Props = {
  region: Object,
  urlTemplate: string
}

const LocationMap = ( { region, urlTemplate }: Props ) => (
  <View style={styles.mapContainer}>
    <MapView
      region={region}
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      zoomEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      maxZoomLevel={7}
    >
      <UrlTile
        urlTemplate={urlTemplate}
      />
    </MapView>
  </View>
);

export default LocationMap;
