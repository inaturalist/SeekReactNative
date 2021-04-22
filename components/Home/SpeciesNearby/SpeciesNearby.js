import React, { useEffect, useCallback, useReducer } from "react";
import { View, Platform, Text, Modal } from "react-native";

import styles from "../../../styles/home/speciesNearby";
import i18n from "../../../i18n";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import TaxonPicker from "./TaxonPicker";
import LocationPickerButton from "./LocationPickerButton";
import SpeciesNearbyContainer from "./SpeciesNearbyContainer";
import { checkForInternet } from "../../../utility/helpers";
import { useLocationName, useLocationPermission } from "../../../utility/customHooks";
import Error from "./Error";
import LocationPicker from "./LocationPicker";
import { fetchFromAsyncStorage, saveSpeciesNearbyLocation } from "../../../utility/settingsHelpers";

const SpeciesNearby = ( ) => {
  const granted = useLocationPermission( );
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
      case "SHOW_MODAL":
        return { ...state, showModal: action.showModal };
      default:
        throw new Error( );
    }
  }, {
    latLng: {
      latitude: null,
      longitude: null
    },
    taxaType: "all",
    error: null,
    showModal: false
  } );

  const { latLng, error, taxaType, showModal } = state;

  const location = useLocationName( latLng.latitude, latLng.longitude );

  const updateLatLng = useCallback( ( latitude, longitude ) => {
    const coordinates = { latitude, longitude };
    dispatch( { type: "LOCATION_UPDATED", coordinates } );
  }, [] );

  const updateTaxaType = useCallback( ( type ) => dispatch( { type: "TAXATYPE_UPDATED", taxaType: type } ), [] );

  const updateDowntimeError = useCallback( ( ) => dispatch( { type: "DOWNTIME_ERROR" } ), [] );

  const setLocationError = useCallback( ( ) => dispatch( { type: "LOCATION_ERROR" } ), [] );

  const openLocationPicker = useCallback( ( ) => dispatch( { type: "SHOW_MODAL", showModal: true } ), [] );
  const closeLocationPicker = useCallback( ( ) => dispatch( { type: "SHOW_MODAL", showModal: false } ), [] );

  const getGeolocation = useCallback( ( ) => {
    fetchTruncatedUserLocation( ).then( ( { latitude, longitude } ) => {
      updateLatLng( latitude, longitude );
    } ).catch( ( ) => setLocationError( ) );
  }, [setLocationError, updateLatLng] );

  const requestAndroidPermissions = useCallback( async ( ) => {
    // only update location if user has not selected a location already
    if ( latLng.latitude ) { return; }

    const fetchSearchedLocation = async ( ) => {
      return await fetchFromAsyncStorage( "speciesNearbyLocation" );
    };

    // check for truncated location from device or location picker
    // before trying to access user location again
    // this value is cleared when user reopens Seek, so the user can
    // see species nearby in their new location
    const searchedLocation = await fetchSearchedLocation( );

    if ( searchedLocation ) {
      const { latitude, longitude } = JSON.parse( searchedLocation );
      updateLatLng( latitude, longitude );
    } else if ( Platform.OS === "android" && granted === false ) {
      setLocationError( );
    } else {
      getGeolocation( );
    }
  }, [latLng, getGeolocation, granted, setLocationError, updateLatLng] );

  const checkInternet = useCallback( ( ) => {
    checkForInternet( ).then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        dispatch( { type: "INTERNET_ERROR" } );
      } else if ( error === "internet_error" ) {
        dispatch( { type: "NO_ERROR" } );
      }
    } ).catch( ( ) => dispatch( { type: "NO_ERROR" } ) );
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

  useEffect( ( ) => {
    saveSpeciesNearbyLocation( JSON.stringify( latLng ) );
  }, [latLng] );

  const disabled = error === "internet_error";
  const locationText = location ? location : i18n.t( "species_nearby.no_location" );

  const renderModal = ( ) => (
    <Modal visible={showModal}>
      <LocationPicker
        latitude={latLng.latitude}
        location={location}
        longitude={latLng.longitude}
        closeLocationPicker={closeLocationPicker}
        updateLatLng={updateLatLng}
      />
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderModal( )}
      <Text style={[styles.headerText, styles.header]}>
        {i18n.t( "species_nearby.header" ).toLocaleUpperCase( )}
      </Text>
      <LocationPickerButton
        latLng={latLng}
        updateLatLng={updateLatLng}
        disabled={disabled}
        location={locationText}
        openLocationPicker={openLocationPicker}
      />
      <TaxonPicker updateTaxaType={updateTaxaType} error={error} />
      <View style={styles.marginBottom} />
      {error ? (
        <Error
          error={error}
          checkInternet={checkInternet}
          checkLocation={requestAndroidPermissions}
          openLocationPicker={openLocationPicker}
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
