// @flow
import React, { Component } from "react";
import { View } from "react-native";
import MapView, { PROVIDER_DEFAULT, UrlTile } from "react-native-maps";

import styles from "../../styles/menu/iNatStats";

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

class StatsMap extends Component {
  constructor() {
    super();

    this.state = {
      region: {
        latitude: 30.9,
        longitude: 11.3,
        latitudeDelta,
        longitudeDelta
      }
    };
  }

  render() {
    const { region } = this.state;
    return (
      <View style={styles.mapContainer}>
        <MapView
          // initialRegion={region}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          zoomEnabled
          rotateEnabled={false}
          scrollEnabled
          minZoomLevel={0}
          maxZoomLevel={3}
          mapType="satellite"
        >
          <UrlTile
            urlTemplate="https://api.inaturalist.org/v1/heatmap/{z}/{x}/{y}.png"
          />
        </MapView>
      </View>
    );
  }
}

export default StatsMap;
