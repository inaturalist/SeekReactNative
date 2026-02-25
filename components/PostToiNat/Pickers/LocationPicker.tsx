import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../../i18n";
import LocationMap from "../../Home/SpeciesNearby/LocationMap";
import { imageStyles, textStyles, viewStyles } from "../../../styles/home/locationPicker";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors, dimensions } from "../../../styles/global";
import { useFetchUserLocation } from "../hooks/postingHooks";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";
import type { Region } from "react-native-maps";
import type { Coords } from "../../../utility/locationHelpers";
import posting from "../../../assets/posting";
import BackArrow from "../../UIComponents/Buttons/BackArrowModal";

const latitudeDelta = 0.005; // closer to zoom level on iNaturalist iOS app
const longitudeDelta = latitudeDelta;
const COORD_EPSILON = 1e-6;

interface Props {
  readonly latitude: number | null;
  readonly longitude: number | null;
  readonly updateLocation: ( latitude: number | null, longitude: number | null, accuracy: number ) => void;
  readonly closeLocationPicker: ( ) => void;
}

const LocationPicker = ( {
  latitude,
  longitude,
  updateLocation,
  closeLocationPicker,
}: Props ) => {
  const initialAccuracy = 90;
  const [accuracy, setAccuracy] = useState( initialAccuracy );
  const [region, setRegion] = useState<Region | {
    latitude: null;
    longitude: null;
    latitudeDelta: number;
    longitudeDelta: number;
  }>( {
    latitude: null,
    longitude: null,
    latitudeDelta,
    longitudeDelta,
  } );
  const [initialCenter, setInitialCenter] = useState<{ latitude: number; longitude: number } | null>( null );
  const userCoords = useFetchUserLocation( );

  useEffect( ( ) => {
    if ( region.latitude != null && region.longitude != null && initialCenter === null ) {
      setInitialCenter( { latitude: region.latitude, longitude: region.longitude } );
    }
  }, [region.latitude, region.longitude, initialCenter] );

  const hasUserChangedLocation = initialCenter != null
    && region.latitude != null
    && region.longitude != null
    && ( Math.abs( region.latitude - initialCenter.latitude ) > COORD_EPSILON
      || Math.abs( region.longitude - initialCenter.longitude ) > COORD_EPSILON );

  const handleRegionChange = ( newRegion: Region ) => {
    const sizeOfCrossHairIcon = 127;
    const { width } = dimensions;

    const estimatedAccuracy = newRegion.longitudeDelta * 1000 * (
      ( sizeOfCrossHairIcon / width / 2 ) * 100
    );

    setRegion( newRegion );
    setAccuracy( estimatedAccuracy );
  };

  const updateRegion = ( lat: number, long: number ) => {
    setRegion( {
      latitude: lat,
      longitude: long,
      latitudeDelta,
      longitudeDelta,
    } );
  };

  const setCoords = useCallback( ( coords: Coords | null ) => {
    const downtownSFLat = 37.7749;
    const downtownSFLong = -122.4194;

    if ( coords ) {
      const lat = coords.latitude;
      const long = coords.longitude;
      const newAccuracy = coords.accuracy;

      updateRegion( lat, long );
      setAccuracy( newAccuracy );
    } else {
      updateRegion( downtownSFLat, downtownSFLong );
    }
  }, [] );

  const returnToUserLocation = useCallback( ( ) => setCoords( userCoords ), [userCoords, setCoords] );

  useEffect( ( ) => {
    if ( latitude && longitude ) {
      // if photo has location, set map to that location
      updateRegion( latitude, longitude );
    } else {
      // otherwise, set to user location
      returnToUserLocation( );
    }
  }, [latitude, longitude, returnToUserLocation] );

  const handleLocationChange = ( ) => {
    updateLocation( region.latitude, region.longitude, accuracy );
    closeLocationPicker( );
  };

  const displayMap = ( ) => (
    <LocationMap
      onRegionChange={handleRegionChange}
      posting
      region={region}
      returnToUserLocation={returnToUserLocation}
    />
  );

  return (
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <View style={viewStyles.header}>
        <BackArrow handlePress={closeLocationPicker} />
        <View style={viewStyles.marginLarge} />
        <StyledText style={[baseTextStyles.button, textStyles.headerText]}>
          {i18n.t( "posting.edit_location" ).toLocaleUpperCase()}
        </StyledText>
        <View style={[viewStyles.row, viewStyles.inputRow]}>
          <Image
            source={posting.location}
            tintColor={colors.white}
            style={imageStyles.white}
          />
          <TextInput
            // accessibilityLabel={inputLocation}
            accessible
            autoCapitalize="words"
            // onChangeText={changeText}
            // placeholder={inputLocation || i18n.t("species_nearby.no_location")}
            placeholderTextColor={colors.placeholderGray}
            style={[baseTextStyles.inputField, textStyles.inputField]}
            textContentType="addressCity"
          />
        </View>
      </View>
      {region.latitude && displayMap( )}
      <View style={viewStyles.footer}>
        <GreenButton
          color={!hasUserChangedLocation ? colors.seekTransparent : null}
          handlePress={handleLocationChange}
          text="posting.save_location"
          disabled={!hasUserChangedLocation}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationPicker;
