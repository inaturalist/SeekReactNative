import React, {
  useEffect,
  useCallback,
  useReducer
} from "react";
import { View, Platform, Text } from "react-native";

import styles from "../../../styles/home/speciesNearby";
import i18n from "../../../i18n";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import TaxonPicker from "./TaxonPicker";
import LocationPickerButton from "./LocationPickerButton";
import SpeciesNearbyContainer from "./SpeciesNearbyContainer";
import { checkForInternet } from "../../../utility/helpers";
import { useLocationName, useLocationPermission } from "../../../utility/customHooks";
import Error from "./Error";

const SpeciesNearby = () => {
  const granted = useLocationPermission();
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "INTERNET_ERROR":
        return { ...state, error: "internet_error" };
      case "DOWNTIME_ERROR":
        return { ...state, error: "downtime" };
      case "LOCATION_ERROR":
        return { ...state, error: "species_nearby_requires_location" };
      case "LOCATION_UPDATED":
        return {
          ...state,
          latLng: action.coordinates,
          error: state.error === "internet_error" ? "internet_error" : null
        };
      case "TAXATYPE_UPDATED":
        return { ...state, taxaType: action.taxaType };
      case "NO_ERROR":
        return { ...state, error: null };
      default:
        throw new Error();
    }
  }, {
    latLng: {
      latitude: null,
      longitude: null
    },
    taxaType: "all",
    error: null
  } );

  const { latLng, error, taxaType } = state;

  const location = useLocationName( latLng.latitude, latLng.longitude );

  const updateLatLng = useCallback( ( latitude, longitude ) => {
    const coordinates = { latitude, longitude };
    dispatch( { type: "LOCATION_UPDATED", coordinates } );
  }, [] );

  const updateTaxaType = useCallback( ( type ) => dispatch( { type: "TAXATYPE_UPDATED", taxaType: type } ), [] );

  const updateDowntimeError = useCallback( () => dispatch( { type: "DOWNTIME_ERROR" } ), [] );

  const setLocationError = useCallback( ( ) => dispatch( { type: "LOCATION_ERROR" } ), [] );

  const getGeolocation = useCallback( () => {
    fetchTruncatedUserLocation().then( ( { latitude, longitude } ) => {
      updateLatLng( latitude, longitude );
    } ).catch( ( ) => setLocationError( ) );
  }, [setLocationError, updateLatLng] );

  const requestAndroidPermissions = useCallback( () => {
    if ( latLng.latitude ) { return; }
    // only update location if user has not selected a location already
    if ( Platform.OS === "android" && granted === false ) {
      setLocationError( );
    } else {
      getGeolocation();
    }
  }, [latLng, getGeolocation, granted, setLocationError] );

  const checkInternet = useCallback( () => {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        dispatch( { type: "INTERNET_ERROR" } );
      } else if ( error === "internet_error" ) {
        dispatch( { type: "NO_ERROR" } );
      }
    } ).catch( () => dispatch( { type: "NO_ERROR" } ) );
  }, [error] );

  useEffect( ( ) => {
    let isCurrent = true;

    if ( isCurrent ) {
      requestAndroidPermissions( );
    }
    return ( ) => {
      isCurrent = false;
    };
  } ,[requestAndroidPermissions] );

  const disabled = error === "internet_error";
  const locationText = location ? location : i18n.t( "species_nearby.no_location" );

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, styles.header]}>
        {i18n.t( "species_nearby.header" ).toLocaleUpperCase()}
      </Text>
      <LocationPickerButton
        latLng={latLng}
        updateLatLng={updateLatLng}
        disabled={disabled}
        location={locationText}
      />
      <TaxonPicker updateTaxaType={updateTaxaType} error={error} />
      <View style={styles.marginBottom} />
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
          checkInternet={checkInternet}
          updateDowntimeError={updateDowntimeError}
        />
      )}
    </View>
  );
};

export default SpeciesNearby;
