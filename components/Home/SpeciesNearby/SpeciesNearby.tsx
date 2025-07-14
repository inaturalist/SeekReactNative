import React, { useCallback, useReducer, useEffect } from "react";
import { View, Platform, Modal } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PositionError} from "react-native-geolocation-service";

import { viewStyles } from "../../../styles/home/speciesNearby";
import { baseTextStyles } from "../../../styles/textStyles";
import i18n from "../../../i18n";
import { fetchTruncatedUserLocation } from "../../../utility/locationHelpers";
import TaxonPicker from "./TaxonPicker";
import LocationPickerButton from "./LocationPickerButton";
import { useLocationPermission } from "../../../utility/customHooks";
import SpeciesNearbyError from "./SpeciesNearbyError";
import LocationPicker from "./LocationPicker";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import { colors } from "../../../styles/global";
import SpeciesNearbyList from "../../UIComponents/SpeciesNearby/SpeciesNearbyList";
import { taxonIds } from "../../../utility/dictionaries/taxonomyDicts";
import createUserAgent from "../../../utility/userAgent";
import StyledText from "../../UIComponents/StyledText";
import { useSpeciesNearby } from "../../Providers/SpeciesNearbyProvider";

interface State {
  error: string | null;
  showModal: boolean;
  loading: boolean;
  fetching: boolean;
}

enum ACTION_TYPE {
  ERROR = "ERROR",
  NO_ERROR = "NO_ERROR",
  SHOW_MODAL = "SHOW_MODAL",
  SET_LOADING = "SET_LOADING",
  SET_FETCHING = "SET_FETCHING"
}

type Action =
  | { type: ACTION_TYPE.ERROR; error: string }
  | { type: ACTION_TYPE.NO_ERROR }
  | { type: ACTION_TYPE.SHOW_MODAL; showModal: boolean }
  | { type: ACTION_TYPE.SET_LOADING; loading: boolean }
  | { type: ACTION_TYPE.SET_FETCHING };

function reducer( state: State, action: Action ) {
    switch ( action.type ) {
      case ACTION_TYPE.ERROR:
        return { ...state, error: action.error };
      case ACTION_TYPE.NO_ERROR:
        return { ...state, error: null, fetching: false };
      case ACTION_TYPE.SHOW_MODAL:
        return { ...state, showModal: action.showModal };
      case ACTION_TYPE.SET_LOADING:
        return { ...state, loading: action.loading, fetching: false, error: null };
      case ACTION_TYPE.SET_FETCHING:
        return { ...state, fetching: true };
      default:
        throw new Error( );
    }
}

const SpeciesNearby = ( ) => {
  const { speciesNearby, setSpeciesNearby } = useSpeciesNearby( );
  const granted = useLocationPermission( );

  const [state, dispatch] = useReducer( reducer, {
    error: speciesNearby.isConnected === false ? "internet_error" : null,
    showModal: false,
    loading: speciesNearby.taxa.length === 0,
    fetching: false
  } );

  const { error, showModal, loading, fetching } = state;

  const updateLatLng = useCallback( ( latitude: number, longitude: number ) => {
    setSpeciesNearby( {
      ...speciesNearby,
      latitude,
      longitude
    } );
    dispatch( { type: ACTION_TYPE.SET_LOADING, loading: true } );
  }, [speciesNearby, setSpeciesNearby] );

  const updateTaxaType = useCallback( ( type: string ) => {
    setSpeciesNearby( {
      ...speciesNearby,
      taxaType: type
    } );
    dispatch( { type: ACTION_TYPE.SET_LOADING, loading: true } );
  }, [speciesNearby, setSpeciesNearby] );

  const updateDowntimeError = useCallback( ( ) => dispatch( { type: ACTION_TYPE.ERROR, error: "downtime" } ), [] );

  const setLocationError = useCallback( ( ) => {
    if ( error !== "species_nearby_requires_location" ) {
      dispatch( { type: ACTION_TYPE.ERROR, error: "species_nearby_requires_location" } );
    }
   }, [error] );

  const setAndroidAccuracyLocationError = useCallback( ( ) => {
    if ( error !== "species_nearby_requires_android_accuracy" ) {
      dispatch( { type: ACTION_TYPE.ERROR, error: "species_nearby_requires_android_accuracy" } );
    }
  }, [error] );

  const openLocationPicker = useCallback( ( ) => dispatch( { type: ACTION_TYPE.SHOW_MODAL, showModal: true } ), [] );
  const closeLocationPicker = useCallback( ( ) => dispatch( { type: ACTION_TYPE.SHOW_MODAL, showModal: false } ), [] );

  const getGeolocation = useCallback( ( ) => {
    fetchTruncatedUserLocation( ).then( ( { latitude, longitude } ) => {
      updateLatLng( latitude, longitude );
    } ).catch( ( code: PositionError ) => {
      if ( code === 5 ) {
        setAndroidAccuracyLocationError( );
      } else {
        setLocationError( );
      }
    } );
  }, [setLocationError, updateLatLng, setAndroidAccuracyLocationError] );

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
      dispatch( { type: ACTION_TYPE.ERROR, error: "internet_error" } );
    } else if ( error === "internet_error" && isConnected ) {
      dispatch( { type: ACTION_TYPE.NO_ERROR } );
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
        params.taxon_id = taxonIds[taxaType];
      }

      const site = "https://api.inaturalist.org/v1/taxa/nearby";
      const queryString = Object.keys( params ).map( key => `${key}=${params[key]}` ).join( "&" );
      const options = { headers: { "User-Agent": createUserAgent() } };

      dispatch( { type: ACTION_TYPE.SET_FETCHING } );

      fetch( `${site}?${queryString}`, options )
        .then( response => response.json( ) )
        .then( ( { results } ) => {
          const newTaxa = results.map( r => r.taxon );
          setSpeciesNearby( {
            ...speciesNearby,
            taxa: newTaxa
          } );
          dispatch( { type: ACTION_TYPE.SET_LOADING, loading: false } );
         } )
        .catch( ( e ) => { // SyntaxError: JSON Parse error: Unrecognized token '<'
          if ( e instanceof SyntaxError ) { // this is from the iNat server being down
            updateDowntimeError( );
          } else if ( e.message === "Network request failed" ) {
            dispatch( { type: ACTION_TYPE.ERROR, error: "internet_error" } );
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
      <SafeAreaProvider>
        <LocationPicker
          closeLocationPicker={closeLocationPicker}
          updateLatLng={updateLatLng}
        />
      </SafeAreaProvider>
    </Modal>
  );

  const renderSpeciesNearbyList = ( ) => (
    <>
      <View style={viewStyles.speciesNearbyContainer}>
        {loading
          ? <LoadingWheel color={colors.white} />
          : <SpeciesNearbyList taxa={speciesNearby.taxa} />}
      </View>
      <View style={viewStyles.speciesNearbyPadding} />
    </>
  );

  return (
    <View style={viewStyles.container}>
      {renderModal( )}
      <StyledText style={[baseTextStyles.headerWhite, viewStyles.header]}>
        {i18n.t( "species_nearby.header" ).toLocaleUpperCase( )}
      </StyledText>
      <LocationPickerButton
        disabled={disabled}
        location={speciesNearby.location}
        openLocationPicker={openLocationPicker}
      />
      <TaxonPicker updateTaxaType={updateTaxaType} error={error} />
      <View style={viewStyles.marginBottom} />
      {error ? (
        <SpeciesNearbyError
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
