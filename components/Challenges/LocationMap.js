// @flow

import React from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "../../styles/locationPicker";
import { colors } from "../../styles/global";

const markerIcon = ( <Icon name="location-on" size={70} color={colors.iNatGreen} /> );

type Props = {
  region: Object,
  onRegionChange: Function
}


const LocationMap = ( { region, onRegionChange }: Props ) => (
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
  </View>
);

export default LocationMap;
