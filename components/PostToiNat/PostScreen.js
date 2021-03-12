// @flow

import React, { useReducer, useEffect, useCallback } from "react";
import { View, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatISO } from "date-fns";

import styles from "../../styles/posting/postToiNat";
import { savePostingSuccess } from "../../utility/loginHelpers";
import { fetchUserLocation, checkForTruncatedCoordinates } from "../../utility/locationHelpers";
import i18n from "../../i18n";
import GeoprivacyPicker from "./Pickers/GeoprivacyPicker";
import CaptivePicker from "./Pickers/CaptivePicker";
import PostModal from "./PostModal";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { setISOTime, isAndroidDateInFuture } from "../../utility/dateHelpers";
import { useLocationName } from "../../utility/customHooks";
import Notes from "./Notes";
import LocationPickerCard from "./Pickers/LocationPickerCard";
import DatePicker from "./Pickers/DateTimePicker";
import PostingHeader from "./PostingHeader";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import { createFakeUploadData, saveObservationToRealm } from "../../utility/uploadHelpers";

const PostScreen = () => {
  const navigation = useNavigation( );
  const { params } = useRoute( );

  const { taxaId, scientificName, commonName } = params;

  const initialDate = params.image.time ? setISOTime( params.image.time ) : null;
  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "SELECT_SPECIES":
        return {
          ...state,
          taxon: {
            name: action.selectedSpecies.name,
            taxaId: action.selectedSpecies.id,
            preferredCommonName: action.selectedSpecies.updatedCommonName
          },
          observation: action.observation
        };
      case "SHOW_MODAL":
        return { ...state, show: true };
      case "CLOSE_MODAL":
        return { ...state, show: false };
      case "UPDATE_OBSERVATION":
        return { ...state, observation: action.observation };
      default:
        throw new Error();
    }
  }, {
    observation: {
      captive_flag: false,
      description: null,
      geoprivacy: "open",
      latitude: params.image.latitude,
      longitude: params.image.longitude,
      observed_on_string: initialDate,
      place_guess: null,
      positional_accuracy: params.image.latitude ? 90 : null,
      taxon_id: taxaId,
      uri: params.image.uri
    },
    taxon: {
      preferredCommonName: commonName,
      name: scientificName,
      taxaId
    },
    show: false
  } );

  const { observation, taxon, show } = state;

  saveObservationToRealm( createFakeUploadData( ), "ph://BC41B488-6663-4E79-B9D6-DEAB4CBF7E37/L0/001" );

  const location = useLocationName( observation.latitude, observation.longitude );

  const setLocation = useCallback( ( coords ) => {
    dispatch( { type: "UPDATE_OBSERVATION", observation: {
      ...observation,
      latitude: coords.latitude,
      longitude: coords.longitude,
      positional_accuracy: coords.accuracy
    } } );
  }, [observation] );

  const getLocation = useCallback( ( ) => {
    const truncated = checkForTruncatedCoordinates( params.image.latitude );

    if ( truncated ) {
      fetchUserLocation( ).then( ( coords ) => {
        setLocation( coords );
      } ).catch( ( err ) => console.log( err ) );
    }
  }, [setLocation, params.image] );

  const updateLocation = ( latitude, longitude, newAccuracy ) => {
    const coords = { latitude, longitude, accuracy: newAccuracy };
    setLocation( coords );
  };

  const updateTaxon = useCallback( ( id, updatedCommonName, name ) => {
    const selectedSpecies = { id, updatedCommonName, name };
    dispatch( {
      type: "SELECT_SPECIES",
      selectedSpecies,
      observation: {
        ...observation,
        taxon_id: id
      }
    } );

  }, [observation] );

  const closeModal = useCallback( ( ) => dispatch( { type: "CLOSE_MODAL" } ), [] );

  const updateObservation = useCallback( ( key: string, value: any ) => dispatch( {
    type: "UPDATE_OBSERVATION",
    observation: {
      ...observation,
      [key]: value
    }
  } ), [observation] );

  useEffect( ( ) => {
    if ( location !== observation.place_guess && location !== i18n.t( "location_picker.undefined" ) ) {
      updateObservation( "place_guess", location );
    }
  }, [location, observation, updateObservation] );

  const handleDatePicked = ( selectedDate ) => {
    if ( selectedDate ) {
      const isFuture = isAndroidDateInFuture( selectedDate );
      const newDate = isFuture ? formatISO( new Date( ) ) : formatISO( selectedDate );
      updateObservation( "observed_on_string", newDate.toString( ) );
    }
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      // make sure these only happen on first page load, not when a user taps posting help
      getLocation();
    } );
  }, [navigation, getLocation] );

  const saveObservation = async ( ) => {
    saveObservationToRealm( observation, params.image.uri );
    savePostingSuccess( true );
    dispatch( { type: "SHOW_MODAL" } );
  };

  return (
    <ScrollWithHeader header="posting.header">
      <Modal
        onRequestClose={closeModal}
        visible={show}
      >
        <PostModal closeModal={closeModal} />
      </Modal>
      <PostingHeader
        taxon={taxon}
        image={params.image}
        updateTaxon={updateTaxon}
      />
      <Notes description={observation.description} updateObservation={updateObservation} />
      <View style={styles.divider} />
      <DatePicker dateToDisplay={observation.observed_on_string} handleDatePicked={handleDatePicked} />
      <View style={styles.divider} />
      <LocationPickerCard updateLocation={updateLocation} location={location} observation={observation} />
      <View style={styles.divider} />
      <GeoprivacyPicker updateObservation={updateObservation} geoprivacy={observation.geoprivacy} />
      <View style={styles.divider} />
      <CaptivePicker updateObservation={updateObservation} captive={observation.captive_flag} />
      <View style={styles.divider} />
      <View style={styles.textContainer}>
        <GreenButton
          handlePress={saveObservation}
          text="posting.header"
        />
      </View>
    </ScrollWithHeader>
  );
};

export default PostScreen;
