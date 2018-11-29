// @flow
import React from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";

import { colors } from "../../styles/global";
import styles from "../../styles/species";

const markerIcon = ( <Icon name="location-on" size={50} color={colors.tomatoRed} /> );

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
        urlTemplate={`https://api.inaturalist.org/v1/colored_heatmap/{z}/{x}/{y}.png?taxon_id=${id}&color=darkorange`}
      />
      {error ? null : (
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        >
          <Text>{markerIcon}</Text>
        </Marker>
      )}
    </MapView>
  </View>
);

export default LocationMap;
