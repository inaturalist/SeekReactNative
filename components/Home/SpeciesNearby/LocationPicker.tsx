// @flow

import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../../i18n";
import LocationMap from "./LocationMap";
import { truncateCoordinates, fetchTruncatedUserLocation, fetchLocationName, createAlertUserLocationOnMaps, fetchCoordsByLocationName } from "../../../utility/locationHelpers";
import posting from "../../../assets/posting";
import { colors } from "../../../styles/global";
import { textStyles, viewStyles, imageStyles } from "../../../styles/home/locationPicker";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import BackArrow from "../../UIComponents/Buttons/BackArrowModal";
import StyledText from "../../UIComponents/StyledText";
import { useSpeciesNearby } from "../../Providers/SpeciesNearbyProvider";
import { baseTextStyles } from "../../../styles/textStyles";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

interface Props {
  updateLatLng: ( lat: number, lng: number ) => void;
  closeLocationPicker: ( ) => void;
}

const LocationPicker = ( {
  updateLatLng,
  closeLocationPicker
}: Props ) => {
  const { speciesNearby } = useSpeciesNearby( );
  const { latitude, longitude, location } = speciesNearby;

  const [region, setRegion] = useState( {
    latitudeDelta,
    longitudeDelta,
    latitude,
    longitude
  } );
  const [inputLocation, setInputLocation] = useState( location );

  const setCoordsByLocationName = async ( newLocation: string ) => {
    const { placeName, position } = await fetchCoordsByLocationName( newLocation );
    const { lng, lat } = position;

    if ( !placeName || !lng ) { return; }

    setInputLocation( placeName );
    setRegion( {
      latitude: lat,
      longitude: lng,
      latitudeDelta,
      longitudeDelta
    } );
  };

  const reverseGeocodeLocation = ( lat: number, lng: number ) => {
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

  const handleRegionChange = ( newRegion: any ) => {
    if ( Platform.OS === "android" ) {
      reverseGeocodeLocation( newRegion.latitude, newRegion.longitude );
    }

    setRegion( newRegion );
  };

  const returnToUserLocation = ( ) => {
    fetchTruncatedUserLocation( ).then( ( coords ) => {
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
    } ).catch( e => createAlertUserLocationOnMaps( e ) );
  };

  const searchNearLocation = ( ) => {
    const lat = region.latitude ? truncateCoordinates( region.latitude ) : null;
    const lng = region.longitude ? truncateCoordinates( region.longitude ) : null;

    if ( lat && lng ) {
      updateLatLng( lat, lng );
    }
    closeLocationPicker( );
  };

  const changeText = ( text: string ) => setCoordsByLocationName( text );

  return (
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <View style={viewStyles.header}>
        <BackArrow handlePress={closeLocationPicker} />
        <View style={viewStyles.marginLarge} />
        <StyledText style={[baseTextStyles.button, textStyles.headerText]}>
          {i18n.t( "location_picker.species_nearby" ).toLocaleUpperCase()}
        </StyledText>
        <View style={[viewStyles.row, viewStyles.inputRow]}>
          <Image source={posting.location} tintColor={colors.white} style={imageStyles.white} />
          <TextInput
            accessibilityLabel={inputLocation}
            accessible
            autoCapitalize="words"
            onChangeText={changeText}
            placeholder={inputLocation || i18n.t( "species_nearby.no_location" )}
            placeholderTextColor={colors.placeholderGray}
            style={[baseTextStyles.inputField, textStyles.inputField]}
            textContentType="addressCity"
          />
        </View>
      </View>
      <LocationMap
        onRegionChange={handleRegionChange}
        region={region}
        returnToUserLocation={returnToUserLocation}
      />
      <View style={viewStyles.footer}>
        <GreenButton
          handlePress={searchNearLocation}
          letterSpacing={0.68}
          text="location_picker.button"
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationPicker;
