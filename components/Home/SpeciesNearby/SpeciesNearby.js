import React, { useState } from "react";
import {
  View,
  Platform,
  Text
} from "react-native";

import styles from "../../../styles/home/speciesNearby";
import i18n from "../../../i18n";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import { checkLocationPermissions } from "../../../utility/androidHelpers.android";
import TaxonPicker from "./TaxonPicker";
import LocationPickerButton from "./LocationPickerButton";
import SpeciesNearbyContainer from "./SpeciesNearbyContainer";
import { checkForInternet } from "../../../utility/helpers";
import { useLocationName } from "../../../utility/customHooks";

const SpeciesNearby = () => {
  const [latLng, setLatLng] = useState( {
    latitude: null,
    longitude: null
  } );
  const [taxaType, setTaxaType] = useState( "all" );
  const [error, setError] = useState( null );
  const location = useLocationName( latLng.latitude, latLng.longitude );

  const updateLatLng = ( latitude, longitude ) => {
    setLatLng( {
      latitude,
      longitude
    } );
  };

  const updateTaxaType = ( type ) => {
    setTaxaType( type );
  };

  const setLocationError = ( errorCode ) => {
    if ( errorCode === 1 ) {
      setError( "location" );
    } else if ( errorCode === 2 ) {
      setError( "no_gps" );
    } else {
      setError( "location_timeout" );
    }
  };

  const getGeolocation = () => {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords.latitude && coords.longitude ) {
        setError( null );
        updateLatLng( coords.latitude, coords.longitude );
      }
    } ).catch( ( errorCode ) => {
      setLocationError( errorCode );
    } );
  };

  const requestAndroidPermissions = () => {
    if ( !latLng.latitude || !latLng.longitude ) {
      // only update location if user has not selected a location already
      if ( Platform.OS === "android" ) {
        checkLocationPermissions().then( ( granted ) => {
          if ( granted ) {
            getGeolocation();
          } else {
            setError( "location" );
          }
        } );
      } else {
        getGeolocation();
      }
    }
  };

  const resetInternetErrorAndFetchLocation = () => {
    if ( error === "internet" ) {
      setError( null );
    }
    requestAndroidPermissions(); // 16 seconds to load location on Android due to old API
  };

  const checkForInternetError = () => {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        setError( "internet" );
      } else {
        resetInternetErrorAndFetchLocation();
      }
    } ).catch( () => resetInternetErrorAndFetchLocation() );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.headerText, styles.header]}>
          {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
        </Text>
        <LocationPickerButton
          latitude={latLng.latitude}
          longitude={latLng.longitude}
          updateLatLng={updateLatLng}
          error={error}
          location={location}
        />
        <TaxonPicker updateTaxaType={updateTaxaType} error={error} />
        <View style={styles.marginBottom} />
      </View>
      <SpeciesNearbyContainer
        taxaType={taxaType}
        latitude={latLng.latitude}
        longitude={latLng.longitude}
        error={error}
        checkForErrors={checkForInternetError}
      />
      <View style={styles.greenMargin} />
    </>
  );
};

export default SpeciesNearby;
