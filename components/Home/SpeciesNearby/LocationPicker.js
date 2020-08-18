// @flow

import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  Platform
} from "react-native";
import Geocoder from "react-native-geocoder";
import { useSafeArea } from "react-native-safe-area-context";

import i18n from "../../../i18n";
import LocationMap from "./LocationMap";
import { truncateCoordinates, fetchTruncatedUserLocation, fetchLocationName } from "../../../utility/locationHelpers";
import posting from "../../../assets/posting";
import { colors } from "../../../styles/global";
import styles from "../../../styles/home/locationPicker";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import BackArrow from "../../UIComponents/Buttons/BackArrowModal";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  +latitude: ?number,
  +longitude: ?number,
  +location: ?string,
  +updateLatLng: Function,
  +closeLocationPicker: Function
}

const LocationPicker = ( {
  latitude,
  longitude,
  location,
  updateLatLng,
  closeLocationPicker
}: Props ) => {
  const insets = useSafeArea();
  const [region, setRegion] = useState( {
    latitudeDelta,
    longitudeDelta,
    latitude,
    longitude
  } );

  const [inputLocation, setInputLocation] = useState( location );

  const setCoordsByLocationName = ( newLocation ) => {
    Geocoder.geocodeAddress( newLocation ).then( ( result ) => {
      if ( result.length === 0 ) {
        return;
      }
      const { locality, subAdminArea, position } = result[0];
      const { lng, lat } = position;

      setInputLocation( locality || subAdminArea );
      setRegion( {
        latitude: lat,
        longitude: lng,
        latitudeDelta,
        longitudeDelta
      } );
    } ).catch( ( e ) => {
      console.log( e, "error" );
    } );
  };

  const reverseGeocodeLocation = ( lat, lng ) => {
    fetchLocationName( lat, lng ).then( ( newLocation ) => {
      if ( newLocation === null ) {
        setInputLocation( i18n.t( "location_picker.undefined" ) );
      } else if ( inputLocation !== newLocation ) {
        setInputLocation( newLocation );
      }
    } ).catch( ( e ) => {
      console.log( e, "error" );
    } );
  };

  const handleRegionChange = ( newRegion ) => {
    if ( Platform.OS === "android" ) {
      reverseGeocodeLocation( newRegion.latitude, newRegion.longitude );
    }

    setRegion( newRegion );
  };

  const returnToUserLocation = () => {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const lat = coords.latitude;
        const long = coords.longitude;
        reverseGeocodeLocation( lat, long );

        setRegion( {
          latitude: lat,
          longitude: long,
          latitudeDelta,
          longitudeDelta
        } );
      }
    } );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackArrow handlePress={closeLocationPicker} />
        <View style={styles.marginLarge} />
        <Text style={styles.headerText}>
          {i18n.t( "location_picker.species_nearby" ).toLocaleUpperCase()}
        </Text>
        <View style={[styles.row, styles.inputRow]}>
          {/* $FlowFixMe */}
          <Image source={posting.location} tintColor={colors.white} style={styles.white} />
          <TextInput
            accessibilityLabel={inputLocation}
            accessible
            autoCapitalize="words"
            onChangeText={text => setCoordsByLocationName( text )}
            placeholder={inputLocation}
            placeholderTextColor={colors.placeholderGray}
            style={styles.inputField}
            textContentType="addressCity"
          />
        </View>
      </View>
      <LocationMap
        onRegionChange={handleRegionChange}
        region={region}
        returnToUserLocation={returnToUserLocation}
      />
      <View style={styles.footer}>
        <GreenButton
          handlePress={() => {
            updateLatLng(
              truncateCoordinates( region.latitude ),
              truncateCoordinates( region.longitude )
            );
            closeLocationPicker();
          }}
          letterSpacing={0.68}
          text="location_picker.button"
        />
      </View>
    </View>
  );
};

export default LocationPicker;
