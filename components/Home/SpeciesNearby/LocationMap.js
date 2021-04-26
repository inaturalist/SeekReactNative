// @flow

import * as React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import { textStyles, viewStyles, imageStyles } from "../../../styles/home/locationPicker";
import icons from "../../../assets/icons";
import postingIcons from "../../../assets/posting";
import i18n from "../../../i18n";

type Props = {
  region: {
    latitude?: ?number,
    longitude?: ?number,
    latitudeDelta: number,
    longitudeDelta: number
  },
  onRegionChange: ( {
    latitude: number,
    longitude: number,
    longitudeDelta: number
  } ) => void,
  returnToUserLocation: ( ) => void,
  posting?: boolean
}

const LocationMap = ( {
  region,
  onRegionChange,
  returnToUserLocation,
  posting
}: Props ): React.Node => (
  <View style={viewStyles.container}>
    {region.latitude ? (
      <MapView
        onRegionChangeComplete={onRegionChange}
        provider={PROVIDER_DEFAULT}
        region={region} // need region instead of initial region for return to user location
        style={viewStyles.map}
      />
    ) : (
      <View style={viewStyles.textContainer}>
        <Text style={textStyles.text}>
          {i18n.t( "species_nearby.input_location_above_map" )}
        </Text>
      </View>
    )}
    <View pointerEvents="none" style={viewStyles.pinFixed}>
      {posting
        ? <Image source={postingIcons.crosshair} />
        : region.latitude ? <Image source={icons.locationPin} style={imageStyles.markerPin} /> : null}
    </View>
    <TouchableOpacity
      accessibilityLabel={i18n.t( "accessibility.user_location" )}
      accessible
      onPress={returnToUserLocation}
      style={viewStyles.locationIcon}
    >
      <Image source={icons.indicator} />
    </TouchableOpacity>
  </View>
);

LocationMap.defaultProps = {
  posting: false
};

export default LocationMap;
