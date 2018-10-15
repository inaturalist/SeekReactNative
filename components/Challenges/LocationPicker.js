// @flow

import React from "react";
import { TouchableHighlight, Text, View } from "react-native";
import MapView from "react-native-maps";

type Props = {
  location: string
}

const LocationPicker = ( { location }: Props ) => (
  <View>
    <Text>Looking for a species in a 50 mile radius around this point:</Text>
    <Text>{location}</Text>
    <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
    <TouchableHighlight>Done</TouchableHighlight>
  </View>
);

export default LocationPicker;
