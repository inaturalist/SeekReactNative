// @flow
import React from "react";
import { View, Image } from "react-native";
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from "react-native-maps";

import icons from "../../assets/icons";
import styles from "../../styles/species/speciesMap";

type Props = {
  region: Object,
  id: number,
  error: string
}

const LocationMap = ( {
  region,
  id,
  error
}: Props ) => (
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
        urlTemplate={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?taxon_id=${id}`}
      />
      {error ? null : (
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        >
          <Image source={icons.locationPin} />
        </Marker>
      )}
    </MapView>
  </View>
);

export default LocationMap;
