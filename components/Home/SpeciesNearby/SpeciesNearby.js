import React, { useState, useEffect, useCallback } from "react";
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
import Error from "./Error";

const SpeciesNearby = () => {
  const [latLng, setLatLng] = useState( {
    latitude: null,
    longitude: null
  } );
  const [taxaType, setTaxaType] = useState( "all" );
  const [error, setError] = useState( null );
  const location = useLocationName( latLng.latitude, latLng.longitude );

  const updateLatLng = ( latitude, longitude ) => setLatLng( { latitude, longitude } );

  const updateTaxaType = ( type ) => setTaxaType( type );

  const updateDowntimeError = () => setError( "downtime" );

  const setLocationError = useCallback( ( errorCode ) => {
    if ( errorCode === 1 ) {
      setError( "location_error" );
    } else if ( errorCode === 2 ) {
      setError( "no_gps" );
    } else {
      setError( "location_timeout" );
    }
  }, [] );

  const getGeolocation = useCallback( () => {
    if ( error && error !== "internet_error" ) {
      setError( null );
    }
    fetchTruncatedUserLocation().then( ( { latitude, longitude } ) => {
      if ( latitude && longitude ) {
        updateLatLng( latitude, longitude );
      }
    } ).catch( ( errorCode ) => {
      setLocationError( errorCode );
    } );
  }, [setLocationError, error] );

  const requestAndroidPermissions = useCallback( () => {
    if ( !latLng.latitude || !latLng.longitude ) {
      // only update location if user has not selected a location already
      if ( Platform.OS === "android" ) {
        checkLocationPermissions().then( ( granted ) => {
          if ( granted ) {
            getGeolocation();
          } else {
            setError( "location_error" );
          }
        } );
      } else {
        getGeolocation();
      }
    }
  }, [latLng, getGeolocation] );

  const checkInternet = useCallback( () => {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        setError( "internet_error" );
      } else if ( error === "internet_error" ) {
        setError( null );
      }
    } ).catch( () => setError( null ) );
  }, [error] );

  useEffect( () => {
    requestAndroidPermissions();
  }, [requestAndroidPermissions] );

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
      {error ? (
        <Error
          error={error}
          checkInternet={checkInternet}
          checkLocation={requestAndroidPermissions}
        />
      ) : (
        <SpeciesNearbyContainer
          taxaType={taxaType}
          latitude={latLng.latitude}
          longitude={latLng.longitude}
          error={error}
          checkInternet={checkInternet}
          updateDowntimeError={updateDowntimeError}
        />
      )}
      <View style={styles.greenMargin} />
    </>
  );
};

export default SpeciesNearby;
