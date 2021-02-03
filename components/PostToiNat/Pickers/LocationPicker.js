// @flow

import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../../i18n";
import LocationMap from "../../Home/SpeciesNearby/LocationMap";
import { fetchUserLocation } from "../../../utility/locationHelpers";
import styles from "../../../styles/home/locationPicker";
import headerStyles from "../../../styles/uiComponents/greenHeader";
import backStyles from "../../../styles/uiComponents/buttons/backArrow";
import icons from "../../../assets/icons";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { dimensions } from "../../../styles/global";
import AndroidMapError from "../../UIComponents/AndroidMapError";

const latitudeDelta = 0.005; // closer to zoom level on iNaturalist iOS app
const longitudeDelta = 0.005;

type Props = {
  +latitude: number,
  +longitude: number,
  +updateLocation: Function,
  +closeLocationPicker: Function
}

const LocationPicker = ( {
  latitude,
  longitude,
  updateLocation,
  closeLocationPicker
}: Props ) => {
  const [accuracy, setAccuracy] = useState( 90 );
  const [region, setRegion] = useState( {} );
  const [error, setError] = useState( null );

  const handleRegionChange = ( newRegion ) => {
    const sizeOfCrossHairIcon = 127;
    const { width } = dimensions;

    const estimatedAccuracy = newRegion.longitudeDelta * 1000 * (
      ( sizeOfCrossHairIcon / width / 2 ) * 100
    );

    setRegion( newRegion );
    setAccuracy( estimatedAccuracy );
  };

  const setCoords = ( coords ) => {
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
    } else {
      setRegion( {
        latitude: 37.77,
        longitude: -122.42,
        latitudeDelta,
        longitudeDelta
      } );
    }
  };

  const returnToUserLocation = useCallback( () => {
    fetchUserLocation( true ).then( ( coords ) => {
      setCoords( coords );
    } ).catch( ( err ) => {
      if ( err ) {
        fetchUserLocation( false ).then( ( coords ) => {
          setCoords( coords );
        } ).catch( () => setCoords() );
      }
    } );
  }, [] );

  useEffect( () => {
    const setNewRegion = () => {
      setRegion( {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
      } );
    };

    if ( latitude && longitude ) {
      // if photo has location, set map to that location
      setNewRegion();
    } else {
      // otherwise, set to user location
      returnToUserLocation();
    }
  }, [latitude, longitude, returnToUserLocation] );

  const handleMapReady = ( e ) => {
    if ( e === undefined ) {
      setError( true );
    }
  };

  const displayMap = ( ) => {
    if ( error && Platform.OS === "android" ) {
      return <AndroidMapError />;
    }
    return (
      <LocationMap
        onRegionChange={handleRegionChange}
        posting
        region={region}
        returnToUserLocation={returnToUserLocation}
        handleMapReady={handleMapReady}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={[headerStyles.container, headerStyles.center]}>
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.back" )}
          accessible
          onPress={() => closeLocationPicker()}
          style={backStyles.backButton}
        >
          <Image source={icons.backButton} />
        </TouchableOpacity>
        <Text style={headerStyles.text}>{i18n.t( "posting.edit_location" ).toLocaleUpperCase()}</Text>
      </View>
      {region.latitude && displayMap( )}
      <View style={styles.footer}>
        <GreenButton
          handlePress={() => {
            updateLocation( region.latitude, region.longitude, accuracy );
            closeLocationPicker();
          }}
          text="posting.save_location"
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationPicker;
