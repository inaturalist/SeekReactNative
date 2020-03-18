// @flow

import React from "react";
import { View, Image, TouchableHighlight } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import styles from "../../../styles/home/locationPicker";
import icons from "../../../assets/icons";
import postingIcons from "../../../assets/posting";
import i18n from "../../../i18n";

type Props = {
  +region: Object,
  +onRegionChange: Function,
  +returnToUserLocation: Function,
  +posting?: boolean
}

const LocationMap = ( {
  region,
  onRegionChange,
  returnToUserLocation,
  posting
}: Props ) => (
  <View style={styles.container}>
    {region.latitude && (
      <MapView
        onRegionChangeComplete={r => onRegionChange( r )}
        provider={PROVIDER_DEFAULT}
        initialRegion={region}
        style={styles.map}
        loadingEnabled
      />
    )}
    <View pointerEvents="none" style={posting ? styles.markerFixed : styles.pinFixed}>
      {posting
        ? <Image source={postingIcons.crosshair} />
        : <Image source={icons.locationPin} style={styles.markerPin} />}
    </View>
    <View style={styles.userLocation}>
      <TouchableHighlight
        accessibilityLabel={i18n.t( "accessibility.user_location" )}
        accessible
        onPress={() => returnToUserLocation()}
        style={styles.locationIcon}
      >
        <Image source={icons.indicator} />
      </TouchableHighlight>
    </View>
  </View>
);

LocationMap.defaultProps = {
  posting: false
};

export default LocationMap;
