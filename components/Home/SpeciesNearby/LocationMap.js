// @flow

import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";

import styles from "../../../styles/home/locationPicker";
import icons from "../../../assets/icons";
import postingIcons from "../../../assets/posting";
import i18n from "../../../i18n";

type Props = {
  region: {
    latitude?: number,
    longitude?: number
  },
  onRegionChange: ( ) => void,
  returnToUserLocation: ( ) => void,
  posting?: boolean
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
        onRegionChangeComplete={onRegionChange}
        provider={PROVIDER_DEFAULT}
        region={region} // need region instead of initial region for return to user location
        style={styles.map}
      />
    )}
    <View pointerEvents="none" style={styles.pinFixed}>
      {posting
        ? <Image source={postingIcons.crosshair} />
        : <Image source={icons.locationPin} style={styles.markerPin} />}
    </View>
    <TouchableOpacity
      accessibilityLabel={i18n.t( "accessibility.user_location" )}
      accessible
      onPress={returnToUserLocation}
      style={styles.locationIcon}
    >
      <Image source={icons.indicator} />
    </TouchableOpacity>
  </View>
);

LocationMap.defaultProps = {
  posting: false
};

export default LocationMap;
