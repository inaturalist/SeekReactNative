// @flow

import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../i18n";
import LocationMap from "../Home/SpeciesNearby/LocationMap";
import { fetchUserLocation } from "../../utility/locationHelpers";
import styles from "../../styles/home/locationPicker";
import headerStyles from "../../styles/uiComponents/greenHeader";
import backStyles from "../../styles/uiComponents/buttons/backArrow";
import icons from "../../assets/icons";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import SafeAreaView from "../UIComponents/SafeAreaView";
import { dimensions } from "../../styles/global";

const latitudeDelta = 0.005; // closer to zoom level on iNaturalist iOS app
const longitudeDelta = 0.005;

type Props = {
  +latitude: number,
  +longitude: number,
  +updateLocation: Function,
  +toggleLocationPicker: Function
}

const LocationPicker = ( {
  latitude,
  longitude,
  updateLocation,
  toggleLocationPicker
}: Props ) => {
  const [accuracy, setAccuracy] = useState( 90 );
  // if user zooms out, accuracy should be higher
  // if user zooms in, accuracy should be lower
  // calculate accuracy based on pixels on screen and lat delta?

  // number of meters on screen
  // number of pixels in the circle picker / radius of circle
  // zoom level or delta

  const [region, setRegion] = useState( {
    latitudeDelta,
    longitudeDelta,
    latitude,
    longitude
  } );

  const handleRegionChange = ( newRegion ) => {
    const sizeOfCrossHairIcon = 127;
    const { width } = dimensions;

    const estimatedAccuracy = newRegion.longitudeDelta * 1000 * (
      ( sizeOfCrossHairIcon / width / 2 ) * 100
    );

    // const estimatedAccuracy = newRegion.longitudeDelta * 10000;
    setRegion( newRegion );
    setAccuracy( estimatedAccuracy );
  };

  const returnToUserLocation = () => {
    fetchUserLocation().then( ( coords ) => {
      if ( coords ) {
        const lat = coords.latitude;
        const long = coords.longitude;
        const newAccuracy = coords.accuracy;

        setRegion( {
          latitude: lat,
          longitude: long,
          latitudeDelta,
          longitudeDelta
        } );
        setAccuracy( newAccuracy );
      }
    } );
  };

  console.log( accuracy, "accuracy in picker" );

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={headerStyles.container}>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.back" )}
          accessible
          onPress={() => toggleLocationPicker()}
          style={backStyles.backButton}
        >
          <Image source={icons.backButton} />
        </TouchableOpacity>
        <Text style={headerStyles.text}>{i18n.t( "posting.edit_location" ).toLocaleUpperCase()}</Text>
      </View>
      <LocationMap
        onRegionChange={handleRegionChange}
        posting
        region={region}
        returnToUserLocation={returnToUserLocation}
      />
      <View style={styles.footer}>
        <View style={styles.margin} />
        <GreenButton
          handlePress={() => updateLocation( region.latitude, region.longitude, accuracy )}
          text="posting.save_location"
        />
      </View>
    </View>
  );
};

export default LocationPicker;
