// @flow

import React, { useCallback, useReducer, useContext, useEffect } from "react";
import { View, Platform, Text, Modal } from "react-native";

import styles from "../../../styles/home/speciesNearby";
import i18n from "../../../i18n";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import TaxonPicker from "./TaxonPicker";
import LocationPickerButton from "./LocationPickerButton";
import { useLocationPermission } from "../../../utility/customHooks";
import Error from "./SpeciesNearbyError";
import LocationPicker from "./LocationPicker";
import { SpeciesNearbyContext } from "../../UserContext";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import { colors } from "../../../styles/global";
import SpeciesNearbyList from "../../UIComponents/SpeciesNearby/SpeciesNearbyList";
import taxonIds from "../../../utility/dictionaries/taxonDict";
import createUserAgent from "../../../utility/userAgent";

const SpeciesNearby = ( ) => {
  const { speciesNearby, setSpeciesNearby } = useContext( SpeciesNearbyContext );
  const granted = useLocationPermission( );
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "ERROR":
        return { ...state, error: action.error };
      case "NO_ERROR":
        return { ...state, error: null, fetching: false };
      case "SHOW_MODAL":
        return { ...state, showModal: action.showModal };
      case "SET_LOADING":
        return { ...state, loading: action.loading, fetching: false, error: null };
      case "SET_FETCHING":
        return { ...state, fetching: true };
      default:
        throw new Error( );
    }
  }, {
    error: speciesNearby.isConnected === false ? "internet_error" : null,
    showModal: false,
    loading: speciesNearby.taxa.length === 0,
    fetching: false
  } );

  const { error, showModal, loading, fetching } = state;

  const updateLatLng = useCallback( ( latitude, longitude ) => {
    setSpeciesNearby( {
      ...speciesNearby,
      latitude,
      longitude
    } );
    dispatch( { type: "SET_LOADING", loading: true } );
  }, [speciesNearby, setSpeciesNearby] );

  const updateTaxaType = useCallback( ( type ) => {
    setSpeciesNearby( {
      ...speciesNearby,
      taxaType: type
    } );
    dispatch( { type: "SET_LOADING", loading: true } );
  }, [speciesNearby, setSpeciesNearby] );

  const updateDowntimeError = useCallback( ( ) => dispatch( { type: "ERROR", error: "downtime" } ), [] );

  const setLocationError = useCallback( ( ) => {
    if ( error !== "species_nearby_requires_location" ) {
      dispatch( { type: "ERROR", error: "species_nearby_requires_location" } );
    }
   }, [error] );

  const openLocationPicker = useCallback( ( ) => dispatch( { type: "SHOW_MODAL", showModal: true } ), [] );
  const closeLocationPicker = useCallback( ( ) => dispatch( { type: "SHOW_MODAL", showModal: false } ), [] );

  const getGeolocation = useCallback( ( ) => {
    fetchTruncatedUserLocation( ).then( ( { latitude, longitude } ) => {
      updateLatLng( latitude, longitude );
    } ).catch( ( ) => setLocationError( ) );
  }, [setLocationError, updateLatLng] );

  const checkLocationPermissions = useCallback( ( ) => {
    if ( Platform.OS === "android" && granted === false ) {
      setLocationError( );
    } else {
      getGeolocation( );
    }
  }, [getGeolocation, granted, setLocationError] );

  const checkInternet = useCallback( ( ) => {
    const { isConnected } = speciesNearby;
    if ( isConnected === false ) {
      dispatch( { type: "ERROR", error: "internet_error" } );
    } else if ( error === "internet_error" && isConnected ) {
      dispatch( { type: "NO_ERROR" } );
    }
  }, [error, speciesNearby] );

  useEffect( ( ) => {
    let isCurrent = true;

    if ( isCurrent && !speciesNearby.latitude ) {
      checkLocationPermissions( );
    }
    return ( ) => {
      isCurrent = false;
    };
  } ,[checkLocationPermissions, speciesNearby, error] );

  useEffect( ( ) => {
    let isCurrent = true;

    const fetchSpeciesNearby = ( ) => {
      const { latitude, longitude, taxaType } = speciesNearby;

      if ( !latitude ) {
        return;
      }

      const params = {
        per_page: 20,
        lat: latitude,
        lng: longitude,
        observed_on: new Date(),
        seek_exceptions: true,
        locale: i18n.locale,
        all_photos: true // this allows for ARR license filtering
      };

      if ( taxonIds[taxaType] ) {
        // $FlowFixMe
        params.taxon_id = taxonIds[taxaType];
      }

      const site = "https://api.inaturalist.org/v1/taxa/nearby";
      // $FlowFixMe
      const queryString = Object.keys( params ).map( key => `${key}=${params[key]}` ).join( "&" );
      const options = { headers: { "User-Agent": createUserAgent() } };

      dispatch( { type: "SET_FETCHING", fetching: true } );

      fetch( `${site}?${queryString}`, options )
        .then( response => response.json( ) )
        .then( ( { results } ) => {
          const newTaxa = results.map( r => r.taxon );
          setSpeciesNearby( {
            ...speciesNearby,
            taxa: newTaxa
          } );
          dispatch( { type: "SET_LOADING", loading: false } );
         } )
        .catch( ( e ) => { // SyntaxError: JSON Parse error: Unrecognized token '<'
          if ( e instanceof SyntaxError ) { // this is from the iNat server being down
            updateDowntimeError( );
          } else if ( e.message === "Network request failed" ) {
            dispatch( { type: "ERROR", error: "internet_error" } );
          }
        } );
    };

    if ( loading && isCurrent && !fetching ) {
      fetchSpeciesNearby( );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [loading, speciesNearby, setLocationError, updateDowntimeError, checkInternet, setSpeciesNearby, fetching] );

  const disabled = error === "internet_error";

  const renderModal = ( ) => (
    <Modal visible={showModal}>
      <LocationPicker
        closeLocationPicker={closeLocationPicker}
        updateLatLng={updateLatLng}
      />
    </Modal>
  );

  const renderSpeciesNearbyList = ( ) => (
    <>
      <View style={styles.speciesNearbyContainer}>
        {loading
          ? <LoadingWheel color={colors.black} />
          : <SpeciesNearbyList taxa={speciesNearby.taxa} />}
      </View>
      <View style={styles.speciesNearbyPadding} />
    </>
  );

  return (
    <View style={styles.container}>
      {renderModal( )}
      <Text style={[styles.headerText, styles.header]}>
        {i18n.t( "species_nearby.header" ).toLocaleUpperCase( )}
      </Text>
      <LocationPickerButton
        disabled={disabled}
        location={speciesNearby.location}
        openLocationPicker={openLocationPicker}
      />
      <TaxonPicker updateTaxaType={updateTaxaType} error={error} />
      <View style={styles.marginBottom} />
      {error ? (
        <Error
          error={error}
          checkInternet={checkInternet}
          checkLocation={checkLocationPermissions}
          openLocationPicker={openLocationPicker}
        />
      ) : renderSpeciesNearbyList( )}
    </View>
  );
};

export default SpeciesNearby;
