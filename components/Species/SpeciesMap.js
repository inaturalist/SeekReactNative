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
        urlTemplate={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?taxon_id=${id}&color=darkorange`}
      />
    </MapView>
  </View>
);

export default LocationMap;
