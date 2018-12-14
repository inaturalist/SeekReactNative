// @flow

import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import NavIcon from "react-native-vector-icons/Feather";

import styles from "../../styles/locationPicker";
import { colors } from "../../styles/global";

const markerIcon = ( <Icon name="location-on" size={70} color={colors.iNatGreen} /> );
const locationIcon = ( <NavIcon name="navigation" size={30} color={colors.white} /> );

type Props = {
  region: Object,
  onRegionChange: Function,
  returnToUserLocation: Function
}

const LocationMap = ( {
  region,
  onRegionChange,
  returnToUserLocation
}: Props ) => (
  <View style={{ flex: 1 }}>
    <MapView
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      region={region}
      onRegionChangeComplete={region => onRegionChange( region )}
    />
    <View pointerEvents="none" style={styles.markerFixed}>
      <Text>{markerIcon}</Text>
    </View>
    <TouchableHighlight
      onPress={() => returnToUserLocation()}
      style={styles.locationIcon}
    >
      <Text>{locationIcon}</Text>
    </TouchableHighlight>
  </View>
);

export default LocationMap;
