import React, { Component } from "react";
import { Image, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import styles from "../../styles/locationPicker";
import marker from "../../assets/marker.png";

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

class LocationMap extends Component {
  constructor( { latitude, longitude } ) {
    super();

    this.state = {
      region: {
        latitudeDelta,
        longitudeDelta,
        latitude,
        longitude
      }
    };
  }

  onRegionChange( region ) {
    this.setState( {
      region
    } );
  }

  render() {
    const { region } = this.state;

    return (
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
  }
}

export default LocationMap;
