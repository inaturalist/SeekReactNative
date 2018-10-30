// @flow
import React from "react";
import { View } from "react-native";
import MapView, { PROVIDER_DEFAULT, UrlTile } from "react-native-maps";

import styles from "../../styles/species";

type Props = {
  region: Object,
  id: number
}

const LocationMap = ( { region, id }: Props ) => (
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
        minimumZ={7}
        urlTemplate={`https://api.inaturalist.org/v1/colored_heatmap/0/0/0.png?taxon_id=${id}&color=darkorange&lat=${region.latitude}&lng=${region.longitude}&radius=${10000}`}
      />
    </MapView>
  </View>
);

export default LocationMap;
