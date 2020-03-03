import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Platform,
  Text
} from "react-native";

import styles from "../../../styles/home/speciesNearby";
import i18n from "../../../i18n";
import { checkForInternet } from "../../../utility/helpers";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import { checkLocationPermissions } from "../../../utility/androidHelpers.android";
import TaxonPicker from "./TaxonPicker";
import LocationPickerButton from "./LocationPickerButton";
import SpeciesNearbyContainer from "./SpeciesNearbyContainer";

const SpeciesNearby = () => {
  const [latLng, setLatLng] = useState( {
    latitude: null,
    longitude: null
  } );
  const [taxaType, setTaxaType] = useState( "all" );
  const [error, setError] = useState( null );

  const updateLocation = ( latitude, longitude ) => {
    setLatLng( {
      latitude,
      longitude
    } );
  };

  const updateTaxaType = ( type ) => {
    setTaxaType( type );
  };

  const checkForInternetError = useCallback( () => {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        setError( "internet" );
      } else {
        setError( null );
      }
    } ).catch( () => setError( null ) );
  }, [] );

  const getGeolocation = useCallback( () => {
    if ( !latLng.latitude || !latLng.longitude ) {
      // only update location if user has not selected a location already
      fetchTruncatedUserLocation().then( ( coords ) => {
        if ( coords.latitude && coords.longitude ) {
          updateLocation( coords.latitude, coords.longitude );
          checkForInternetError();
        }
      } ).catch( ( errorCode ) => {
        if ( errorCode === 1 ) {
          setError( "location" );
        } else if ( errorCode === 2 ) {
          setError( "no_gps" );
        } else {
          setError( "location_timeout" );
        }
      } );
    }
  }, [latLng, checkForInternetError] );

  const requestAndroidPermissions = useCallback( () => {
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
  }, [getGeolocation] );

  const checkForErrors = useCallback( () => {
    requestAndroidPermissions();
  }, [requestAndroidPermissions] );

  useEffect( () => {
    checkForErrors();
  }, [checkForErrors] );

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.headerText, styles.header]}>
          {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
        </Text>
        <LocationPickerButton
          latitude={latLng.latitude}
          longitude={latLng.longitude}
          updateLocation={updateLocation}
          error={error}
        />
        <TaxonPicker updateTaxaType={updateTaxaType} error={error} />
        <View style={styles.marginBottom} />
      </View>
      <SpeciesNearbyContainer
        taxaType={taxaType}
        latitude={latLng.latitude}
        longitude={latLng.longitude}
        error={error}
        checkForErrors={checkForErrors}
      />
      <View style={styles.greenMargin} />
    </>
  );
};

export default SpeciesNearby;
