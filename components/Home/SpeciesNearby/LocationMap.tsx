import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_DEFAULT, Region } from "react-native-maps";

import { textStyles, viewStyles, imageStyles } from "../../../styles/home/locationPicker";
import icons from "../../../assets/icons";
import postingIcons from "../../../assets/posting";
import i18n from "../../../i18n";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props {
  region: {
    latitude: number | null;
    longitude: number | null;
    latitudeDelta: number;
    longitudeDelta: number;
  },
  onRegionChange: ( region: Region ) => void;
  returnToUserLocation: ( ) => void;
  posting?: boolean;
}

const LocationMap = ( {
  region,
  onRegionChange,
  returnToUserLocation,
  posting = false
}: Props ) => (
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
        <StyledText style={[baseTextStyles.body, textStyles.text]}>
          {i18n.t( "species_nearby.input_location_above_map" )}
        </StyledText>
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

export default LocationMap;
