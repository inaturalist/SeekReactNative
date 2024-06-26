import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../../i18n";
import LocationMap from "../../Home/SpeciesNearby/LocationMap";
import { viewStyles } from "../../../styles/home/locationPicker";
import { viewHeaderStyles, textStyles } from "../../../styles/uiComponents/greenHeader";
import icons from "../../../assets/icons";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { dimensions } from "../../../styles/global";
import { useFetchUserLocation } from "../hooks/postingHooks";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";
import { Region } from "react-native-maps";
import { Coords } from "../../../utility/locationHelpers";

const latitudeDelta = 0.005; // closer to zoom level on iNaturalist iOS app
const longitudeDelta = latitudeDelta;

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
  closeLocationPicker
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
    longitudeDelta
  } );
  const userCoords = useFetchUserLocation( );

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
      longitudeDelta
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
      <View style={[viewHeaderStyles.container, viewHeaderStyles.center]}>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.back" )}
          accessible
          onPress={closeLocationPicker}
          style={viewStyles.backButton}
        >
          <Image source={icons.backButton} />
        </TouchableOpacity>
        <StyledText style={[baseTextStyles.button, textStyles.text]}>{i18n.t( "posting.edit_location" ).toLocaleUpperCase()}</StyledText>
      </View>
      {region.latitude && displayMap( )}
      <View style={viewStyles.footer}>
        <GreenButton
          handlePress={handleLocationChange}
          text="posting.save_location"
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationPicker;
